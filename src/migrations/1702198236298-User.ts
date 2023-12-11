import { MigrationInterface, QueryRunner } from "typeorm";

export class User1702198236298 implements MigrationInterface {
    name = 'User1702198236298'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "nama" character varying(200) NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "pesan" character varying(300) NOT NULL, "userId" integer, "produkId" integer, CONSTRAINT "REL_c0354a9a009d3bb45a08655ce3" UNIQUE ("userId"), CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "nama" character varying(200) NOT NULL, "gambar" character varying(200) NOT NULL, "deskripsi" character varying(300) NOT NULL, "kategoriId" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_ee3e052de5f50a2c67fb6766675" FOREIGN KEY ("produkId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_b70f534d35eb84676de08127b7d" FOREIGN KEY ("kategoriId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_b70f534d35eb84676de08127b7d"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_ee3e052de5f50a2c67fb6766675"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
