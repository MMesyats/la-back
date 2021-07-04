import { MigrationInterface, QueryRunner } from 'typeorm';
import { Vehicle } from '../vehicle/vehicle.entity';
import { Route } from '../route/route.entity';

export class Vehicles1625421660824 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const vehicleRepository = queryRunner.connection.getRepository(Vehicle);
    const routeRepository = queryRunner.connection.getRepository(Route);
    const vehicles = [];
    const numberFormat = Intl.NumberFormat('en', { minimumIntegerDigits: 2 });
    for (let i = 0; i < 10; i++) {
      const vehicle = new Vehicle()
        .setId(i + 10)
        .setLicensePlate(`AA10${numberFormat.format(i)}AA`)
        .setMileage(i * 10)
        .setModel(`Model ${(i % 3) + 1}`)
        .setType(Math.random() > 0.5 ? 'passenger' : 'truck')
        .setStatus('free')
        .setPurchaseDate(new Date(2020, i));
      vehicles.push(vehicle);
    }
    const cities = [
      'New Bedford',
      'New Haven',
      'New London',
      'New Orleans',
      'New York',
      'New York City',
      'Newark',
      'Newburgh',
      'Newport News',
      'Norfolk',
      'Normal',
      'Norman',
      'North Charleston',
      'North Las Vegas',
      'North Port',
      'Norwalk',
      'Norwich',
      'Oakland',
      'Ocala',
      'Oceanside',
      'Odessa',
      'Ogden',
      'Oklahoma City',
      'Olathe',
    ];

    const routes = [];
    for (let i = 0; i < 20; i++) {
      const route = new Route()
        .setId(i + 20)
        .setDeparture(new Date(2020, i))
        .setArrival(new Date(2020, i + 1))
        .setCityStart(cities[i])
        .setCityEnd(cities[i + 1])
        .setDistance(i * 1000)
        .setPrice(Math.floor(Math.random() * 1000))
        .setRequiredType(Math.random() > 0.5 ? 'passenger' : 'truck')
        .setStatus('waiting');
      routes.push(route);
    }
    vehicleRepository.save(vehicles);
    routeRepository.save(routes);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE vehicle; DROP TABLE route;`);
  }
}
