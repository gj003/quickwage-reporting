import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { FeedbackAttachmentEntity } from './feedback-attachment.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity({ name: 'feedback' })
@Index('idx_feedback_company_status', ['companyId', 'status'])
@Index('idx_feedback_company_receiver', ['companyId', 'receiverEmployeeId'])
export class FeedbackEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'feedback_id' })
  feedbackId: string;

  @Column({
    type: 'varchar',
    name: 'feedback_code',
    unique: true,
  })
  feedbackCode: string;

  @Column({ type: 'uuid', name: 'company_id' })
  companyId: string;

  @Column({ type: 'uuid', name: 'giver_employee_id' })
  giverEmployeeId: string;

  @Column({ type: 'uuid', name: 'receiver_employee_id' })
  receiverEmployeeId: string;

  @Column({ type: 'uuid', name: 'goals_id', nullable: true })
  goalId?: string | null;

  @Column({ type: 'varchar', length: 30 })
  type: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'int', nullable: true })
  rating?: number | null;

  @Column({ type: 'jsonb', default: () => "'[]'" })
  tags: string[];

  @Column({ type: 'varchar', length: 30, default: 'published' })
  status: string;

  @Column({ type: 'varchar', length: 30, default: 'public' })
  visibility: string;

  @Column({ type: 'jsonb', name: 'project_ids', nullable: true })
  projectIds?: string[] | null;

  @OneToMany(
    () => FeedbackAttachmentEntity,
    (attachment) => attachment.feedback,
    { cascade: ['insert'] },
  )
  attachments?: FeedbackAttachmentEntity[];

  @BeforeInsert()
  assignBadgeCode(): void {
    if (!this.feedbackCode) {
      this.feedbackCode = generatePrefixedCode('FDBK');
    }
  }
}
