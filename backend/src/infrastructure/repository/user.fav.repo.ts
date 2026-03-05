import { Injectable } from "@nestjs/common";
import { UserFavoriteEntity } from "src/entities/user.fav.reciepe.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class UserFavoriteRepository extends Repository<UserFavoriteEntity> {
    constructor(private readonly dataSource: DataSource) {
        super(UserFavoriteEntity, dataSource.createEntityManager());
    }

    async createFavReceipesUsingUUID(recipe_uuid: string, user_uuid: string) {
        const receipe = this.create({ recipe_uuid, user_uuid });
        return await this.save(receipe);
    }

    async fetchUsingRecipeUUID(recipe_uuid: string, user_uuid: string) {
        return await this.findOne(
            {
                where:
                {
                    recipe_uuid, user_uuid
                }
            }
        );
    }

    async ChangeStatusFavReceipesUsingUUID(recipe_uuid: string, user_uuid: string) {
        const record = await this.fetchUsingRecipeUUID(recipe_uuid, user_uuid);
        if (!record) return 0;

        const newStatus = !record.is_active;

        const result = await this.update(
            { recipe_uuid, user_uuid },
            { is_active: newStatus, is_available: newStatus }
        );
        return result.affected;
    }
}