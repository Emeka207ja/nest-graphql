import { InputType, ObjectType, Field } from "@nestjs/graphql"

@ObjectType("login")
export class loginResponse{
    @Field()
    token: string
    
}