// src/database/entities/company-leave-plans.entity.ts

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { CompanyEntity } from './company.entity';
import { LeavePlanCalendarType } from 'src/common/enum';
import { LeavePlanApplicabilityEntity } from './leave-plan-applicability.entity';
import { LeavePlanLeaveTypeEntity } from './leave-plan-leave-types.entity';
import { LeavePlanEligibilityRuleEntity } from './leave-eligibility-rule.entity';

@Entity('company_leave_plans')
export class CompanyLeavePlanEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  company_leave_plan_id: number;

  @Column({ type: 'varchar', length: 150, nullable: false })
  plan_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description?: string | null;

  @Column({
    type: 'varchar',
    length: 30,
    default: LeavePlanCalendarType.CALENDAR_YEAR,
  })
  calendar_type: LeavePlanCalendarType;

  @Column({
    type: 'int',
    nullable: true,
  })
  financial_year_start_month?: number;

  @Column({ type: 'boolean', default: false })
  is_specific_applicability: boolean;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'boolean', default: false })
  isDefault?: boolean;

  // ================= RELATIONS =================

  @ManyToOne(() => CompanyEntity, (c) => c.leavePlans, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @OneToMany(() => LeavePlanApplicabilityEntity, (r) => r.plan)
  applicabilityRules: LeavePlanApplicabilityEntity[];

  @OneToMany(() => LeavePlanLeaveTypeEntity, (r) => r.plan)
  leaveTypes: LeavePlanLeaveTypeEntity[];

  @OneToMany(() => LeavePlanEligibilityRuleEntity, (r) => r.leavePlan)
  eligibilityRules: LeavePlanEligibilityRuleEntity[];
}
