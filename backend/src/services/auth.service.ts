import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/database';
import { User } from '../models/User';

const userRepository = AppDataSource.getRepository(User);

export class AuthService {
  async registerUser(email: string, password: string, firstName: string, lastName: string, role: string = 'applicant') {
    try {
      const existingUser = await userRepository.findOne({ where: { email } });
      if (existingUser) {
        throw new Error('Email already registered');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = userRepository.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role,
      });

      await userRepository.save(user);
      return { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role };
    } catch (error) {
      throw error;
    }
  }

  async loginUser(email: string, password: string) {
    try {
      const user = await userRepository.findOne({ where: { email } });
      if (!user) {
        throw new Error('Invalid email or password');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
      );

      return {
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async validateToken(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      return decoded;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  async getUserById(userId: string) {
    try {
      const user = await userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}
