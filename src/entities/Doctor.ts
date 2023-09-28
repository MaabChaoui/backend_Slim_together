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
    phoneNummber: string | null

    @Column()
    email: string | null

    @Column()
    gender: string

    @Column()
    dateOfBirth: Date

    @Column()
    biography: string

    @Column()
    addressLine1: string|null

    @Column()
    addressLine12: string|null

    @Column()
    city: string|null

    @Column()
    stateProvince: string|null

    @Column()
    postalCode: string|null

    //many many mooooooooooooooooooooooore
}