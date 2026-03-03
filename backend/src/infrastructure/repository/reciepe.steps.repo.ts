import { Injectable } from "@nestjs/common";
import { RecipeStepEntity } from "src/entities/reciepe.steps.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class RecipeStepRepository extends Repository<RecipeStepEntity> {
    constructor(private readonly dataSource: DataSource) {
        super(RecipeStepEntity, dataSource.createEntityManager());
    }

    async createReciepeStep(steps_string: string, recipe_uuid: string) {
        const receipe = this.create({ steps_string, recipe_uuid });
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