// src/database/entities/attendance-regularisation-detail.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { AttendanceRequestEntity } from './attendance-request.entity';

@Entity('attendance_regularisation_details')
export class AttendanceRegularisationDetailEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  request_id: string;

  @Column({ type: 'text' })
  reason: string;

  // relations

  @OneToOne(
    () => AttendanceRequestEntity,
    (request) => request.regularisationDetail,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'request_id', referencedColumnName: 'request_id' })
  request: AttendanceRequestEntity;
}
