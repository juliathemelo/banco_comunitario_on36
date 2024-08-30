import { AccountEntity } from '../../accounts/entities/account.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class CustomerEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    cep: number;

    @OneToMany(() => AccountEntity, account => account.idClient)
    accounts: AccountEntity[];
}