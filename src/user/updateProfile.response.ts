import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()

export class updateProfileResponse{
    @Field()
    id:string
}