import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1684031652068 implements MigrationInterface {
    name = 'Update1684031652068'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "verifyCodeSendAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "verifyCodeSendAt" TIMESTAMP NOT NULL`);
    }

}
