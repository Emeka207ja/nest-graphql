import {
    Entity,
    OneToOne,
    Column,
    PrimaryGeneratedColumn

} from "typeorm";
import {
    IsString,
    IsEmail,
    IsOptional,
    IsPhoneNumber,
    IsEnum
} from "class-validator"
import { authEntity } from "src/auth/auth.entity";
import { Role } from "src/auth/enum/role.enum";

@Entity("profile")
export class profileEntity{
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ unique: true, type: "varchar" })
    @IsEmail()
    email: string;

    @Column({ type: "enum", enum:Role, array:true,default:[Role.User]})
    @IsString()
    @IsEnum(Role)
    role: Role[]

    @Column({ type: "varchar", unique: true })
    @IsString()
    username: string
    
    @Column({ type: "text",default:null })
    @IsOptional()
    @IsString()
    firstname: string
    
    @Column({ type: "text", default: null })
    @IsOptional()
    @IsString()
    lastname: string;
    
    @Column({ type: "varchar",default:null })
    @IsPhoneNumber()
    @IsOptional()
    phone: string;

    @OneToOne(() => authEntity, (auth) => auth.profile)
    auth: authEntity;
}