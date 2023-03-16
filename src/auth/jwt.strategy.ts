import { ExtractJwt, Strategy } from "passport-jwt"
import { PassportStrategy } from "@nestjs/passport"
import { AuthService } from "./auth.service"
import { Injectable } from "@nestjs/common"
import { authEntity } from "./auth.entity"

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'imprint',
    });
  }
  async validate(payload: {
    email: string;
    id: string;
  }): Promise<authEntity | null> {
    // console.log(ExtractJwt.fromAuthHeaderAsBearerToken());
    // console.log('payload', payload);
    const user = await this.authService.FindOne(payload.email);
    return user;
  }
}