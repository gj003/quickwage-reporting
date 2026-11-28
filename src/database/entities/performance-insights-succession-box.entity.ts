// src/database/entities/performance-insights-succession-box.entity.ts

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

@Entity({ name: 'performance_insights_succession_boxes' })
@Index('idx_succession_box_cycle', ['performance_cycle_id'])
export class PerformanceInsightsSuccessionBoxEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'succession_box_id' })
  succession_box_id: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  code: string;

  @Column({ type: 'uuid', name: 'performance_cycle_id' })
  performance_cycle_id: string;

  @Column({ type: 'varchar', length: 60, name: 'box_key' })
  box_key: string;

  @Column({ type: 'int', name: 'employees_count', default: 0 })
  employees_count: number;

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
      this.code = generatePrefixedCode('SUCBOX');
    }
  }
}
