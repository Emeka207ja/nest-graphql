import { IsString, IsNotEmpty } from "class-validator";

export class passwordUpdateDto{
    @IsString()
    @IsNotEmpty()
    new_password:string
    @IsString()
    @IsNotEmpty()
    old_password:string
}