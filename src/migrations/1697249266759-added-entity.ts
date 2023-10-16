import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedEntity1697249266759 implements MigrationInterface {
    name = 'AddedEntity1697249266759'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctor" RENAME COLUMN "emaill" TO "email"`);
        await queryRunner.query(`ALTER TABLE "doctor" RENAME CONSTRAINT "UQ_5120b6f433c7a1bdef8462c721e" TO "UQ_bf6303ac911efaab681dc911f54"`);
        await queryRunner.query(`ALTER TABLE "meals" DROP COLUMN "time"`);
        await queryRunner.query(`ALTER TABLE "meals" DROP COLUMN "components"`);
        await queryRunner.query(`ALTER TABLE "meals" ADD "time" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "meals" ADD "components" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctor" ALTER COLUMN "photoURL" SET DEFAULT 'https://i.stack.imgur.com/l60Hf.png'`);
        await queryRunner.query(`ALTER TABLE "doctor" ALTER COLUMN "DateOfBirth" SET DEFAULT '"1980-01-01T00:00:00.000Z"'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "dateOfBirth" SET DEFAULT '"1980-01-01T00:00:00.000Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "dateOfBirth" SET DEFAULT '1980-01-01 00:00:00'`);
        await queryRunner.query(`ALTER TABLE "doctor" ALTER COLUMN "DateOfBirth" SET DEFAULT '1980-01-01 00:00:00'`);
        await queryRunner.query(`ALTER TABLE "doctor" ALTER COLUMN "photoURL" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "meals" DROP COLUMN "components"`);
        await queryRunner.query(`ALTER TABLE "meals" DROP COLUMN "time"`);
        await queryRunner.query(`ALTER TABLE "meals" ADD "components" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "meals" ADD "time" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctor" RENAME CONSTRAINT "UQ_bf6303ac911efaab681dc911f54" TO "UQ_5120b6f433c7a1bdef8462c721e"`);
        await queryRunner.query(`ALTER TABLE "doctor" RENAME COLUMN "email" TO "emaill"`);
    }

}
