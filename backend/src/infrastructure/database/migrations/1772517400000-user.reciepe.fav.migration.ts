import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class UserFavoritesMigration1772517400000 implements MigrationInterface {
    name = 'UserFavoritesMigration1772517400000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user_favorites",
            columns: [
                { name: "uuid", type: "uuid", isPrimary: true, isGenerated: true, generationStrategy: "uuid", default: "uuid_generate_v4()" },
                { name: "recipe_uuid", type: "uuid" },
                { name: "user_uuid", type: "uuid" },
                { name: "is_available", type: "boolean", default: true },
                { name: "is_active", type: "boolean", default: true },
            ]
        }), true);

        await queryRunner.createForeignKeys("user_favorites", [
            new TableForeignKey({
                name: "FK_fav_recipe",
                columnNames: ["recipe_uuid"],
                referencedColumnNames: ["recipe_uuid"],
                referencedTableName: "recipe",
                onDelete: "CASCADE"
            }),
            new TableForeignKey({
                name: "FK_fav_user",
                columnNames: ["user_uuid"],
                referencedColumnNames: ["uuid"],
                referencedTableName: "users",
                onDelete: "CASCADE"
            })
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("user_favorites", "FK_fav_user");
        await queryRunner.dropForeignKey("user_favorites", "FK_fav_recipe");
        await queryRunner.dropTable("user_favorites");
    }
}
