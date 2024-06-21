import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as dotenv from "dotenv";
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from './auth/auth.service';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY!,
    });
  }

  async validate(payload: any) {
    return this.authService.validateUserFromPayload(payload);
  }
}
