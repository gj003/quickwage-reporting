import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { ExitResignationTerminationApprovalLevelEntity } from './exit-resignation-termination-approval-level.entity';
import { CompanyEntity } from './company.entity';

@Entity('exit_resignation_termination_settings')
export class ExitResignationTerminationSettingEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  exit_setting_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'boolean', default: true })
  allow_employee_to_resign: boolean;

  @Column({ type: 'boolean', default: true })
  allow_employee_to_withdraw_resignation: boolean;

  // Shows early LWD selection date picker in resignation form.
  @Column({ type: 'boolean', default: false })
  allow_early_lwd_preference: boolean;

  @Column({ type: 'boolean', default: true })
  show_resignation_status_with_reviewer_names: boolean;

  @Column({ type: 'jsonb', default: () => "'[]'" })
  resignation_reasons: string[];

  @Column({ type: 'boolean', default: true })
  resignation_review_required: boolean;

  // termination settings

  @Column({ type: 'jsonb', default: () => "'[]'" })
  termination_reasons: string[];

  @Column({ type: 'boolean', default: true })
  termination_approval_required: boolean;

  @Column({ type: 'boolean', default: true })
  resignation_date_as_notice_period_start: boolean;

  @Column({ type: 'boolean', default: true })
  prevent_lwd_on_holiday_or_weekly_off: boolean;

  // exit form survey settings

  @Column({ type: 'integer', default: 0 })
  exit_survey_form_enabled_days_before: number;

  @OneToMany(
    () => ExitResignationTerminationApprovalLevelEntity,
    (level) => level.exit_resignation_termination_setting,
    { cascade: true },
  )
  approval_levels: ExitResignationTerminationApprovalLevelEntity[];

  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;
}
