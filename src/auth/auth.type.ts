import {ObjectType,Field,ID} from "@nestjs/graphql"

@ObjectType("auth")
export class authType{
    @Field((type) => ID)
    id: string;
    @Field()
    email: string;
    @Field()
    username:string
    @Field()
    password:string
}