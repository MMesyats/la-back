import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type VehicleType = 'truck' | 'passenger';
export type VehicleStatus = 'free' | 'busy';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  licensePlate: string;

  @Column()
  model: string;

  @Column({ type: 'varchar' })
  type: VehicleType;

  @Column()
  purchaseDate: Date;

  @Column({ type: 'float' })
  mileage: number;

  @Column({ type: 'varchar' })
  status: VehicleStatus;

  setId(id: number) {
    this.id = id;
    return this;
  }

  setLicensePlate(licensePlate: string) {
    this.licensePlate = licensePlate;
    return this;
  }

  setModel(model: string) {
    this.model = model;
    return this;
  }

  setType(type: 'truck' | 'passenger') {
    this.type = type;
    return this;
  }

  setPurchaseDate(date: Date) {
    this.purchaseDate = date;
    return this;
  }

  setMileage(mileage: number) {
    this.mileage = mileage;
    return this;
  }

  setStatus(status: 'free' | 'busy') {
    this.status = status;
    return this;
  }
}
