import { IsEnum } from 'class-validator';
import {
  IsDate,
  IsInt,
  IsNumber,
  IsString,
} from '../decorators/decorators.dto';

export class CreateVehicleDTO {
  @IsString({ example: 'AA0000AA' })
  licensePlate: string;

  @IsString({ example: 'Truck Model' })
  model: string;

  @IsString({ example: 'truck' })
  @IsEnum(['truck', 'passenger'])
  type: 'truck' | 'passenger';

  @IsDate()
  purchaseDate: Date;

  @IsNumber({ example: '1000' })
  mileage: number;

  @IsString({ example: 'free' })
  @IsEnum(['free', 'busy'])
  status: 'free' | 'busy';
}

export class UpdateVehicleDTO extends CreateVehicleDTO {
  @IsInt({ example: '1' })
  id: number;
}
