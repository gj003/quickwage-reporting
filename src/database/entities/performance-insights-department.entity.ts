// src/database/entities/performance-insights-department.entity.ts

import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity({ name: 'performance_insights_departments' })
export class PerformanceInsightsDepartmentEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'department_id' })
  department_id: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @BeforeInsert()
  assignCode(): void {
    if (!this.code) {
      this.code = generatePrefixedCode('DEPT');
    }
  }
}
