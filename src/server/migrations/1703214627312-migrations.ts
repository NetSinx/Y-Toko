import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1703214627312 implements MigrationInterface {
    name = 'Migrations1703214627312'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cart" ("id" SERIAL NOT NULL, "nama" character varying(200) NOT NULL, "gambar" character varying(200) NOT NULL, "kuantitas" integer NOT NULL, "harga" integer NOT NULL, "kategoriId" integer, "userId" integer, CONSTRAINT "UQ_7bf483f7e27d61ffdc9b80dbc4f" UNIQUE ("nama"), CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "nama" character varying(200) NOT NULL, "gambar" character varying(200) NOT NULL, "kuantitas" integer NOT NULL, "total_harga" integer NOT NULL, "kategoriId" integer, "userId" integer, CONSTRAINT "UQ_18abf907de8e7c41efbed2da30c" UNIQUE ("nama"), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product" ADD "stok" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "cartId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD "orderId" integer`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_bac1f560c0999f117b8e4ad496e" FOREIGN KEY ("kategoriId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_975bc9e513a8ee66a8c5f0c4f9c" FOREIGN KEY ("kategoriId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_342497b574edb2309ec8c6b62aa" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_25371c904b4a1ba5a3e330c8fbf" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_25371c904b4a1ba5a3e330c8fbf"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_342497b574edb2309ec8c6b62aa"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_975bc9e513a8ee66a8c5f0c4f9c"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_bac1f560c0999f117b8e4ad496e"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "orderId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "cartId"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "stok"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "cart"`);
    }

}
