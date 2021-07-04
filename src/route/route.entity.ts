import { VehicleType } from 'src/vehicle/vehicle.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Vehicle } from '../vehicle/vehicle.entity';

export type RouteStatus = 'waiting' | 'in progress' | 'done';

@Entity()
export class Route {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  cityStart: string;

  @Column()
  cityEnd: string;

  @Column()
  cityDistance: number;

  @Column({ type: 'varchar' })
  requiredType: VehicleType;

  @Column({ type: 'float' })
  price: number;

  @Column()
  departure: Date;

  @Column()
  arrival: Date;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.id, {
    cascade: true,
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  vehicle: Vehicle | null;

  @Column({ type: 'varchar' })
  status: RouteStatus;

  setId(id: number) {
    this.id = id;
    return this;
  }

  setCityStart(city: string) {
    this.cityStart = city;
    return this;
  }

  setCityEnd(city: string) {
    this.cityEnd = city;
    return this;
  }

  setDistance(distance: number) {
    this.cityDistance = distance;
    return this;
  }

  setRequiredType(requiredType: VehicleType) {
    this.requiredType = requiredType;
    return this;
  }

  setDeparture(date: Date) {
    this.departure = date;
    return this;
  }

  setArrival(date: Date) {
    this.arrival = date;
    return this;
  }

  setPrice(price: number) {
    this.price = price;
    return this;
  }

  setVehicle(vehicle: Vehicle | null) {
    this.vehicle = vehicle;
    return this;
  }

  setStatus(status: RouteStatus) {
    this.status = status;
    return this;
  }
}
