import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedEntity1697298168751 implements MigrationInterface {
    name = 'AddedEntity1697298168751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meals" DROP COLUMN "time"`);
        await queryRunner.query(`ALTER TABLE "meals" DROP COLUMN "components"`);
        await queryRunner.query(`ALTER TABLE "meals" ADD "time" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "meals" ADD "components" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctor" ALTER COLUMN "dateofbirth" SET DEFAULT '"1980-01-01T00:00:00.000Z"'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "dateOfBirth" SET DEFAULT '"1980-01-01T00:00:00.000Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "dateOfBirth" SET DEFAULT '1980-01-01 00:00:00'`);
        await queryRunner.query(`ALTER TABLE "doctor" ALTER COLUMN "dateofbirth" SET DEFAULT '1980-01-01 00:00:00'`);
        await queryRunner.query(`ALTER TABLE "meals" DROP COLUMN "components"`);
        await queryRunner.query(`ALTER TABLE "meals" DROP COLUMN "time"`);
        await queryRunner.query(`ALTER TABLE "meals" ADD "components" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "meals" ADD "time" character varying NOT NULL`);
    }

}
