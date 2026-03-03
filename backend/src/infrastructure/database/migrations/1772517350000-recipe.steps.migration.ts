import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateRecipeStepsTable1772517350000 implements MigrationInterface {
    name = 'CreateRecipeStepsTable1772517350000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "recipe_steps",
            columns: [
                { name: "uuid", type: "uuid", isPrimary: true, isGenerated: true, generationStrategy: "uuid", default: "uuid_generate_v4()" },
                { name: "recipe_uuid", type: "uuid" },
                { name: "steps_string", type: "text" },
                { name: "is_active", type: "boolean", default: true },
                { name: "is_deleted", type: "boolean", default: false },
            ]
        }), true);

        await queryRunner.createForeignKey("recipe_steps", new TableForeignKey({
            name: "FK_steps_recipe",
            columnNames: ["recipe_uuid"],
            referencedColumnNames: ["recipe_uuid"],
            referencedTableName: "recipe",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("recipe_steps", "FK_steps_recipe");
        await queryRunner.dropTable("recipe_steps");
    }
}
