// src/database/entities/paygrade.entity.ts

// src/database/entities/paygrade.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { DepartmentEntity } from './department.entity';
import { CompanyEntity } from './company.entity';
import { PayGradeAuditLogEntity } from './paygrade-audit-log.entity';

@Entity('paygrades')
export class PayGradeEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  tier: string;

  @Column({ type: 'numeric', nullable: false })
  min_ctc: number;

  @Column({ type: 'numeric', nullable: false })
  max_ctc: number;

  @Column({ type: 'numeric', nullable: false })
  department_id: number;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'date', nullable: false })
  effective_from_date: Date;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'uuid', name: 'created_by', nullable: true })
  createdBy?: string;

  // relations

  @ManyToOne(() => DepartmentEntity, (rel) => rel.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'department_id' })
  department: DepartmentEntity;

  @ManyToOne(() => CompanyEntity, (rel) => rel.paygrades, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @OneToMany(() => PayGradeAuditLogEntity, (auditLog) => auditLog.paygrade)
  auditLogs: PayGradeAuditLogEntity[];
}
