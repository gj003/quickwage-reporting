import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';

@Entity({ name: 'feedback_settings' })
export class FeedbackSettingEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'feedback_setting_id' })
  feedbackSettingId: string;

  @Column({ type: 'uuid', name: 'company_id', unique: true })
  companyId: string;

  @Column({
    type: 'boolean',
    name: 'enable_personal_feedback',
    default: true,
  })
  enablePersonalFeedback: boolean;

  /** 'everyone' | 'managers' | 'managers_and_peers' */
  @Column({
    type: 'varchar',
    length: 30,
    name: 'who_can_give_feedback',
    default: 'everyone',
  })
  whoCanGiveFeedback: string;

  @Column({
    type: 'boolean',
    name: 'request_feedback_by_employees',
    default: true,
  })
  requestFeedbackByEmployees: boolean;

  @Column({
    type: 'boolean',
    name: 'request_feedback_by_managers',
    default: true,
  })
  requestFeedbackByManagers: boolean;

  /** 'everyone' | 'managers_only' */
  @Column({
    type: 'varchar',
    length: 30,
    name: 'internal_notes_access',
    default: 'managers_only',
  })
  internalNotesAccess: string;
}
