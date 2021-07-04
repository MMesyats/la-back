import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { CreateVehicleDTO, UpdateVehicleDTO } from './vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle) private vehicleRepository: Repository<Vehicle>,
  ) {}

  async listVehicles() {
    return await this.vehicleRepository.find();
  }

  async listFreeVehicles() {
    return await this.vehicleRepository.find({ where: { status: 'free' } });
  }

  async getVehicle(id: number) {
    return await this.vehicleRepository.findOne(id);
  }

  async createVehicle({
    licensePlate,
    mileage,
    model,
    purchaseDate,
    status,
    type,
  }: CreateVehicleDTO) {
    const vehicle = new Vehicle()
      .setLicensePlate(licensePlate)
      .setMileage(mileage)
      .setModel(model)
      .setPurchaseDate(purchaseDate)
      .setStatus(status)
      .setType(type);

    return await this.vehicleRepository.save(vehicle);
  }

  async updateVehicle({
    id,
    licensePlate,
    mileage,
    model,
    purchaseDate,
    status,
    type,
  }: UpdateVehicleDTO) {
    const vehicle = await this.vehicleRepository.findOne(id);
    vehicle
      .setLicensePlate(licensePlate)
      .setMileage(mileage)
      .setModel(model)
      .setPurchaseDate(purchaseDate)
      .setStatus(status)
      .setType(type);

    await this.vehicleRepository.update(id, vehicle);
    return vehicle;
  }

  async deleteVehicle(id: number) {
    return await this.vehicleRepository.delete(id);
  }
}
