import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedEntity1697122580473 implements MigrationInterface {
    name = 'AddedEntity1697122580473'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meals" DROP COLUMN "time"`);
        await queryRunner.query(`ALTER TABLE "meals" DROP COLUMN "components"`);
        await queryRunner.query(`ALTER TABLE "meals" ADD "time" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "meals" ADD "components" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctor" ALTER COLUMN "DateOfBirth" SET DEFAULT '"1980-01-01T00:00:00.000Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctor" ALTER COLUMN "DateOfBirth" SET DEFAULT '1980-01-01 00:00:00'`);
        await queryRunner.query(`ALTER TABLE "meals" DROP COLUMN "components"`);
        await queryRunner.query(`ALTER TABLE "meals" DROP COLUMN "time"`);
        await queryRunner.query(`ALTER TABLE "meals" ADD "components" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "meals" ADD "time" character varying NOT NULL`);
    }

}
