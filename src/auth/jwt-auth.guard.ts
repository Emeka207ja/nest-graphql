import { AuthGuard } from "@nestjs/passport";
import { Injectable, ExecutionContext } from "@nestjs/common"
import { GqlExecutionContext } from '@nestjs/graphql';

export class jwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    // console.log("users",ctx.getContext().req.user);
      return ctx.getContext().req;
  }
}