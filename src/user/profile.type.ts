import { ObjectType, Field,ID } from "@nestjs/graphql";

@ObjectType()

export class profile{
    @Field((type) => ID)
    id: string

    @Field()
    username: string
    
    @Field()
    email: string
    
    @Field({nullable:true})
    firstname?: string
    
    @Field({nullable:true})
    lastname?: string
    
    @Field({nullable:true})
    phone?:string
}