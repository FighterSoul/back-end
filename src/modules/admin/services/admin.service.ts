// src/modules/admin/services/admin.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Admin } from '../schema/admin.schema';
import { AdminDto } from '../dto/admin.dto';
import { ConfigService } from '@nestjs/config';
import { AdminServiceInterface } from '../interfaces/admin.interface';
import { AuthService } from '../../auth/services/auth.service';
import { LoginDto } from '../../auth/dto/login.dto';

@Injectable()
export class AdminService implements AdminServiceInterface {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}
  getJwtSecret(): { secret: string; } {
    throw new Error('Method not implemented.');
  }

  async create(adminDto: AdminDto): Promise<Admin> {
    const hashedPassword = await bcrypt.hash(adminDto.password, 10);
    const newUser = new this.adminModel({ ...adminDto, password: hashedPassword });
    return newUser.save();
  }

  async findAll(): Promise<Admin[]> {
    return this.adminModel.find().exec();
  }

  async findOne(id: string): Promise<Admin> {
    return this.adminModel.findById(id).exec();
  }

  async update(id: string, admin: Admin): Promise<Admin> {
    return this.adminModel.findByIdAndUpdate(id, admin, { new: true }).exec();
  }

  async delete(id: string): Promise<Admin> {
    return this.adminModel.findByIdAndDelete(id).exec();
  }

  async login(loginDto: LoginDto): Promise<{ token: string, role: string }> {
    return this.authService.login(loginDto);
  }
}
