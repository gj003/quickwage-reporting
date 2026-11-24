// src/database/entities/employee-bulk-imports.entity.ts

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { EmployeeBulkImportStatus } from 'src/common/enum';
import { CompanyEntity } from './company.entity';
import { EmployeeBulkImportRowEntity } from './employee-bulk-import-rows.entity';

@Entity('employee_bulk_imports')
export class EmployeeBulkImportEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column('varchar')
  file_name: string;

  @Column({ type: 'int' })
  total_records: number;

  @Column({ type: 'int', default: 0 })
  success_count: number;

  @Column({ type: 'int', default: 0 })
  failed_count: number;

  @Column({
    type: 'varchar',
    default: EmployeeBulkImportStatus.PENDING,
  })
  status: EmployeeBulkImportStatus;

  @ManyToOne(() => CompanyEntity, (rel) => rel.users, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @OneToMany(() => EmployeeBulkImportRowEntity, (rel) => rel.bulkimport, {
    cascade: true,
    nullable: true,
  })
  rows: EmployeeBulkImportRowEntity[];
}
