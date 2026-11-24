// src/database/entities/employee-travel-destination.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { EmployeeTravelRequestEntity } from './employee-travel-request.entity';

@Entity('employee_travel_destinations')
export class EmployeeTravelDestinationEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  employee_travel_request_id: string;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({ type: 'varchar', length: 100 })
  country: string;

  @Column({ type: 'date' })
  arrival_date: Date;

  @Column({ type: 'date' })
  departure_date: Date;

  @Column({ type: 'boolean', default: false })
  accommodation_required: boolean;

  // relations

  @ManyToOne(() => EmployeeTravelRequestEntity, (req) => req.destinations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'employee_travel_request_id',
    referencedColumnName: 'employee_travel_request_id',
  })
  travel_request: EmployeeTravelRequestEntity;
}
