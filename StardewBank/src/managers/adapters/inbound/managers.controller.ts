import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ManagersService } from '../../application/managers.service';
import { Manager } from '../../domain/manager.model';

@Controller('managers')
export class ManagersController {
    constructor(private readonly managerService: ManagersService) {

    }

    @Post()
    createManager(@Body('name') name: string, @Body('accountsList')  accountsList: number[]): Manager {
        return this.managerService.createManager(name, accountsList);
    }

    @Patch(':id/')
    updateManagerAccount(@Param('id') id: number, @Body('accountsList')  accountsList: number[]): Manager {
        return this.managerService.updateManager(id, accountsList);
    }

    @Delete(':id/')
    DeleteManager(@Param('id') id: number): void {
        return this.managerService.removeManager(id);
    }
}
