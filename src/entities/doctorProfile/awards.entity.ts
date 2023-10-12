import { Doctor } from "../doctor.entity";
import Model from "../model.entity";
import { Column, Entity, ManyToOne } from "typeorm";

//id is inherited from Model

@Entity()
export class Awards extends Model {
  @Column()
  title: string;

  @Column()
  desc: string;

  @Column()
  year: string;

  @ManyToOne(() => Doctor, (doc) => doc.awards)
  doctor: Doctor;
}
