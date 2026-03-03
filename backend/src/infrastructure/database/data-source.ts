//Data-Source imports
import { DataSource, DataSourceOptions } from "typeorm";

//Entities
import { UserEntity } from "src/entities/user.entity";
import { RecipeEntity } from "src/entities/reciepe.entity";
import { RecipeStepEntity } from "src/entities/reciepe.steps.entity";
import { RecipeImageEntity } from "src/entities/reciepe.image.entity";
import { UserFavoriteEntity } from "src/entities/user.fav.reciepe.entity";

const options: DataSourceOptions = {
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432, //5433
    username: "postgres",
    password: "123", //sumit123
    database: "Receipe",
    entities: [UserEntity, RecipeEntity, RecipeStepEntity, RecipeImageEntity, UserFavoriteEntity],
    synchronize: false,
    migrations: ['dist/infrastructure/database/migrations/*{.ts,.js}'],
};

const dataSource = new DataSource(options);

export { dataSource };