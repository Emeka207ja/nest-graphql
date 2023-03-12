import { Injectable,ForbiddenException,NotFoundException,BadRequestException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { authEntity } from './auth.entity';
import { authDto } from './dto/auth.dto';
import { authResponse } from './auth.response';
import { signupInput } from './signup.input';
import { loginResponse } from './login.response';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(authEntity)
    private readonly AuthRepo: Repository<authEntity>,
    private readonly jwtService:JwtService
  ) {}
  async signUp(authInfo: signupInput): Promise<authEntity> {
    const { email, username, password } = authInfo;
    await this._verifyEmailExist(email);
    await this._validateUsername(username);
    const user = await this.AuthRepo.create({ email, username, password });
    await this.AuthRepo.save(user);
    return user;
  }

  async login(
    email: string,
    password: string,
  ): Promise<loginResponse> {
    const user = await this.validateUser(email, password);
    const payload = { id: user.id, email: user.email } 
    console.log("secret",process.env.JWT_SECRET)
    return {token:this.jwtService.sign(payload)}
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<authEntity | null> {
    const user = await this.AuthRepo.findOneBy({ email });
    if (user && (await user.validatePassword(password,user.password))) {
      return user;
    }
    throw new BadRequestException("invalid credentials");
  }

  async _verifyEmailExist(email: string) {
    const user = await this.AuthRepo.findOneBy({ email });
    if (user) {
      throw new BadRequestException('email already exist');
    }
  }

  async _validateUsername(username: string) {
    const user = await this.AuthRepo.findOneBy({ username });
    if (user) {
      throw new BadRequestException('username already choosen');
    }
  }
}
