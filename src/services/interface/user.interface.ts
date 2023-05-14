import { User } from "@/entities/user.entity";

export interface IUserService  {
    create(item: any): Promise<any>
    findAll(): Promise<User[]>
}