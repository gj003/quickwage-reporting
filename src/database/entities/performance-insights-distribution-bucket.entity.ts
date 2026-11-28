// src/database/entities/performance-insights-distribution-bucket.entity.ts

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
import { PerformanceCycleEntity } from './performance-cycle.entity';

@Entity({ name: 'performance_insights_distribution_buckets' })
@Index('idx_distribution_bucket_cycle', ['performance_cycle_id'])
export class PerformanceInsightsDistributionBucketEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'distribution_bucket_id' })
  distribution_bucket_id: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  code: string;

  @Column({ type: 'uuid', name: 'performance_cycle_id' })
  performance_cycle_id: string;

  @Column({ type: 'varchar', length: 120 })
  label: string;

  @Column({ type: 'numeric', precision: 2, scale: 1 })
  min: string;

  @Column({ type: 'numeric', precision: 2, scale: 1 })
  max: string;

  @Column({ type: 'int' })
  count: number;

  @Column({ type: 'varchar', length: 120, nullable: true })
  business_unit?: string | null;

  @Column({ type: 'varchar', length: 120, nullable: true })
  location?: string | null;

  @ManyToOne(() => PerformanceCycleEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'performance_cycle_id',
    referencedColumnName: 'performance_cycle_id',
  })
  performanceCycle?: PerformanceCycleEntity;

  @BeforeInsert()
  assignCode(): void {
    if (!this.code) {
      this.code = generatePrefixedCode('DIST');
    }
  }
}
