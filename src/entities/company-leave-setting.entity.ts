import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { CompanyEntity } from './company.entity';

@Entity('company_leave_settings')
export class CompanyLeaveSettingEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  company_leave_setting_id: number;

  @Column({ type: 'uuid', unique: true })
  company_id: string;

  @Column({ type: 'boolean', default: false })
  auto_approve_weekend_sandwiches: boolean;

  @Column({ type: 'boolean', default: false })
  require_manager_approval_for_all_leaves: boolean;

  @Column({ type: 'boolean', default: false })
  allow_negative_leave_balance: boolean;

  @Column({ type: 'boolean', default: false })
  enable_leave_encashment: boolean;

  @Column({ type: 'boolean', default: false })
  email_notifications_for_approvals: boolean;

  @Column({ type: 'boolean', default: false })
  sms_reminders_for_leave_expiry: boolean;

  @Column({ type: 'boolean', default: false })
  slack_integration: boolean;

  @Column({ type: 'boolean', default: false })
  mobile_push_notifications: boolean;

  @ManyToOne(() => CompanyEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;
}
