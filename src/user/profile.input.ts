import { InputType, Field } from "@nestjs/graphql";
import { Role } from "src/auth/enum/role.enum";

@InputType()
export class profileInput{
    @Field()
    email:string
    @Field()
    username: string
    
}