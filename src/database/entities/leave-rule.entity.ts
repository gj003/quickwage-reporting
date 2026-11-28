// src/database/entities/leave-rule.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { CompanyLeaveTypeEntity } from './company-leave-type.entity';

@Entity('leave_rules')
export class LeaveRuleEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  rule_id: number;

  /** ─────── Eligibility Rules ─────── */
  @Column({ type: 'int', default: 0 })
  minimum_service_period_months: number;

  @Column({ type: 'int', nullable: true })
  maximum_consecutive_days?: number;

  @Column({ type: 'int', nullable: true })
  minimum_days_per_request?: number;

  @Column({ type: 'int', nullable: true })
  maximum_days_per_request?: number;

  /** ─────── Application Rules ─────── */
  @Column({ type: 'int', default: 0 })
  advance_notice_period_days: number;

  @Column({ type: 'boolean', default: false })
  require_medical_certificate: boolean;

  @Column({ type: 'boolean', default: false })
  can_be_applied_retrospectively: boolean;

  @Column({ type: 'boolean', default: true })
  allow_half_day_leave: boolean;

  @Column({ type: 'boolean', default: true })
  allow_during_probation: boolean;

  /** ─────── Relations ─────── */
  @Column({ type: 'int' })
  leave_type_id: number;

  @OneToOne(() => CompanyLeaveTypeEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'leave_type_id' })
  leaveType: CompanyLeaveTypeEntity;
}
