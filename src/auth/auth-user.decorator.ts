import { createParamDecorator } from '@nestjs/common';

export const AuthUser = createParamDecorator((data, req) => {
  const { sub } = req.switchToHttp().getRequest().user;
  return sub;
});
