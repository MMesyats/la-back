import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateVehicleDTO, UpdateVehicleDTO } from './vehicle.dto';
import { VehicleService } from './vehicle.service';

@ApiTags('vehicle')
@Controller('vehicle')
export class VehicleController {
  constructor(private vehicleService: VehicleService) {}

  @Get('/list')
  async getVehicles() {
    return await this.vehicleService.listVehicles();
  }

  @Get('/list/free')
  async getFreeVehicles() {
    return await this.vehicleService.listFreeVehicles();
  }

  @Post()
  async createVehicle(@Body() body: CreateVehicleDTO) {
    return await this.vehicleService.createVehicle(body);
  }

  @Put()
  async updateVehicle(@Body() body: UpdateVehicleDTO) {
    return await this.vehicleService.updateVehicle(body);
  }

  @Delete('/:id')
  async deleteVehicle(@Param('id') id: number) {
    await this.vehicleService.deleteVehicle(id);
    return 'ok';
  }
}
