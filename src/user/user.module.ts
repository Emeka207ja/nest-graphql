import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { profileEntity } from './profile.entity';

@Module({
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([profileEntity])
  ],
  exports: [
    UserService,
  ]
})
export class UserModule {}
