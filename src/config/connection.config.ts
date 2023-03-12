import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { authEntity } from "src/auth/auth.entity";
export const mongoConnection: TypeOrmModuleOptions = {
  type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "imprint",
    database: "GraphQlDb",
  entities: [authEntity],
  synchronize:true
//   synchronise:true,
//   useUnifiedTopology:true
};