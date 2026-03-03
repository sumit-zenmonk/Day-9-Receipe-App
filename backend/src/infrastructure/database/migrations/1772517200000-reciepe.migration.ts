import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class ReciepeMigration1772517200000 implements MigrationInterface {
    name = 'ReciepeMigration1772517200000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "recipe",
            columns: [
                { name: "recipe_uuid", type: "uuid", isPrimary: true, isGenerated: true, generationStrategy: "uuid", default: "uuid_generate_v4()" },
                { name: "user_uuid", type: "uuid", isNullable: true },
                { name: "recipe_name", type: "varchar" },
                { name: "description", type: "text" },
                { name: "is_active", type: "boolean", default: true },
                { name: "is_deleted", type: "boolean", default: false },
            ]
        }), true);

        await queryRunner.createForeignKey("recipe", new TableForeignKey({
            columnNames: ["user_uuid"],
            referencedColumnNames: ["uuid"],
            referencedTableName: "users",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("recipe");
    }
}
