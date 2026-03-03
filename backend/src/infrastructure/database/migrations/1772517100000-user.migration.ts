import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserMigration1772517100000 implements MigrationInterface {
    name = 'UserMigration1772517100000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    { name: "uuid", type: "uuid", isPrimary: true, isGenerated: true, generationStrategy: "uuid", default: "uuid_generate_v4()", },
                    { name: "username", type: "varchar", },
                    { name: "email", type: "varchar", },
                    { name: "password", type: "varchar", },
                    { name: "is_active", type: "boolean", default: "true", },
                    { name: "created_at", type: "timestamp", default: "now()", },
                    { name: "updated_at", type: "timestamp", default: "now()", isNullable: true, },
                    { name: "deleted_at", type: "timestamp", isNullable: true, },
                ],
            }), true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users", true)
    }
}