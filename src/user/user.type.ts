import { ObjectType, Field,ID } from "@nestjs/graphql"

@ObjectType("user")
export class userType{
    @Field((type)=>ID)
    id:string
    @Field()
    email:string
    @Field()
    username:string
    @Field()
    password:string
}