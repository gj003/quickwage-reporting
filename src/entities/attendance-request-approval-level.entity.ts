// src/database/entities/attendance-request-approval-level.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { AttendanceRequestEntity } from './attendance-request.entity';
import { UserEntity } from './user.entity';
import { AttendanceApprovalLevelStatus } from 'src/common/enum';

@Entity('attendance_request_approval_levels')
export class AttendanceRequestApprovalLevelEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  request_id: string;

  @Column({ type: 'int' })
  level: number;

  @Column({ type: 'jsonb' })
  approver_ids: string[];

  @Column({ type: 'varchar', default: AttendanceApprovalLevelStatus.PENDING })
  status: AttendanceApprovalLevelStatus;

  @Column({ type: 'uuid', nullable: true })
  acted_by: string | null;

  @Column({ type: 'text', nullable: true })
  remark: string | null;

  @Column({ type: 'timestamp', nullable: true })
  acted_at: Date | null;

  // relations

  @ManyToOne(() => AttendanceRequestEntity, (r) => r.approvalLevels, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'request_id', referencedColumnName: 'request_id' })
  request: AttendanceRequestEntity;

  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'acted_by', referencedColumnName: 'user_id' })
  actor: UserEntity | null;
}
