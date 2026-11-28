// src/database/entities/performance-development-assignment.entity.ts

import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';
import {
  DevelopmentAssignmentStatus,
  DevelopmentAssignmentType,
} from 'src/common/enum';

/**
 * Training, coaching or a certification set for one employee.
 *
 * Carries its reason and, optionally, the evidence behind it — a skill (with
 * the gap copied as it was when assigned), a released rating, or a PIP. The
 * employee starts and completes it; the manager confirms or sends it back.
 * Cancelled rows are kept with their reason.
 */
@Entity('performance_development_assignments')
@Index('idx_development_assignments_company_status', ['company_id', 'status'])
@Index('idx_development_assignments_employee', ['employee_user_id'])
@Index('idx_development_assignments_coach', ['coach_user_id'])
export class PerformanceDevelopmentAssignmentEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  performance_development_assignments_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  employee_user_id: string;

  @Column({ type: 'uuid' })
  assigned_by: string;

  /** The manager responsible when it was set; they can confirm it. */
  @Column({ type: 'uuid', nullable: true })
  manager_user_id?: string | null;

  @Column({ type: 'varchar', length: 20 })
  type: DevelopmentAssignmentType;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  /** What it should achieve. */
  @Column({ type: 'text' })
  objective: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  provider?: string | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  link?: string | null;

  /** Coaching only: the colleague who coaches. */
  @Column({ type: 'uuid', nullable: true })
  coach_user_id?: string | null;

  @Column({ type: 'date' })
  due_date: string;

  @Column({ type: 'text' })
  reason: string;

  // ─── The evidence behind it ───────────────────────────────────────────────

  @Column({ type: 'uuid', nullable: true })
  skill_id?: string | null;

  @Column({ type: 'int', nullable: true })
  skill_expected_level?: number | null;

  @Column({ type: 'int', nullable: true })
  skill_rated_level?: number | null;

  @Column({ type: 'int', nullable: true })
  skill_gap?: number | null;

  @Column({ type: 'uuid', nullable: true })
  cycle_id?: string | null;

  @Column({ type: 'uuid', nullable: true })
  final_rating_id?: string | null;

  @Column({ type: 'uuid', nullable: true })
  pip_id?: string | null;

  // ─── Progress ─────────────────────────────────────────────────────────────

  @Column({
    type: 'varchar',
    length: 20,
    default: DevelopmentAssignmentStatus.ASSIGNED,
  })
  status: DevelopmentAssignmentStatus;

  @Column({ type: 'timestamptz', nullable: true })
  started_at?: Date | null;

  @Column({ type: 'date', nullable: true })
  completed_on?: string | null;

  @Column({ type: 'text', nullable: true })
  completion_note?: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  completed_at?: Date | null;

  @Column({ type: 'uuid', nullable: true })
  confirmed_by?: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  confirmed_at?: Date | null;

  /** The manager's latest reason for sending a completion back. */
  @Column({ type: 'text', nullable: true })
  send_back_comment?: string | null;

  @Column({ type: 'int', default: 0 })
  sent_back_count: number;

  @Column({ type: 'uuid', nullable: true })
  cancelled_by?: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  cancelled_at?: Date | null;

  @Column({ type: 'text', nullable: true })
  cancel_reason?: string | null;

  @Column({ type: 'int', default: 1 })
  version: number;
}
