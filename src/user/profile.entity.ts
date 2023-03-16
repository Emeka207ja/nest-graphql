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
    IsPhoneNumber
} from "class-validator"
import { authEntity } from "src/auth/auth.entity";

@Entity("profile")
export class profileEntity{
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ unique: true, type: "varchar" })
    @IsEmail()
    email: string;

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