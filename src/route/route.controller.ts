import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RouteService } from './route.service';
import { CreateRouteDTO, UpdateRouteDTO } from './route.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('route')
@Controller('route')
export class RouteController {
  constructor(private routeService: RouteService) {}

  @Get('/list')
  async listRoutes() {
    return await this.routeService.listRoutes();
  }

  @Post()
  async createRoute(@Body() body: CreateRouteDTO) {
    return await this.routeService.createRoute(body);
  }

  @Put()
  async updateRoute(@Body() body: UpdateRouteDTO) {
    return await this.routeService.updateRoute(body);
  }

  @Delete(':id')
  async deleteRoute(@Param('id') id: number) {
    console.log(id);

    return await this.routeService.removeRoute(id);
  }
}
