# TransitOps - Odoo Hackathon 2026

## Objective

We are building **TransitOps**, a Smart Transport Operations Platform.

This is NOT just a hackathon.
Odoo is using this to hire developers.

Everything should demonstrate:

- Clean Architecture
- Proper Database Design
- Modular Code
- Good UI
- Business Logic
- Validation
- Git Collaboration
- Scalable Design

------------------------------------------------------------

# Tech Stack

Frontend

- React
- Vite
- TailwindCSS
- shadcn/ui
- React Router
- TanStack Query
- Axios
- React Hook Form
- Zod
- Recharts
- Lucide Icons

Backend

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JWT
- bcrypt

------------------------------------------------------------

# Repository Rules

Repository:

TransitOps-Odoo

ONLY MAIN BRANCH.

No feature branches.

Never create another branch.

Never force push.

Before EVERY push

git pull origin main

Then

git add .

git commit -m "Meaningful message"

git push origin main

Push at least once every hour.

Everyone must commit using their own GitHub account.

GitHub Insights should show contribution from every member.

------------------------------------------------------------

# Team Communication

Whenever someone pushes

Send message

"Pushed Dashboard"

or

"Pushed Backend"

Everyone else immediately runs

git pull origin main

Nobody edits another person's files.

------------------------------------------------------------

# Folder Structure

client/

src/

assets/

components/

layout/

ui/

tables/

charts/

forms/

pages/

Dashboard/

Vehicles/

Drivers/

Trips/

Maintenance/

Fuel/

Reports/

Settings/

hooks/

services/

routes/

context/

utils/

types/

App.jsx

main.jsx

------------------------------------------------------------

server/

src/

controllers/

middleware/

routes/

services/

validators/

utils/

config/

prisma/

schema.prisma

server.js

------------------------------------------------------------

# UI Guidelines

Follow the supplied Excalidraw mockup.

DO NOT redesign navigation.

Improve it.

Keep

Sidebar

Top navbar

Tables

Forms

Dashboard

Dark theme

Improve

Spacing

Typography

Colors

Shadows

Animations

Responsive design

Toast notifications

Loading skeletons

Empty states

Status badges

Confirmation dialogs

------------------------------------------------------------

# Theme

Dark

Primary

Amber

Secondary

Slate

Status Colors

Available

Green

On Trip

Blue

In Shop

Orange

Retired

Red

------------------------------------------------------------

# Pages

1 Dashboard

2 Vehicles

3 Drivers

4 Trips

5 Maintenance

6 Fuel

7 Reports

8 Settings

------------------------------------------------------------

# Database Architecture

User

id

name

email

password

roleId

createdAt

Role

id

name

Vehicle

id

registrationNumber

model

type

capacity

odometer

cost

status

Driver

id

name

licenseNumber

licenseCategory

licenseExpiry

phone

safetyScore

status

Trip

id

vehicleId

driverId

source

destination

cargoWeight

plannedDistance

actualDistance

fuelUsed

status

Maintenance

id

vehicleId

issue

cost

status

FuelLog

id

vehicleId

liters

cost

date

Expense

id

vehicleId

type

cost

------------------------------------------------------------

# Relationships

Role

↓

Users

Vehicle

↓

Trips

↓

Fuel Logs

↓

Maintenance

Driver

↓

Trips

------------------------------------------------------------

# Business Rules

Registration Number

UNIQUE

Cargo Weight

<= Vehicle Capacity

Only Available Vehicle

can dispatch

Only Available Driver

can dispatch

Dispatch

Vehicle

Available

↓

On Trip

Driver

Available

↓

On Trip

Complete Trip

Vehicle

↓

Available

Driver

↓

Available

Maintenance

Vehicle

↓

In Shop

Close Maintenance

↓

Available

unless Retired

------------------------------------------------------------

# REST API

Authentication

POST /auth/login

POST /auth/register

Vehicles

GET /vehicles

POST /vehicles

PUT /vehicles/:id

DELETE /vehicles/:id

Drivers

GET /drivers

POST /drivers

PUT /drivers/:id

Trips

GET /trips

POST /trips

PUT /trips/:id

Maintenance

GET /maintenance

POST /maintenance

Fuel

GET /fuel

POST /fuel

Reports

GET /reports/dashboard

------------------------------------------------------------

# UML

Role

|

1

|

*

User

Vehicle

|

1

|

*

Trip

Driver

|

1

|

*

Trip

Vehicle

|

1

|

*

Maintenance

Vehicle

|

1

|

*

FuelLog

Vehicle

|

1

|

*

Expense

------------------------------------------------------------

# UI Components

Sidebar

Top Navbar

Search Bar

Data Table

Status Badge

Modal

Dialog

Toast

KPI Card

Chart

Form Input

Dropdown

Date Picker

Pagination

------------------------------------------------------------

# Architecture

Frontend

↓

Axios

↓

Express REST API

↓

Service Layer

↓

Prisma

↓

PostgreSQL

------------------------------------------------------------

# Member 1 (Abhay)

Backend Lead

Responsibilities

Project Architecture

Database Design

Express

Prisma

Authentication

JWT

RBAC

Validation

Business Rules

Vehicle API

Driver API

Trip API

Maintenance API

Fuel API

Reports API

Status Automation

Repository Management

README

Deployment

Files Owned

server/

prisma/

Never edit frontend UI unless required.

------------------------------------------------------------

# Member 2

Frontend Lead

Owns

Dashboard

Vehicle Registry

Driver Management

Sidebar

Navbar

Search

Tables

Filters

Dummy JSON until backend is ready.

Files

client/src/pages/Dashboard

client/src/pages/Vehicles

client/src/pages/Drivers

client/src/components/layout

------------------------------------------------------------

# Member 3

Frontend Lead

Owns

Trips

Maintenance

Fuel

Reports

Settings

Charts

Forms

Dummy JSON until backend is ready.

Files

client/src/pages/Trips

client/src/pages/Maintenance

client/src/pages/Fuel

client/src/pages/Reports

client/src/pages/Settings

------------------------------------------------------------

# Development Order

Backend

Authentication

↓

Prisma

↓

Vehicle CRUD

↓

Driver CRUD

↓

Trip CRUD

↓

Business Rules

↓

Maintenance

↓

Fuel

↓

Reports

Frontend

Layout

↓

Routing

↓

Dashboard

↓

Vehicles

↓

Drivers

↓

Trips

↓

Maintenance

↓

Fuel

↓

Reports

↓

Settings

------------------------------------------------------------

# Git Rules

Never force push

Never create another branch

Pull before push

Commit every logical change

Commit messages

Good

Created dashboard layout

Implemented vehicle CRUD

Added Prisma schema

Bad

update

changes

fix

------------------------------------------------------------

# AI Usage

Allowed.

Use AI to

Generate components

Generate boilerplate

Generate forms

Generate validation

Generate APIs

DO NOT

Blindly paste code.

Understand every generated code.

------------------------------------------------------------

# Antigravity Instructions

Use all available skills including

- Stitch
- Get Shit Done
- UI Generation
- Architecture
- Refactoring
- Code Review
- Component Generation

Priorities

1 Clean Architecture

2 Reusable Components

3 Fast Development

4 Production Quality UI

5 Modular Code

Never generate monolithic files.

Prefer reusable components.

Follow the supplied Excalidraw mockup exactly.

------------------------------------------------------------

# Final Demo Flow

Login

↓

Dashboard

↓

Add Vehicle

↓

Add Driver

↓

Create Trip

↓

Dispatch

↓

Vehicle Status changes

↓

Driver Status changes

↓

Complete Trip

↓

Maintenance

↓

Fuel Entry

↓

Reports

↓

Dashboard Updated

------------------------------------------------------------

# If Time Remains

Dark mode polish

CSV Export

PDF Export

Search

Filters

Animations

Loading Skeletons

Better Charts

AI Fleet Assistant

------------------------------------------------------------

# Evaluation Priorities

Database Design

Architecture

Business Logic

Validation

Clean UI

Code Quality

Modularity

Git Contribution

Performance

Scalability

Security

------------------------------------------------------------

# Goal

Build a production-quality ERP module, not a hackathon prototype.

Quality over quantity.

Finish mandatory features before bonus features.

Common Rules (All Members)
Git

Always

git pull origin main

before coding (if someone else pushed) and always before pushing.

Then

git add .
git commit -m "Meaningful message"
git push origin main

Never

git push --force

Never create branches.

Only

main
Coding Rules
Functional Components only
No inline CSS
Tailwind only
Reusable components
One responsibility per component
No duplicate logic
Proper folder naming
PascalCase components
camelCase variables
Use Zod for validation
Use React Hook Form for forms
Use dummy JSON until backend APIs are ready
Integration Phase (After Core Development)

When the backend APIs are ready:

Member 2 replaces dashboard, vehicle, and driver dummy data with API calls.
Member 3 replaces trips, maintenance, fuel, reports, and settings dummy data with API calls.
You only fix backend issues and integration bugs. Avoid building new frontend features during this phase.

This separation lets all three Antigravity instances work almost independently while keeping merge conflicts low and producing clear GitHub contributions from every teammate.

