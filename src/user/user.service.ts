import { Injectable } from '@nestjs/common';
import { profileInput } from './profile.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { profileEntity } from './profile.entity';
import { authEntity } from 'src/auth/auth.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(profileEntity)
    private readonly profileRepository: Repository<profileEntity>,
  ) {}

  async createProfile(
    auth: authEntity,
    userDetails: profileInput,
  ): Promise<string> {
    const profile = await this.profileRepository.create(userDetails);
    profile.auth = auth;
    await this.profileRepository.save(profile);
    return profile.id;
  }
}
