import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { profileEntity } from './profile.entity';
import { profileResolver } from './profile.resolver';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [UserService,profileResolver],
  imports: [
    TypeOrmModule.forFeature([profileEntity]),
   
  ],
  exports: [
    UserService,
  ]
})
export class UserModule {}
