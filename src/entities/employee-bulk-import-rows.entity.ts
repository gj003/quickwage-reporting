// src/database/entities/employee-bulk-import-rows.entity.ts

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { EmployeeBulkImportEntity } from './employee-bulk-imports.entity';

@Entity('employee_bulk_import_rows')
export class EmployeeBulkImportRowEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  import_id: number;

  @Column({ type: 'json' })
  payload: Record<string, any>;

  @Column({
    type: 'varchar',
    default: 'PENDING',
    comment: 'PENDING | SUCCESS | FAILED',
  })
  status: string;

  @Column({ type: 'text', nullable: true })
  error_message?: string;

  @ManyToOne(() => EmployeeBulkImportEntity, (rel) => rel.rows, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'import_id' }) // 👈 IMPORTANT
  bulkimport: EmployeeBulkImportEntity;
}
