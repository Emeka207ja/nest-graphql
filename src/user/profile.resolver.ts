import { Resolver, Query, Mutation,Args } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { profile } from "./profile.type";
import { UserService } from "./user.service";
import { CurrentUser } from "src/auth/user.decorator";
import { profileEntity } from "./profile.entity";
import { jwtAuthGuard } from "src/auth/jwt-auth.guard";
import { updateProfileResponse } from "./updateProfile.response";

@Resolver((of) => profile)
export class profileResolver {
  constructor(private readonly userService: UserService) {}
  @Query((returns) => profile)
  @UseGuards(jwtAuthGuard)
  async getProfile(@CurrentUser() user: profileEntity) {
    return await this.userService.getProfile(user);
  }

  @Mutation((returns) => updateProfileResponse)
  @UseGuards(jwtAuthGuard)
  async updateProfile(
    @CurrentUser() user: profileEntity,
    @Args('firstname') firstname: string,
    @Args('lastname') lastname: string,
    @Args('phone') phone: string,
  ) {
    console.log(user);
    const { id } = user
    return await this.userService.updateProfile(id,{firstname,lastname,phone})
  }
}