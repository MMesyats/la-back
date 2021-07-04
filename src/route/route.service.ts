import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Route } from './route.entity';
import { CreateRouteDTO, UpdateRouteDTO } from './route.dto';
import { VehicleService } from '../vehicle/vehicle.service';

@Injectable()
export class RouteService {
  constructor(
    private vehicleService: VehicleService,
    @InjectRepository(Route) private routeRepository: Repository<Route>,
  ) {}

  async listRoutes() {
    return await this.routeRepository.find();
  }

  async createRoute({
    cityDistance,
    cityEnd,
    cityStart,
    price,
    arrival,
    departure,
    requiredType,
    status,
    vehicle,
  }: CreateRouteDTO) {
    const vehicleEntity =
      vehicle != null ? await this.vehicleService.getVehicle(vehicle) : null;
    const route = new Route()
      .setCityStart(cityStart)
      .setCityEnd(cityEnd)
      .setDistance(cityDistance)
      .setPrice(price)
      .setArrival(arrival)
      .setDeparture(departure)
      .setRequiredType(requiredType)
      .setStatus(status)
      .setVehicle(vehicleEntity);
    if (
      vehicleEntity != null &&
      (vehicleEntity.type !== requiredType || vehicleEntity.status !== 'free')
    )
      throw new HttpException('Bad Request', 400);
    else {
      vehicleEntity.setStatus('busy');

      this.vehicleService.updateVehicle(vehicleEntity);
    }
    return this.routeRepository.save(route);
  }

  async updateRoute({
    id,
    cityDistance,
    cityEnd,
    cityStart,
    price,
    arrival,
    departure,
    requiredType,
    status,
    vehicle,
  }: UpdateRouteDTO) {
    const route = await this.routeRepository.findOne(id);
    if (route == null) throw new HttpException('Route entity not found', 400);
    if (route.vehicle != null)
      this.vehicleService.updateVehicle({ ...route.vehicle, status: 'free' });
    const vehicleEntity =
      vehicle != null ? await this.vehicleService.getVehicle(vehicle) : null;

    route
      .setCityStart(cityStart)
      .setCityEnd(cityEnd)
      .setDistance(cityDistance)
      .setPrice(price)
      .setArrival(arrival)
      .setDeparture(departure)
      .setRequiredType(requiredType)
      .setStatus(status)
      .setVehicle(vehicleEntity);
    if (vehicleEntity.type !== requiredType || vehicleEntity.status !== 'free')
      throw new HttpException('Bad Request', 400);
    else if (route.status !== 'done') {
      vehicleEntity.setStatus('busy');
      this.vehicleService.updateVehicle(vehicleEntity);
    }
    await this.routeRepository.update(id, route);
    return route;
  }

  async removeRoute(id) {
    return await this.routeRepository.delete(id);
  }
}
