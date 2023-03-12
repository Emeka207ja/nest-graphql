import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from "@nestjs/typeorm"
import { JwtModule } from "@nestjs/jwt"
import {PassportModule} from "@nestjs/passport"
import { authEntity } from './auth.entity';
import { localStrategy } from './local.strategy';
@Module({
  providers: [AuthService, authResolver,localStrategy],
  imports: [
    TypeOrmModule.forFeature([authEntity]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions:{expiresIn:"7d"}
    })
  ],
})
export class AuthModule {}
