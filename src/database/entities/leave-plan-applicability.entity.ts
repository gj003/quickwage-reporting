// src/database/entities/leave-plan-applicability.entity.ts

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { CompanyLeavePlanEntity } from './company-leave-plans.entity';
import { PlanApplicabilityCriteriaType } from 'src/common/enum';

@Entity('leave_plan_applicability')
export class LeavePlanApplicabilityEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  leave_plan_applicability_id: number;

  @Column({ type: 'int', nullable: true })
  company_leave_plan_id: number;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  criteria_type: PlanApplicabilityCriteriaType;

  @Column({ type: 'varchar', length: 255, nullable: true })
  criteria_value_id: number | string;

  @ManyToOne(() => CompanyLeavePlanEntity, (p) => p.applicabilityRules, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_leave_plan_id' })
  plan: CompanyLeavePlanEntity;
}
