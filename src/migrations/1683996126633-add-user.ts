import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUser1683996126633 implements MigrationInterface {
  name = 'AddUser1683996126633';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('ADMIN', 'MANAGER')`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'MANAGER', "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "avatarUrl" character varying, "isActivated" boolean NOT NULL DEFAULT false, "confirmationToken" character varying, "confirmTokenSendAt" TIMESTAMP, "isConfirmed" boolean NOT NULL DEFAULT false, "verifyCode" character varying, "verifyCodeSendAt" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
  }
}
