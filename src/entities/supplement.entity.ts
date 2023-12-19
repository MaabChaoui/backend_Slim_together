import Model from "./model.entity";
import { Column, Entity, ManyToOne, OneToOne } from "typeorm";
import { User } from "./user.entity";
import { test } from "node:test";
import RecordSupplements from "./recordSupplement.entity";

@Entity("supplements")
export class Supplements extends Model {
  @Column({
    name: "name",
  })
  name: string;

  @ManyToOne((type) => User, (user: User) => user.supplements, {
    onDelete: "CASCADE",
  })
  user: User;

  @OneToOne((type) => RecordSupplements, (rs) => rs.supplement)
  record: RecordSupplements;
}
