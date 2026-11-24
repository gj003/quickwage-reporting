// src/database/entities/department.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { CompanyEntity } from './company.entity';
import { DesignationEntity } from './designation.entity';
import { JobDetailEntity } from './job-detail.entity';
import { CostCenterEntity } from './cost-center.entity';
import { UserEntity } from './user.entity';
import { BusinessUnitEntity } from './business-unit.entity';
import { HRMS_AddressEntity } from './hrms-address.entity';

@Entity('departments')
export class DepartmentEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({
    type: 'boolean',
    default: true,
    comment: 'True => ACTIVE, False => INACTIVE',
  })
  status: boolean;

  @Column({ type: 'int' })
  business_unit_id: number;

  @Column({
    type: 'boolean',
    default: false,
    comment: 'True => remote department, False => based on address',
  })
  is_remote: boolean;

  @Column({ type: 'int', nullable: true })
  cost_center_id?: number;

  @Column({ type: 'int', nullable: true })
  address_id?: number; // FK to AddressEntity when not remote

  @Column('varchar', { array: true, nullable: true })
  tags?: string[];

  @Column({ type: 'uuid', nullable: true })
  department_head_id?: string;

  // 🔹 Relations
  @ManyToOne(() => CompanyEntity, (rel) => rel.departments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @ManyToOne(() => CostCenterEntity, (rel) => rel.departments, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'cost_center_id' })
  costCenter?: CostCenterEntity;

  @ManyToOne(() => HRMS_AddressEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'address_id' })
  address?: HRMS_AddressEntity;

  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'department_head_id' })
  departmentHead?: UserEntity;

  @OneToMany(() => DesignationEntity, (rel) => rel.department)
  designations: DesignationEntity[];

  @OneToMany(() => JobDetailEntity, (rel) => rel.department)
  jobDetails: JobDetailEntity[];

  @ManyToOne(() => BusinessUnitEntity, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'business_unit_id' })
  businessUnit: BusinessUnitEntity;
}
