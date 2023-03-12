import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { UnauthorizedException, Injectable } from "@nestjs/common"
import { AuthService } from "./auth.service";
import { authEntity } from "./auth.entity";

@Injectable()
export class localStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService
    ) {
        super({ usernameField: 'email' });
        this.authService = authService;
    }
    async validate(email:string,password:string){
        const user = await this.authService.validateUser(email, password)
        
        if (!user) {
            throw new UnauthorizedException("Invalid credentials");
        }
        return user;
    }
}