import { Injectable } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserInterface } from 'src/common/interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from 'src/common/models/models';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER.name) private readonly model: Model<UserInterface>,
  ) {}
  async hasPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async create(userDTO: UserDTO): Promise<UserInterface> {
    const hash = await this.hasPassword(userDTO.password);
    const newUser = new this.model({ ...userDTO, password: hash });
    return await newUser.save();
  }

  async finAll(): Promise<UserInterface[]> {
    return await this.model.find();
  }

  async findOne(id: string): Promise<UserInterface> {
    return await this.model.findById(id);
  }

  async findByUserName(username: string) {
    return await this.model.findOne({ username });
  }

  async checkPassword(
    password: string,
    passwordUser: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, passwordUser);
  }

  async update(id: string, campos: UserDTO): Promise<UserInterface> {
    const hash = await this.hasPassword(campos.password);
    const user = { ...campos, password: hash };
    return await this.model.findByIdAndUpdate(id, user, { new: true });
  }

  async delete(id: string): Promise<UserInterface> {
    const user = await this.model.findById(id);
    await this.model.findByIdAndDelete(id);
    return user;
  }
}
