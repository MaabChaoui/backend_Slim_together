import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedEntity1697122468358 implements MigrationInterface {
    name = 'AddedEntity1697122468358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "education" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "desc" character varying NOT NULL, "year" character varying NOT NULL, "doctorId" uuid, CONSTRAINT "PK_bf3d38701b3030a8ad634d43bd6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "experience" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "year" character varying NOT NULL, "doctorId" uuid, CONSTRAINT "PK_5e8d5a534100e1b17ee2efa429a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "services" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "doctorId" uuid, CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "awards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "desc" character varying NOT NULL, "year" character varying NOT NULL, "doctorId" uuid, CONSTRAINT "PK_bc3f6adc548ff46c76c03e06377" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "specializations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "doctorId" uuid, CONSTRAINT "PK_1d4b2b9ff96a76def0bf7195a8f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "diet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f9d0f2b67d1c9bcaa6736f4cebd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "meals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "time" character varying NOT NULL, "components" character varying NOT NULL, CONSTRAINT "PK_e6f830ac9b463433b58ad6f1a59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "gender"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "dateOfBirth"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "biography"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "addressLine1"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "addressLine12"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "stateProvince"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "postalCode"`);
        await queryRunner.query(`ALTER TABLE "meals" DROP COLUMN "time"`);
        await queryRunner.query(`ALTER TABLE "meals" DROP COLUMN "components"`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD "phone" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."doctor_role_enum" AS ENUM('choose gender', 'male', 'female')`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD "role" "public"."doctor_role_enum" NOT NULL DEFAULT 'choose gender'`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD "DateOfBirth" TIMESTAMP NOT NULL DEFAULT '"1980-01-01T00:00:00.000Z"'`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD "bio" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD "address" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD "wilaya" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD "postcode" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD "clinicName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD "clinicAddress" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "meals" ADD "time" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "meals" ADD "components" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP CONSTRAINT "PK_ee6bf6c8de78803212c548fcb94"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD CONSTRAINT "PK_ee6bf6c8de78803212c548fcb94" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD CONSTRAINT "UQ_bf6303ac911efaab681dc911f54" UNIQUE ("email")`);
        await queryRunner.query(`CREATE INDEX "email_index" ON "doctor" ("email") `);
        await queryRunner.query(`ALTER TABLE "education" ADD CONSTRAINT "FK_77d7d4cf2b912ec4ae1858e6985" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "experience" ADD CONSTRAINT "FK_51fb6cfe04b02865ea532492bc9" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "FK_c086e7734b02c7fe9b946de9381" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "awards" ADD CONSTRAINT "FK_e45cf6f17ae1720d559be794add" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "specializations" ADD CONSTRAINT "FK_0b582477c8cb57a91d19d09e655" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "specializations" DROP CONSTRAINT "FK_0b582477c8cb57a91d19d09e655"`);
        await queryRunner.query(`ALTER TABLE "awards" DROP CONSTRAINT "FK_e45cf6f17ae1720d559be794add"`);
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "FK_c086e7734b02c7fe9b946de9381"`);
        await queryRunner.query(`ALTER TABLE "experience" DROP CONSTRAINT "FK_51fb6cfe04b02865ea532492bc9"`);
        await queryRunner.query(`ALTER TABLE "education" DROP CONSTRAINT "FK_77d7d4cf2b912ec4ae1858e6985"`);
        await queryRunner.query(`DROP INDEX "public"."email_index"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP CONSTRAINT "UQ_bf6303ac911efaab681dc911f54"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP CONSTRAINT "PK_ee6bf6c8de78803212c548fcb94"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD CONSTRAINT "PK_ee6bf6c8de78803212c548fcb94" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "meals" DROP COLUMN "components"`);
        await queryRunner.query(`ALTER TABLE "meals" DROP COLUMN "time"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "clinicAddress"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "clinicName"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "postcode"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "wilaya"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "bio"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "DateOfBirth"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."doctor_role_enum"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "meals" ADD "components" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "meals" ADD "time" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD "postalCode" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD "stateProvince" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD "addressLine12" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD "addressLine1" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD "biography" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD "dateOfBirth" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD "gender" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD "phoneNumber" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD "lastName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD "firstName" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "meals"`);
        await queryRunner.query(`DROP TABLE "diet"`);
        await queryRunner.query(`DROP TABLE "specializations"`);
        await queryRunner.query(`DROP TABLE "awards"`);
        await queryRunner.query(`DROP TABLE "services"`);
        await queryRunner.query(`DROP TABLE "experience"`);
        await queryRunner.query(`DROP TABLE "education"`);
    }

}
