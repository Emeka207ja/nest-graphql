import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Role } from "src/auth/enum/role.enum";

@ObjectType()

export class profile{
    @Field((type) => ID)
    id: string

    @Field()
    username: string

    @Field(type=>[String])
    role: Role[]
    
    @Field()
    email: string
    
    @Field({nullable:true})
    firstname?: string
    
    @Field({nullable:true})
    lastname?: string
    
    @Field({nullable:true})
    phone?:string
}