import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from "@nestjs/typeorm"
import { JwtModule } from "@nestjs/jwt"
import {PassportModule} from "@nestjs/passport"
import { authEntity } from './auth.entity';
import { localStrategy } from './local.strategy';
import { jwtStrategy } from './jwt.strategy';
import { jwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
@Module({
  providers: [AuthService, authResolver, localStrategy, jwtStrategy,jwtAuthGuard,RolesGuard],
  exports:[jwtAuthGuard,AuthService],
  imports: [
    TypeOrmModule.forFeature([authEntity]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: "imprint",
      signOptions:{expiresIn:"7d"}
    })
  ],
})
export class AuthModule {}
