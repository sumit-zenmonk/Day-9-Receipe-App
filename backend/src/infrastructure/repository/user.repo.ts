import { Injectable } from "@nestjs/common";
import { UserEntity } from "src/entities/user.entity";
import { RegisterDto } from "src/features/Auth/register/register.dto";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class UserRepository extends Repository<UserEntity> {
    constructor(private readonly dataSource: DataSource) {
        super(UserEntity, dataSource.createEntityManager());
    }

    async register(body: RegisterDto) {
        const user = this.create(body);
        return await this.save(user);
    }

    async findByUuid(uuid: string) {
        const user = await this.find({
            where: {
                uuid: uuid,
                is_active: true
            },
            select: {
                email: true,
                username: true,
                uuid: true
            }
        });
        return user;
    }

    async findByEmail(email: string) {
        const user = await this.find({
            where: {
                email: email,
                is_active: true
            },
            select: {
                email: true,
                username: true,
                uuid: true,
                password:true
            }
        });
        return user;
    }

    async findByUsername(username: string) {
        const user = await this.find({
            where: {
                username: username,
                is_active: true
            },
            select: {
                email: true,
                username: true,
                uuid: true,
                password:true
            }
        });
        return user;
    }

    async fetchingAllUsers() {
        const users = await this.find({
            where: {
                is_active: true
            },
            select: {
                email: true,
                username: true,
                uuid: true
            }
        });
        return users;
    }

    async deactivateUserUsingUUID(uuid: string) {
        const user = await this.update({ uuid: uuid }, { is_active: false });
        return user.affected;
    }
}