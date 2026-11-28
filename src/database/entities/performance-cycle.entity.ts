// src/database/entities/performance-cycle.entity.ts

import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity({ name: 'performance_cycles' })
export class PerformanceCycleEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'performance_cycle_id' })
  performance_cycle_id: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'date', name: 'start_date' })
  start_date: Date;

  @Column({ type: 'date', name: 'end_date' })
  end_date: Date;

  @Column({ type: 'varchar', length: 40 })
  status: string;

  @BeforeInsert()
  assignCode(): void {
    if (!this.code) {
      this.code = generatePrefixedCode('PCYCLE');
    }
  }
}
