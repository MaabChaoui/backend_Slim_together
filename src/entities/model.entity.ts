import {
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    BaseEntity,
  } from 'typeorm';
  
  export enum RoleEnumType {
    USER = "user",
    ADMIN = "admin",
  }
  
  export enum GenderEnumType {
    CHOOSE_GENDER = "choose gender",
    MALE = "male",
    FEMALE = "female",
  }
  
  export enum MaritalStatusEnumType {
    MARRIED = "married",
    NOT_MARRIED = "not married",
  }

  export default abstract class Model extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }