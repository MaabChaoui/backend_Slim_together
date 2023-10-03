import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Patient extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    nullable: true
})
  dateOfBirth: Date;
  
  @Column({
    nullable: true
})
  mobile: string;

  @Column({
    nullable: true
})
  address: string;

  @Column()
  gender : "male" | "female";

  @Column({
    nullable: true
})
  weight: number;

  @Column({
    nullable: true
})
  height: number;

  @Column({
    nullable: true
})
  waist: number;

  @Column({
    nullable: true
})
  hip: number;

  @Column({
    nullable: true
})
  illnesses: string;

  @Column({
    nullable: true
})
  abdominalBloating: string;

  @Column({
    nullable: true
})
  sleepProblems: string;

  @Column({
    nullable: true
})
  moreParentIlnesses: string;
  /* 
  extras
  @Column()
  : string;

  @Column()
  : string; */
}
