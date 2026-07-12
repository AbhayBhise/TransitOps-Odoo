import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { ApiError } from '../utils/apiError.js';
import { STATUS_CODES } from '../config/constants.js';
import { env } from '../config/env.js';

const prisma = new PrismaClient();

export const authService = {
  async register({ email, password, name, roleName }) {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new ApiError(STATUS_CODES.BAD_REQUEST, 'User with this email already exists');
    }

    let role = await prisma.role.findUnique({ where: { name: roleName } });
    if (!role) {
      role = await prisma.role.create({ data: { name: roleName } });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        roleId: role.id
      },
      include: {
        role: true
      }
    });

    const userResponse = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role.name
    };

    return userResponse;
  },

  async login({ email, password }) {
    const user = await prisma.user.findUnique({ 
      where: { email },
      include: { role: true }
    });

    if (!user) {
      throw new ApiError(STATUS_CODES.UNAUTHORIZED, 'Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(STATUS_CODES.UNAUTHORIZED, 'Invalid email or password');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role.name },
      env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role.name
      }
    };
  }
};
