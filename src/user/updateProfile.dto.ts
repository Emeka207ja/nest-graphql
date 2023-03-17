import { IsString,IsPhoneNumber,IsOptional } from "class-validator";
export class profileUpdateDto{
    @IsString()
    @IsOptional()
    firstname: string
    
    @IsString()
    @IsOptional()
    lastname: string
    
    @IsPhoneNumber()
    @IsOptional()
    phone:string
}