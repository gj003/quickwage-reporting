// src/database/entities/compensation-item.entity.ts

import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';
import { CompensationReviewCycleEntity } from './compensation-review-cycle.entity';
import { PerformanceRatingCode } from 'src/common/enum';

@Entity({ name: 'compensation_items' })
@Index('idx_compensation_item_cycle', ['compensation_review_cycle_id'])
export class CompensationItemEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'compensation_item_id' })
  compensation_item_id: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  code: string;

  @Column({ type: 'uuid', name: 'compensation_review_cycle_id' })
  compensation_review_cycle_id: string;

  @Column({ type: 'varchar', length: 64, name: 'employee_id' })
  employee_id: string;

  @Column({ type: 'varchar', length: 150, name: 'employee_name' })
  employee_name: string;

  @Column({
    type: 'numeric',
    precision: 12,
    scale: 2,
    name: 'current_ctc',
  })
  current_ctc: string;

  @Column({
    type: 'numeric',
    precision: 2,
    scale: 1,
    name: 'performance_score',
  })
  performance_score: string;

  @Column({ type: 'int', name: 'skills_improved', default: 0 })
  skills_improved: number;

  @Column({ type: 'varchar', length: 50, name: 'bonus_eligibility' })
  bonus_eligibility: string;

  @Column({ type: 'int', name: 'time_in_band_months', default: 0 })
  time_in_band_months: number;

  @Column({
    type: 'numeric',
    precision: 5,
    scale: 2,
    name: 'recommended_hike_pct',
  })
  recommended_hike_pct: string;

  @Column({
    type: 'numeric',
    precision: 12,
    scale: 2,
    name: 'recommended_new_ctc',
  })
  recommended_new_ctc: string;

  @Column({ type: 'boolean', name: 'manager_override_enabled', default: false })
  manager_override_enabled: boolean;

  @Column({
    type: 'numeric',
    precision: 5,
    scale: 2,
    name: 'override_pct',
    nullable: true,
  })
  override_pct?: string | null;

  @Column({ type: 'text', name: 'override_justification', nullable: true })
  override_justification?: string | null;

  @Column({
    type: 'numeric',
    precision: 5,
    scale: 2,
    name: 'final_hike_pct',
  })
  final_hike_pct: string;

  @Column({
    type: 'numeric',
    precision: 12,
    scale: 2,
    name: 'final_new_ctc',
  })
  final_new_ctc: string;

  @Column({ type: 'varchar', length: 40 })
  status: string;

  // ─── Generated from a released rating ─────────────────────────────────────

  @Column({ type: 'uuid', name: 'final_rating_id', nullable: true })
  final_rating_id?: string | null;

  /** The rating the raise was worked out from, to notice it changing later. */
  @Column({ type: 'varchar', length: 20, name: 'rating_code', nullable: true })
  rating_code?: PerformanceRatingCode | null;

  @Column({
    type: 'varchar',
    length: 30,
    name: 'remuneration_type',
    nullable: true,
  })
  remuneration_type?: string | null;

  // ─── Pushed to payroll ────────────────────────────────────────────────────

  /** The salary revision payroll created. Set once; a line is never pushed twice. */
  @Column({ type: 'uuid', name: 'payroll_revision_id', nullable: true })
  payroll_revision_id?: string | null;

  @Column({ type: 'timestamptz', name: 'pushed_at', nullable: true })
  pushed_at?: Date | null;

  @Column({ type: 'uuid', name: 'pushed_by', nullable: true })
  pushed_by?: string | null;

  @Column({
    type: 'varchar',
    length: 7,
    name: 'pushed_pay_cycle',
    nullable: true,
  })
  pushed_pay_cycle?: string | null;

  @ManyToOne(() => CompensationReviewCycleEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'compensation_review_cycle_id',
    referencedColumnName: 'compensation_review_cycle_id',
  })
  reviewCycle?: CompensationReviewCycleEntity;

  @BeforeInsert()
  assignCode(): void {
    if (!this.code) {
      this.code = generatePrefixedCode('CMPITEM');
    }
  }
}
