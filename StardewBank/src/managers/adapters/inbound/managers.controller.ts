import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ManagersService } from '../../application/managers.service';
import { CreateManagerDto } from 'src/managers/dto/create-manager.dto';
import { ManagerEntity } from 'src/managers/entities/managers.entity';
import { UpdateManagerDto } from 'src/managers/dto/update-manager.dto';

@Controller('managers')
export class ManagersController {
    constructor(private readonly managerService: ManagersService) {

    }

    @Post()
    createManager(@Body() createManagerDto: CreateManagerDto): Promise<ManagerEntity> {
        return this.managerService.createManager(createManagerDto);
    }

    @Patch(':id/')
    updateManagerAccount(@Param('id') id: string, @Body()  updateManagerDto: UpdateManagerDto): Promise<ManagerEntity> {
        return this.managerService.updateManager(id, updateManagerDto);
    }

    @Delete(':id/')
    DeleteManager(@Param('id') id: string): Promise<void> {
        return this.managerService.removeManager(id);
    }
}
