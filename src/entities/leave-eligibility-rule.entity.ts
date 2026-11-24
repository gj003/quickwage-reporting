// src/database/entities/leave-eligibility-rule.entity.ts

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import {
  AllowedPlanApplicabilityCriteriaType,
  PlanApplicabilityCriteriaType,
} from 'src/common/enum';
import { CompanyLeavePlanEntity } from './company-leave-plans.entity';

@Entity('leave_plan_eligibility_rules')
export class LeavePlanEligibilityRuleEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  leave_plan_eligibility_rule_id: number;

  @Column({ type: 'int', nullable: true })
  company_leave_plan_id: number;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  criteria_type: AllowedPlanApplicabilityCriteriaType;

  @Column({ type: 'varchar', length: 255, nullable: true })
  criteria_value_id: number | string;

  // ================= RELATION =================

  @ManyToOne(() => CompanyLeavePlanEntity, (plan) => plan.eligibilityRules, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_leave_plan_id' })
  leavePlan: CompanyLeavePlanEntity;
}
