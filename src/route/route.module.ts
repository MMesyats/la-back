import { Module } from '@nestjs/common';
import { RouteController } from './route.controller';
import { RouteService } from './route.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from './route.entity';
import { VehicleModule } from '../vehicle/vehicle.module';

@Module({
  imports: [TypeOrmModule.forFeature([Route]), VehicleModule],
  controllers: [RouteController],
  providers: [RouteService],
})
export class RouteModule {}
