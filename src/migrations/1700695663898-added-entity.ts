import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedEntity1700695663898 implements MigrationInterface {
    name = 'AddedEntity1700695663898'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctor" ALTER COLUMN "dateofbirth" SET DEFAULT '"1980-01-01T00:00:00.000Z"'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "dateofbirth" SET DEFAULT '"1980-01-01T00:00:00.000Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "dateofbirth" SET DEFAULT '1980-01-01 00:00:00'`);
        await queryRunner.query(`ALTER TABLE "doctor" ALTER COLUMN "dateofbirth" SET DEFAULT '1980-01-01 00:00:00'`);
    }

}
