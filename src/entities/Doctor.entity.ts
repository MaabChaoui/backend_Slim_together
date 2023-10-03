import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Doctor{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    phoneNumber: string

    @Column()
    email: string

    @Column()
    gender: string

    @Column()
    dateOfBirth: Date

    @Column()
    biography: string

    @Column()
    addressLine1: string

    @Column()
    addressLine12: string

    @Column()
    city: string

    @Column()
    stateProvince: string

    @Column()
    postalCode: string

    //many many mooooooooooooooooooooooore
}