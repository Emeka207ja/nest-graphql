import { AuthGuard } from "@nestjs/passport"
import { Injectable, ExecutionContext } from "@nestjs/common"
import { GqlExecutionContext } from "@nestjs/graphql"

@Injectable()
export class localAuthGuard extends AuthGuard("local") {
    constructor() {
        super()
    }
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context) 
        const request = ctx.getContext()
        request.body = ctx.getArgs()
        return request
    }
}