import { UseGuards } from "@nestjs/common"
import { Resolver, Query, Mutation, Args,Context } from "@nestjs/graphql"
import {authType} from "./auth.type"
import { AuthService } from "./auth.service"
import { authDto } from "./dto/auth.dto"
import { authResponse } from "./auth.response"
import { signupInput } from "./signup.input"
import { loginResponse } from "./login.response"
import { localAuthGuard } from "./local-auth.guard"
import { jwtAuthGuard } from "./jwt-auth.guard"
import { CurrentUser } from "./user.decorator"
import { authEntity } from "./auth.entity"
import { passwordUpdateResponse } from "./passwordUpdate.response"

@Resolver((of)=>authType)
export class authResolver{ 
    constructor(
        private readonly authService:AuthService
    ){}
    @Query(returns => authType)
    @UseGuards(jwtAuthGuard)
    user(@CurrentUser() user: authEntity) {
        console.log("user",user)
        return {
            email: "test@gmail.com",
            username: "test",
            password:"i234"
        }
    }
    @Mutation(returns => authType)
    async signUp(
        @Args("email") email:string,
        @Args("username") username:string,
        @Args("password") password:string
        
    ) {
        return await this.authService.signUp({email,password,username});
    }

    @Mutation(returns => loginResponse)
    @UseGuards(localAuthGuard)
    async login(
        @Args("email") email: string,
        @Args("password") password:string
    ) {
        return await this.authService.login(email,password)
    }

    @Mutation(returns => passwordUpdateResponse)
    @UseGuards(jwtAuthGuard)
    async passwordUpdate(
        @CurrentUser()user:authEntity,
        @Args("old_password") old_password:string,
        @Args("new_password") new_password:string
    ) {
        const {id} = user
        return await this.authService.updatePassword(id,{old_password,new_password})
    }
}