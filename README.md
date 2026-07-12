# TransitOps - Enterprise Fleet & Transport Management System

TransitOps is a centralized ERP (Enterprise Resource Planning) platform designed for fleet management, transport dispatching, driver tracking, and maintenance operations. The system couples a highly responsive React client dashboard with a secure Node.js REST API and a relational PostgreSQL database to enforce logistics integrity, compliance, and budget tracking.

---

## 1. Executive Overview

TransitOps provides fleet managers and logistics coordinators with full operational visibility. The system coordinates real-time resource tracking and enforces strict validation checks to block invalid dispatches (e.g., driver license expiry, vehicle capacity overload, and maintenance downtime).

---

## 2. System Architecture & Data Flow

TransitOps is built on a decoupled, secure client-server model:

```text
+-----------------------+              HTTP REST (JSON)            +-------------------------+
|     React Client      | <======================================> |    Node/Express API     |
|   (Vite + Tailwind)   |     Authorization: Bearer <JWT>          | (Controllers & Services)|
+-----------+-----------+                                          +------------+------------+
            |                                                                   |
            | LocalStorage Token                                                | Prisma ORM
            v                                                                   v
+-----------+-----------+                                          +------------+------------+
| AuthContext State     |                                          |   PostgreSQL Database   |
| (User, Token, Role)   |                                          |      (Neon Server)      |
+-----------------------+                                          +-------------------------+
```

### Data Flow Execution Model
1. **Client Handshake**: The client initiates an authentication request via the Axios client.
2. **Access Control**: On successful login, the server issues a signed JWT containing user metadata and role permissions. The client persists this token in `localStorage`.
3. **API Propagation**: Axios request interceptors read the stored token and inject it into the `Authorization` header of all subsequent API queries.
4. **Endpoint Validation**: The server interceptor decodes the JWT, verifies the credentials, and passes the request through role-based access checkers.

---

## 3. Technology Stack

| Layer | Component | Specification |
| :--- | :--- | :--- |
| **Frontend** | Framework | React 18 / Vite 8 |
| | Styling | Tailwind CSS v4, Vanilla CSS variables |
| | Client Routing | React Router DOM v6 (Protected Layout Wrappers) |
| | State Management | TanStack Query v5 (React Query) |
| | Forms & Validation | React Hook Form & Zod Resolver |
| | Visualization | Recharts (Responsive Area, Bar, and Line charts) |
| | Feedback Icons | Lucide React, React Hot Toast |
| **Backend** | Framework | Node.js / Express.js REST API |
| | ORM | Prisma Client v5.22.0 |
| | Security | Bcrypt (10 rounds password salt), JsonWebToken (JWT) |
| **Database** | Database Engine | PostgreSQL (Hosted on Neon serverless) |
| **DevOps & Tools**| Deployment | Vercel (Frontend SPA), Render (Backend Node API) |
| | Development | VS Code, Git, GitHub, Antigravity |

---

## 4. Database Schema Summary

The database uses a PostgreSQL schema managed via Prisma ORM:

```text
               +-------------------+
               |       Role        |
               +-------------------+
               | id (UUID, PK)     |
               | name (RoleType)   | <---+
               +-------------------+     |
                         |               |
                         | 1:N           |
                         v               |
               +-------------------+     |
               |       User        |     |
               +-------------------+     |
               | id (UUID, PK)     |     |
               | email (Unique)    |     |
               | password (Hash)   |     |
               | roleId (FK)       | ----+
               +-------------------+
                         
      +-----------------------------------------+
      |                                         |
      | 1:N                                     | 1:N
      v                                         v
+-----------+  1:N   +-----------+  1:N   +-----------+
| Vehicle   | <----> |   Trip    | <----> |  Driver   |
+-----------+        +-----------+        +-----------+
| id (PK)   |        | id (PK)   |        | id (PK)   |
| regNo (UQ)|        | vehicleId |        | name      |
| status    |        | driverId  |        | licenseNo |
| capacity  |        | status    |        | status    |
+-----------+        +-----------+        +-----------+
      |
      +------------+-------------+
      | 1:N        | 1:N         | 1:N
      v            v             v
+-----------+ +-----------+ +-----------+
|Maintenance| |  FuelLog  | |  Expense  |
+-----------+ +-----------+ +-----------+
| id (PK)   | | id (PK)   | | id (PK)   |
| cost      | | liters    | | amount    |
| status    | | cost      | | type      |
+-----------+ +-----------+ +-----------+
```

---

## 5. System Validation & Business Rules

TransitOps implements multi-layer validation constraints across both client and server:

### A. Vehicle Dispatch Rules
* **Status Lock**: Only vehicles with status `AVAILABLE` can be assigned to a new trip. Vehicles marked as `IN_SHOP` (under maintenance) or `RETIRED` are blocked.
* **Overweight Guard**: Trip creation requests reject payloads where the cargo weight exceeds the vehicle's maximum carrying capacity.
* **Reuse Interception**: A vehicle already assigned to an active trip (`status: ON_TRIP`) cannot be assigned to another trip until completed.

### B. Driver Dispatch Rules
* **License Verification**: Driver license numbers are validated against standard regional formats using Zod schema regex.
* **Expiry Guard**: Drivers with license expiry dates preceding the system dispatch date are blocked.
* **Compliance Checks**: Driver operators marked as `SUSPENDED` or `OFF_DUTY` are rejected from active dispatch workflows.

### C. State Machine Automations
* **Dispatch Event**: Transitioning a trip to `DISPATCHED` automatically updates the vehicle and driver status states to `ON_TRIP`.
* **Completion Event**: Transitioning a trip to `COMPLETED` restores the vehicle and driver statuses back to `AVAILABLE`.
* **Cancellation Event**: Transitioning a trip to `CANCELLED` rolls back driver and vehicle statuses to their original pre-dispatch states.
* **Maintenance Entry**: Creating an active maintenance ticket automatically updates the vehicle status to `IN_SHOP`.
* **Maintenance Completion**: Closing the maintenance log restores the vehicle status to `AVAILABLE` (unless the vehicle has been marked as `RETIRED`).

---

## 6. Role-Based Access Control (RBAC) Matrix

Permissions are enforced at the API controller layer and reflected in the frontend sidebar configuration:

| Feature/Page | Required Roles | API Endpoint Security | Frontend Component Action |
| :--- | :--- | :--- | :--- |
| **System Dashboard** | `ADMIN`, `MANAGER`, `USER`, `DRIVER` | JWT Authentication Check | Full View Rendered |
| **Vehicles Registry** | `ADMIN`, `MANAGER` | `requireRole('ADMIN', 'MANAGER')` | Display full tables & edit buttons |
| | `DRIVER`, `USER` | Read-only | Hide Register/Edit/Delete actions |
| **Driver Management** | `ADMIN`, `MANAGER` | `requireRole('ADMIN', 'MANAGER')` | Full CRUD operations allowed |
| | `DRIVER`, `USER` | Read-only | Register/Delete controls disabled |
| **Dispatch Operations**| `ADMIN`, `MANAGER` | `requireRole('ADMIN', 'MANAGER')` | Create/Dispatch/Cancel controls active |
| **Maintenance & Fuel** | `ADMIN`, `MANAGER` | `requireRole('ADMIN', 'MANAGER')` | Register log forms rendering active |
| **System Settings** | `ADMIN` | `requireRole('ADMIN')` | Toggle database and workspace configs |

---

## 7. API Reference Specification

### Authentication Module
* `POST /api/auth/register`
  * **Payload**: `{ "name": "...", "email": "...", "password": "...", "roleName": "MANAGER" }`
  * **Response**: `201 Created` with User metadata.
* `POST /api/auth/login`
  * **Payload**: `{ "email": "...", "password": "..." }`
  * **Response**: `200 OK` returning Signed JWT Token and User Profile payload.
* `POST /api/auth/logout`
  * **Response**: `200 OK` (token deleted on client).
* `GET /api/auth/me`
  * **Header**: `Authorization: Bearer <JWT>`
  * **Response**: `200 OK` returning active User credentials and Role.

### Fleet & Operations Modules
* `GET /api/vehicles` - List all vehicles (supports filtering by `status`).
* `POST /api/vehicles` - Register new vehicle.
* `GET /api/drivers` - List drivers.
* `POST /api/drivers` - Register new driver.
* `GET /api/trips` - List trips.
* `POST /api/trips` - Create trip (draft state).
* `PATCH /api/trips/:id/dispatch` - Transition trip to `DISPATCHED`.
* `PATCH /api/trips/:id/complete` - Transition trip to `COMPLETED`.
* `PATCH /api/trips/:id/cancel` - Cancel active trip.
* `GET /api/dashboard` - Retrieve aggregated dashboard summary cards.

---

## 8. Installation & Setup Instructions

### System Requirements & Prerequisites

#### A. Hardware Prerequisites
* **Processor**: Dual-Core 2.0 GHz CPU or faster.
* **Memory**: Minimum 4 GB RAM (8 GB RAM recommended for local build execution).
* **Storage**: 500 MB of available disk space for npm dependencies and local compilation.

#### B. Software Prerequisites
* **Operating System**: Windows 10/11, macOS 12.0+, or Linux (Ubuntu 20.04+, Debian 11+).
* **Node.js**: Version `18.x` or `20.x` (LTS releases).
* **Package Manager**: npm version `9.x` or higher.
* **Database Engine**: PostgreSQL v14.x or higher (local instance or cloud database like Neon).

#### C. Network & Client Browser
* **Network**: Active broadband connection for connecting to the remote Render API and Vercel CDN.
* **Client Browser**: Google Chrome (v100+), Safari (v15+), Mozilla Firefox (v98+), or Microsoft Edge (v100+).

### Step-by-Step Installation

1. **Clone the project repository**:
   ```bash
   git clone https://github.com/AbhayBhise/TransitOps-Odoo.git
   cd TransitOps-Odoo
   ```

2. **Configure environment variables**:
   * Create `server/.env` with database and security keys:
     ```env
     DATABASE_URL="postgresql://username:password@hostname:5432/dbname?sslmode=require"
     JWT_SECRET="your_jwt_signing_key_secret"
     PORT=5000
     ```
   * Create `client/.env.production` pointing to the backend API:
     ```env
     VITE_API_URL="https://transitops-backend-tw0t.onrender.com/api"
     ```

3. **Install dependencies and setup the database**:
   ```bash
   cd server
   npm install
   # Generate Prisma bindings
   npx prisma generate
   ```

4. **Launch the backend server**:
   ```bash
   npm run dev
   ```
   *Backend REST API running at `http://localhost:5000`.*

5. **Setup the frontend client**:
   ```bash
   cd ../client
   npm install
   npm run dev
   ```
   *Vite development server running at `http://localhost:5173`.*

---

## 9. Security Posture

* **JWT Verification**: Tokens expire after 24 hours. The frontend interceptor detects expired credentials, handles state clearance, and triggers a routing reset to `/login`.
* **Password Security**: Credentials are encrypted using bcrypt hashing before storage.
* **SQL Injection Mitigation**: Prisma ORM executes parameterized queries to prevent SQL injections.
* **Error Handling**: Custom error middlewares capture database exceptions, mapping them to safe `ApiResponse` objects without exposing stack traces.

---

## 10. Responsive Design Specifications

The user interface adapts across various devices:
* **Mobile (320px - 425px)**: Collapsible sidebar shifts to an off-canvas drawer. Data tables enable horizontal swipe navigation.
* **Tablet (768px)**: KPI summary metrics collapse into standard grids. Navigation badges reduce padding to maximize screen real estate.
* **Laptop & Desktop (1024px - 1920px)**: Persistent collapsible sidebar navigation, multi-column dashboard widgets, and full data grid rendering.

---

## 11. Project Contributor Log

| Name | Domain | Core Implementation Modules |
| :--- | :--- | :--- |
| **Abhay Bhise** | Backend Lead / Architect | Prisma db schemas, controllers, JWT middleware, Express REST routing |
| **Disha Satpute** | Operations Module Lead | Maintenance tickets, fuel consumption equations, report calculations |
| **Vaishnavi Phad** | Frontend ERP Developer | Responsive React views, Axios config, profile module, Vercel deployments |

---

## 12. License

Distributed under the MIT License. See `LICENSE` for more information.
