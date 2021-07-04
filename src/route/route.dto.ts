import { IsEnum } from 'class-validator';
import { VehicleType } from 'src/vehicle/vehicle.entity';
import { RouteStatus } from './route.entity';
import {
  IsInt,
  IsString,
  IsNumber,
  IsOptionalInt,
  IsDate,
} from '../decorators/decorators.dto';

export class CreateRouteDTO {
  @IsString({ example: 'Kyiv' })
  cityStart: string;

  @IsString({ example: 'Kharkiv' })
  cityEnd: string;

  @IsNumber({ example: '100' })
  cityDistance: number;

  @IsString({ example: 'truck' })
  @IsEnum(['truck', 'passenger'])
  requiredType: VehicleType;

  @IsNumber({ example: '1000.00' })
  price: number;

  @IsDate()
  departure: Date;

  @IsDate()
  arrival: Date;

  @IsOptionalInt({ example: '1' })
  vehicle: number | null;

  @IsString({ example: 'waiting' })
  @IsEnum(['waiting', 'in progress', 'done'])
  status: RouteStatus;
}

export class UpdateRouteDTO extends CreateRouteDTO {
  @IsInt({ example: '1' })
  id: number;
}
