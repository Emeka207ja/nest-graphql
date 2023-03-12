import { UseGuards } from "@nestjs/common"
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql"
import {authType} from "./auth.type"
import { AuthService } from "./auth.service"
import { authDto } from "./dto/auth.dto"
import { authResponse } from "./auth.response"
import { signupInput } from "./signup.input"
import { loginResponse } from "./login.response"
import { localAuthGuard } from "./local-auth.guard"

@Resolver((of)=>authType)
export class authResolver{ 
    constructor(
        private readonly authService:AuthService
    ){}
    @Query(returns => authType)
    user() {
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
}