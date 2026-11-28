// src/database/entities/performance-promotion-application.entity.ts

import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { PerformancePromotionDecisionEntity } from './performance-promotion-decision.entity';
import { PromotionApplicationStatus } from 'src/common/enum';

/**
 * What happened when an approved promotion fell due.
 *
 * Decisions are append-only, so the outcome lives here. One row per decision:
 * the unique key is what stops a retry or an overlapping run promoting twice.
 * APPLIED and SKIPPED are final; FAILED is retried on the next run.
 */
@Entity('performance_promotion_applications')
@Index('uq_promotion_applications_decision', ['decision_id'], { unique: true })
@Index('idx_promotion_applications_employee', ['employee_user_id'])
export class PerformancePromotionApplicationEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  performance_promotion_applications_id: string;

  @Column({ type: 'uuid' })
  decision_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  employee_user_id: string;

  @Column({ type: 'int', nullable: true })
  from_designation_id?: number | null;

  @Column({ type: 'int' })
  to_designation_id: number;

  @Column({ type: 'varchar', length: 20 })
  status: PromotionApplicationStatus;

  /** Why it was skipped or failed. */
  @Column({ type: 'text', nullable: true })
  reason?: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  applied_at?: Date | null;

  @ManyToOne(() => PerformancePromotionDecisionEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'decision_id' })
  decision?: PerformancePromotionDecisionEntity;
}
