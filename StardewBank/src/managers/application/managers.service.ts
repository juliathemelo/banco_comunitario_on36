import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateManagerDto } from '../dto/update-manager.dto';
import { CreateManagerDto } from '../dto/create-manager.dto';
import { ManagerEntity } from '../entities/managers.entity';

@Injectable()
export class ManagersService {

    constructor(
        @InjectRepository(ManagerEntity)
        private readonly managersRepository: Repository<ManagerEntity>,
    ) {}

    async createManager(createManagerDto: CreateManagerDto): Promise<ManagerEntity> {

        //VALIDANDO PARA VER SE A CONTA EXISTE (construir)
       
        const newManager = this.managersRepository.create(createManagerDto)
        return await this.managersRepository.save(newManager)
    }

    async updateManager(id: string, updateManagerDto: UpdateManagerDto): Promise<ManagerEntity> {

        const manager = await this.managersRepository.findOne({ where: { id } });
        if (!manager) {
          throw new NotFoundException(`Customer with ID ${id} not found`);
        } else {
            manager.name = updateManagerDto.name
            manager.idAccounts = updateManagerDto.idAccounts
            await this.managersRepository.save(manager)
        }

        return manager
    }

    async removeManager(id: string): Promise<void> {
        const manager = await this.managersRepository.findOne({ where: { id } });
        await this.managersRepository.remove(manager)
    }
}
