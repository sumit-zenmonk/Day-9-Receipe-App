import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class RecipeImagesMigration1772517300000 implements MigrationInterface {
    name = 'RecipeImagesMigration1772517300000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "recipe_images",
            columns: [
                { name: "uuid", type: "uuid", isPrimary: true, isGenerated: true, generationStrategy: "uuid", default: "uuid_generate_v4()" },
                { name: "recipe_uuid", type: "uuid" },
                { name: "img", type: "varchar" },
                { name: "is_active", type: "boolean", default: true },
                { name: "is_deleted", type: "boolean", default: false },
            ]
        }), true);

        await queryRunner.createForeignKey("recipe_images", new TableForeignKey({
            name: "FK_images_recipe",
            columnNames: ["recipe_uuid"],
            referencedColumnNames: ["recipe_uuid"],
            referencedTableName: "recipe",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("recipe_images", "FK_images_recipe");
        await queryRunner.dropTable("recipe_images");
    }
}
