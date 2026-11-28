// src/database/entities/employee-id-series.entity.ts

import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { CompanyEntity } from './company.entity';

/**
 * Stores employee ID auto-generation configuration per company.
 */
@Entity('employee_id_series')
export class EmployeeIdSeriesEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Associated company ID
   */
  @Column({ type: 'uuid', nullable: false })
  company_id: string;

  /**
   * Enable or disable auto-generation
   */
  @Column({ type: 'boolean', default: false })
  auto_generate: boolean;

  /**
   * Prefix for generated employee IDs (e.g. QW)
   */
  @Column({ type: 'varchar', length: 10, nullable: true })
  prefix: string;

  /**
   * Starting number of the sequence
   */
  @Column({ type: 'int', nullable: true })
  starting_number: number;

  /**
   * Total digits for numeric part
   */
  @Column({ type: 'int', nullable: true })
  digit_count: number;

  /**
   * Last generated number (used internally)
   */
  @Column({ type: 'int', nullable: true })
  last_generated_number: number;

  /**
   * Company relationship
   */
  @OneToOne(() => CompanyEntity, (rel) => rel.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;
}
