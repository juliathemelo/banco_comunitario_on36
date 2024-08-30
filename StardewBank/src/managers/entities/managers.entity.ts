import { AccountEntity } from 'src/accounts/entities/account.entity';
import { Column, Entity, PrimaryGeneratedColumn,OneToMany } from 'typeorm';

@Entity()
export class ManagerEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToMany(() => AccountEntity, account => account.idManager)
    idAccounts: AccountEntity[];
}