// src/database/entities/compensation-review-cycle.entity.ts

import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';
import { PerformanceRatingCode } from 'src/common/enum';

@Entity({ name: 'compensation_review_cycles' })
export class CompensationReviewCycleEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'compensation_review_cycle_id' })
  compensation_review_cycle_id: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 40, name: 'cycle_status' })
  cycle_status: string;

  /** Null only on reviews created before company scoping; those are unreachable. */
  @Column({ type: 'uuid', name: 'company_id', nullable: true })
  company_id?: string | null;

  /** The performance cycle whose released ratings this review was generated from. */
  @Column({ type: 'uuid', name: 'performance_cycle_id', nullable: true })
  performance_cycle_id?: string | null;

  /** Rating → % raise the lines were worked out with, kept as it was used. */
  @Column({ type: 'jsonb', name: 'increment_matrix', nullable: true })
  increment_matrix?: Record<PerformanceRatingCode, number> | null;

  @Column({ type: 'uuid', name: 'created_by', nullable: true })
  created_by?: string | null;

  @BeforeInsert()
  assignCode(): void {
    if (!this.code) {
      this.code = generatePrefixedCode('CMPREV');
    }
  }
}
