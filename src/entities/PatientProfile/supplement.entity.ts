import Model from "../model.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { User } from "../user.entity";
import { test } from "node:test";

//id is inherited from Model

@Entity()
export class Supplements extends Model {
  @Column({
    name: "name",
  })
  name: string;

  @ManyToOne((type) => User, (user) => user.supplements, { eager:true, cascade: true })
  user: User;
}
