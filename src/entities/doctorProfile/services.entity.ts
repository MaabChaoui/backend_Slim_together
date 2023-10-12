import { Doctor } from "../doctor.entity";
import Model from "../model.entity";
import { Column, Entity, ManyToOne } from "typeorm";

//id is inherited from Model

@Entity()
export class Services extends Model {
  @Column()
  title: string;

  @ManyToOne(() => Doctor, (doc) => doc.services )
  doctor: Doctor
}
