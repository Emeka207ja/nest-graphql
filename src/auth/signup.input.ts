import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class signupInput{
    @Field()
    username:string
    @Field()
    email:string
    @Field()
    password:string
}