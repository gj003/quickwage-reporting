// src/database/entities/company-leave-type.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { CompanyEntity } from './company.entity';
import { LeaveTypeCategory } from 'src/common/enum';

@Entity('company_leave_types')
export class CompanyLeaveTypeEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  leave_type_id: number;

  @Column({ type: 'varchar', length: 150, nullable: true })
  leave_type_name: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  leave_code: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  description: string;

  @Column({
    type: 'varchar',
    length: 30,
    default: LeaveTypeCategory.REGULAR,
  })
  category: LeaveTypeCategory;

  @Column({ type: 'boolean', default: false })
  is_sick_medical: boolean;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'uuid' })
  company_id: string;

  // ================= RELATIONS =================

  @ManyToOne(() => CompanyEntity, (c) => c.leaveTypes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;
}
