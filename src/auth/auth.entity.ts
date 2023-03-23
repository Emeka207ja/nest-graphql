import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    OneToOne,
    JoinColumn,
    Index
} from "typeorm"
import {
    IsString,
    IsOptional,
    IsEnum,
    IsBoolean,
    IsEmail
} from "class-validator";
import * as bcrypt from 'bcrypt';
import { profileEntity } from "src/user/profile.entity";
import { Role } from "./enum/role.enum";
import { type } from "os";

@Entity("auth")
 
export class authEntity{
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ unique: true })
    @Index()
    @IsEmail()
    email: string;

    @Column({ unique: true })
    @Index()
    @IsString()
    username: string;

    @Column()
    @IsString()
    password: string;

    @Column({
        type: "enum",
        enum: Role,
        array: true,
        default:[Role.User]
    })
    @IsEnum(Role)
    role: Role[]
    
    @OneToOne(() => profileEntity, (profile) => profile.auth)
    @JoinColumn()
    profile: profileEntity;
    
    async hashPassword(password: string):Promise<string> {
        const salt = await bcrypt.genSalt(12)
        const hash = await bcrypt.hash(password, salt)
        return hash
    }

    async validatePassword(password: string, hash: string): Promise<boolean>{
        return await bcrypt.compare(password,hash)
    }
    @BeforeInsert()
    async encryptPassword() {
        if(this.password) this.password = await this.hashPassword(this.password)
    }
}