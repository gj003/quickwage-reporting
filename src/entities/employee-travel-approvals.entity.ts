// src/database/entities/employee-travel-approvals.entity.ts

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { TravelApprovalLevel, TravelApprovalStatus } from 'src/common/enum';
import { EmployeeTravelRequestEntity } from './employee-travel-request.entity';

@Entity('employee_travel_approvals')
export class EmployeeTravelApprovalEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  employee_travel_approval_id: string;

  @Column({ type: 'uuid' })
  employee_travel_request_id: string;

  @Column({ type: 'varchar', nullable: true })
  approval_level: TravelApprovalLevel;

  @Column({ type: 'uuid' })
  approver_user_id: string;

  @Column({ type: 'varchar', nullable: true })
  status: TravelApprovalStatus | null;

  @Column({ type: 'text', nullable: true })
  remarks: string | null;

  @Column({ type: 'timestamp', nullable: true })
  actioned_at: Date | null;

  @ManyToOne(() => EmployeeTravelRequestEntity)
  @JoinColumn({
    name: 'employee_travel_request_id',
    referencedColumnName: 'employee_travel_request_id',
  })
  travel_request: EmployeeTravelRequestEntity;
}
