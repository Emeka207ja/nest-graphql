import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    OneToOne,
    JoinColumn
} from "typeorm"
import * as bcrypt from 'bcrypt';
import { profileEntity } from "src/user/profile.entity";
@Entity("auth")
 
export class authEntity{
    @PrimaryGeneratedColumn()
    id: string;
    @Column({unique:true})
    email: string;
    @Column({unique:true})
    username: string;
    @Column()
    password: string;
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