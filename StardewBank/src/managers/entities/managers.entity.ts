import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ManagerEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('simple-array', { nullable: true })
    idAccounts: number[];
}