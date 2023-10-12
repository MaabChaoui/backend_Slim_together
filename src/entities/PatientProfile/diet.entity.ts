import Model from "../model.entity";
import { Column, Entity } from "typeorm";

//id is inherited from Model

@Entity()
export class Diet extends Model {}
