// src/database/entities/user-payroll.entity.ts

import {
  Entity,
  Column,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { SharedEntity } from './shared.entity';
import { PayGradeEntity } from './paygrade.entity';
import { CompanyEntity } from './company.entity';

@Entity('user_payroll')
export class UserPayrollEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', nullable: false })
  user_id: string;

  @Column({ type: 'uuid', nullable: true })
  company_id: string;

  @Column({ type: 'numeric', nullable: false })
  annual_salary: number;

  @Column({ type: 'numeric', nullable: true })
  monthly_salary: number;

  @Column({ type: 'uuid', nullable: true })
  paygrade_id: string;

  @Column({ type: 'uuid', nullable: true })
  payroll_pay_group_id?: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  salary_structure_type?: string | null;

  @Column({ type: 'uuid', nullable: true })
  payroll_salary_structure_id?: string | null;

  @Column({ type: 'varchar', length: 30, nullable: true, default: 'Annual' })
  remuneration_type?: string | null;

  @Column({ type: 'varchar', length: 30, nullable: true, default: 'Monthly' })
  pay_cycle?: string | null;

  @Column({ type: 'date', nullable: true })
  effective_from?: string | null;

  @Column({ type: 'boolean', default: false })
  pf_eligible: boolean;

  @Column({ type: 'boolean', default: false })
  eps_member: boolean;

  @Column({ type: 'boolean', default: false })
  abry_eligible: boolean;

  @Column({ type: 'varchar', length: 100, nullable: true })
  pf_establishment_id?: string | null;

  @Column({ type: 'boolean', default: false })
  pf_details_available: boolean;

  @Column({ type: 'varchar', length: 100, nullable: true })
  pf_number?: string | null;

  @Column({ type: 'date', nullable: true })
  pf_joining_date?: string | null;

  @Column({ type: 'varchar', length: 200, nullable: true })
  name_on_pf_account?: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  uan?: string | null;

  @Column({ type: 'boolean', default: false })
  esi_eligible: boolean;

  @Column({ type: 'varchar', length: 100, nullable: true })
  employer_esi_number?: string | null;

  @Column({ type: 'boolean', default: false })
  esi_details_available: boolean;

  @Column({ type: 'varchar', length: 100, nullable: true })
  esi_number?: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  pt_establishment_id?: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  pt_state?: string | null;

  @Column({ type: 'varchar', length: 200, nullable: true })
  pt_registered_location?: string | null;

  @Column({ type: 'boolean', default: false })
  lwf_eligible: boolean;

  @Column({ type: 'boolean', default: true })
  is_payroll_enabled: boolean;

  @Column({ type: 'boolean', default: false })
  dews_covered: boolean;

  @Column({ type: 'boolean', default: false })
  dews_opted_in: boolean;

  @Column({ type: 'text', nullable: true })
  note?: string | null;

  // relations

  @OneToOne(() => UserEntity, (rel) => rel.user_id)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => CompanyEntity, (rel) => rel.id)
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @ManyToOne(() => PayGradeEntity, (rel) => rel.id)
  @JoinColumn({ name: 'paygrade_id' })
  paygrade: PayGradeEntity;
}
