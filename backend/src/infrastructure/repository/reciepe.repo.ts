import { Injectable } from "@nestjs/common";
import { RecipeEntity } from "src/entities/reciepe.entity";
import { CreateReciepeDto } from "src/features/receipe/create-reciepe/reciepe.create.dto";
import { DataSource, Like, Repository } from "typeorm";

@Injectable()
export class RecipeRepository extends Repository<RecipeEntity> {
    constructor(private readonly dataSource: DataSource) {
        super(RecipeEntity, dataSource.createEntityManager());
    }

    async createReciepe(body: Partial<CreateReciepeDto>, user_uuid: string) {
        const receipe = this.create({ ...body, user_uuid });
        return await this.save(receipe);
    }

    async findReciepeUsingRecipeName(recipe_name: string) {
        return await this.findOne({
            where: {
                recipe_name: recipe_name,
                is_active: true,
                is_deleted: false
            }
        });
    }

    async searchReceiepeUsingName(recipe_name: string) {
        return await this.find({
            where: {
                recipe_name: Like(`%${recipe_name}%`),
                is_active: true,
                is_deleted: false
            }
        });
    }

    async searchReceiepeUsingUUID(recipe_uuid: string) {
        return await this.findOne({
            where: {
                recipe_uuid: recipe_uuid,
                is_active: true,
                is_deleted: false,
            }, relations: {
                images: true,
                steps: true,
                user: true,
                favoritedBy: true
            }, select: {
                recipe_uuid: true,
                recipe_name: true,
                user_uuid: true,
                user: {
                    uuid: true,
                    username: true,
                    email: true
                },
                steps: {
                    steps_string: true,
                    uuid: true
                },
                images: {
                    img: true,
                    uuid: true,
                },
                favoritedBy: true,
                description: true
            }
        });
    }

    async findReciepeUsingUUID(recipe_uuid: string) {
        return await this.findOne({
            where: {
                recipe_uuid: recipe_uuid,
                is_active: true,
                is_deleted: false
            }
        });
    }

    async fetchReceipesUsingUUID(user_uuid: string) {
        const receipes = await this.find({
            where: {
                user_uuid: user_uuid,
                is_active: true,
                is_deleted: false,
            }, relations: {
                images: true,
                steps: true,
                user: true,
                favoritedBy: true
            }, select: {
                recipe_uuid: true,
                recipe_name: true,
                user_uuid: true,
                user: {
                    uuid: true,
                    username: true,
                    email: true
                },
                steps: {
                    steps_string: true,
                    uuid: true
                },
                images: {
                    img: true,
                    uuid: true,
                },
                favoritedBy: true,
                description: true
            }
        });
        return receipes;
    }

    async fetchFavReceipesUsingUUID(user_uuid: string) {
        const receipes = await this.find({
            where: {
                favoritedBy: {
                    user_uuid: user_uuid,
                    is_active: true,
                },
                is_active: true,
                is_deleted: false,
            }, relations: {
                images: true,
                steps: true,
                user: true,
                favoritedBy: true
            },
            select: {
                recipe_uuid: true,
                user_uuid: true,
                recipe_name: true,
                user: {
                    uuid: true,
                    username: true,
                    email: true
                },
                steps: {
                    steps_string: true,
                    uuid: true
                },
                images: {
                    img: true,
                    uuid: true,
                },
                favoritedBy: true,
                description: true
            }
        });
        return receipes;
    }

    async deleteReciepe(receipe_uuid: string, user_uuid: string) {
        const receipe = await this.update(
            { recipe_uuid: receipe_uuid, user_uuid: user_uuid },
            { is_active: false, is_deleted: true }
        );
        return receipe;
    }

    async fetchAllReceipes() {
        const receipes = await this.find({
            where: {
                is_active: true,
                is_deleted: false,
            }, relations: {
                images: true,
                steps: true,
                user: true,
                favoritedBy: true
            }, select: {
                recipe_uuid: true,
                recipe_name: true,
                user_uuid: true,
                user: {
                    uuid: true,
                    username: true,
                    email: true
                },
                steps: {
                    steps_string: true,
                    uuid: true
                },
                images: {
                    img: true,
                    uuid: true,
                },
                favoritedBy: true,
                description: true
            }
        });
        return receipes;
    }
}