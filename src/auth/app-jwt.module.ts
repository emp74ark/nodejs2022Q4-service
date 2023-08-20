import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET_KEY, TOKEN_EXPIRE_TIME } from '../entities';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: TOKEN_EXPIRE_TIME },
    }),
  ],
  exports: [JwtModule],
})
export class AppJwtModule {}
