import { Injectable, NotFoundException } from '@nestjs/common';
import {assign} from "lodash"
import { profileInput } from './profile.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { profileEntity } from './profile.entity';
import { authEntity } from 'src/auth/auth.entity';
import { profileUpdateDto } from './updateProfile.dto';

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

  async getProfile(profile: profileEntity): Promise<profileEntity> {
    const { id } = profile;
    const user = await this.profileRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async updateProfile(
    id: string,
    profileData: profileUpdateDto,
  ): Promise<{id:string}> {
    const profile = await this.profileRepository.findOneBy({ id });
    if (!profile) throw new NotFoundException();
    assign(profile, profileData);
    await this.profileRepository.save(profile);
    return {id:profile.id}
  }
}
