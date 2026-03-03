import { Injectable } from "@nestjs/common";
import { RecipeImageEntity } from "src/entities/reciepe.image.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class RecipeImgRepository extends Repository<RecipeImageEntity> {
    constructor(private readonly dataSource: DataSource) {
        super(RecipeImageEntity, dataSource.createEntityManager());
    }

    async createReciepeImg(img: string, recipe_uuid: string) {
        const receipe = this.create({ img, recipe_uuid });
        return await this.save(receipe);
    }

    async deleteReciepe(receipe_uuid: string, user_uuid: string) {
        const receipe = await this.update(
            { recipe_uuid: receipe_uuid },
            { is_active: false, is_deleted: true }
        );
        return receipe;
    }
}