import Model from "../model.entity";
import { Column, Entity } from "typeorm";

//id is inherited from Model

@Entity()
export class Supplements extends Model {}
