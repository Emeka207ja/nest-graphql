import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { profileEntity } from './profile.entity';
import { profileResolver } from './profile.resolver';


@Module({
  providers: [UserService, profileResolver],
  imports: [
    TypeOrmModule.forFeature([profileEntity]),
  ],
  exports: [UserService],
})
export class UserModule {}
