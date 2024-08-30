import { Entity, Column, PrimaryGeneratedColumn, ManyToOne  } from 'typeorm';
import { AccountType } from '../domain/accounts.type';
import { ManagerEntity } from '../../managers/entities/managers.entity';
import { CustomerEntity } from '../../customers/entities/customers.entities';

@Entity()
export class AccountEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    balance: number;

    @ManyToOne(() => CustomerEntity, customer => customer.accounts)
    idClient: CustomerEntity;

    @ManyToOne(() => ManagerEntity, manager => manager.idAccounts)
    idManager: ManagerEntity;

    @Column({ nullable: true })
    interest?: number;

    @Column({ nullable: true })
    limit?: number;

    @Column()
    accountType: AccountType;
}