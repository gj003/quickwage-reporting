import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { CompanyEntity } from './company.entity';
import { ProbationDurationUnit } from 'src/common/enum';

@Entity('onboarding_probation_policy')
export class OnboardingProbationPolicyEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  onboarding_probation_policy_id: string;

  @Column({ type: 'varchar', length: 255 })
  policy_name: string;

  @Column({ type: 'text', nullable: true })
  policy_description: string;

  @Column({ type: 'int' })
  probation_period_duration: number;

  @Column({ type: 'varchar', length: 20, default: ProbationDurationUnit.DAYS })
  probation_period_duration_unit: ProbationDurationUnit;

  @Column({ type: 'int' })
  max_probation_duration_including_extensions: number;

  @Column({ type: 'varchar', length: 20, default: ProbationDurationUnit.DAYS })
  max_probation_duration_including_extensions_unit: ProbationDurationUnit;

  @Column({ type: 'int', default: 0 })
  max_extension_count: number;

  @Column({ type: 'boolean', default: false })
  probation_end_date_day_after_completion: boolean;

  @Column({ type: 'boolean', default: false })
  exclude_weekly_offs_from_probation_duration: boolean;

  @Column({ type: 'boolean', default: false })
  exclude_holidays_from_probation_duration: boolean;

  @Column({ type: 'uuid' })
  company_id: string;

  @ManyToOne(() => CompanyEntity, (company) => company.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;
}
