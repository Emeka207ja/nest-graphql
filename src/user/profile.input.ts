import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class profileInput{
    @Field()
    email:string
    @Field()
    username:string
}