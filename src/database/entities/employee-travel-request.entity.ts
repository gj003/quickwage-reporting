// src/database/entities/employee-travel-request.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import {
  EmployeeTravelRequestStatus,
  TravelType,
  TravelUrgencyLevel,
} from 'src/common/enum';
import { EmployeeTravelDestinationEntity } from './employee-travel-destination.entity';
import { UserEntity } from './user.entity';

@Entity('employee_travel_requests')
export class EmployeeTravelRequestEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  employee_travel_request_id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'varchar', length: 150 })
  travel_title: string;

  @Column({ type: 'text' })
  purpose_of_travel: string;

  @Column({ type: 'varchar' })
  travel_type: TravelType;

  @Column({ type: 'varchar' })
  urgency_level: TravelUrgencyLevel;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date' })
  end_date: Date;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  estimated_budget: number;

  @Column({ type: 'text' })
  business_justification: string;

  @Column({ type: 'boolean', default: false })
  travel_advance_required: boolean;

  @Column({
    type: 'varchar',
    default: EmployeeTravelRequestStatus.DRAFT,
  })
  status: EmployeeTravelRequestStatus;

  // relations

  @OneToMany(
    () => EmployeeTravelDestinationEntity,
    (dest) => dest.travel_request,
    { cascade: true },
  )
  destinations: EmployeeTravelDestinationEntity[];

  @ManyToOne(() => UserEntity, (user) => user.travel_bookings)
  @JoinColumn({ name: 'user_id' })
  user: any;
}
