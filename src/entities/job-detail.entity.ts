// src/database/entities/job-detail.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { DepartmentEntity } from './department.entity';
import { DesignationEntity } from './designation.entity';
import { UserEntity } from './user.entity';
import { JobDetailEmpTimeType, JobDetailEmpType } from 'src/common/enum';
import { BusinessUnitEntity } from './business-unit.entity';
import { LegalEntity } from './legal_entity.entity';
import { HRMS_AddressEntity } from './hrms-address.entity';

@Entity('job_details')
export class JobDetailEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'uuid', nullable: true })
  reporting_manager_user_id: string;

  @Column({ type: 'uuid', nullable: true })
  legal_entity_id: string;

  @Column({ type: 'int', nullable: true })
  business_unit_id: number;

  @Column({ type: 'int', nullable: true })
  department_id: number;

  @Column({ type: 'int', nullable: true })
  designation_id: number | null;

  @Column({ type: 'date', default: () => 'CURRENT_DATE', nullable: true })
  date_of_joining: string;

  /**
   * When the employee started their current role/designation.
   *
   * Added for internal-job-posting eligibility, which has to measure
   * time-in-current-role. No designation-change history table exists in this
   * codebase, so there was nowhere to derive this from. It is nullable and
   * callers fall back to date_of_joining when unset - correct for anyone who
   * has never changed role, and a place to record the date when they do.
   */
  @Column({ type: 'date', nullable: true })
  current_role_start_date?: string | null;

  @Column({ type: 'varchar', nullable: true })
  employment_type: JobDetailEmpType;

  @Column({ type: 'int', nullable: true })
  work_location_id: number;

  @Column({ type: 'varchar', nullable: true })
  work_country: string;

  @Column({ type: 'varchar', nullable: true })
  secondary_job_title: string;

  @Column({ type: 'varchar', nullable: true })
  employment_time_type: JobDetailEmpTimeType;

  @Column({ type: 'varchar', nullable: true })
  contract_status?: string | null;

  @Column({ type: 'varchar', nullable: true })
  pay_band?: string | null;

  @Column({ type: 'varchar', nullable: true })
  cost_center?: string | null;

  // relations

  @OneToOne(() => UserEntity, (rel) => rel.jobDetail, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => BusinessUnitEntity, (rel) => rel.jobDetails, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'business_unit_id' })
  business_unit: BusinessUnitEntity;

  @ManyToOne(() => LegalEntity, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'legal_entity_id' })
  legal_entity: LegalEntity;

  @ManyToOne(() => DepartmentEntity, (rel) => rel.jobDetails, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'department_id' })
  department: DepartmentEntity;

  @ManyToOne(() => DesignationEntity, (rel) => rel.jobDetails, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'designation_id' })
  designation: DesignationEntity;

  // 🔗 Reporting Manager (another User)
  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'reporting_manager_user_id' })
  reportingManager: UserEntity;

  @ManyToOne(() => HRMS_AddressEntity, (rel) => rel.id)
  @JoinColumn({ name: 'work_location_id' })
  work_location: HRMS_AddressEntity;
}
