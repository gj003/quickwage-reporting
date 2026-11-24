import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { CoreValueEntity } from './core-value.entity';
import { FeedbackRequestReviewerEntity } from './feedback-request-reviewer.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity({ name: 'feedback_requests' })
@Index('idx_feedback_request_company_subject', [
  'companyId',
  'subjectEmployeeId',
])
export class FeedbackRequestEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'feedback_request_id' })
  feedbackRequestId: string;

  @Column({ type: 'varchar', name: 'feedback_request_code', unique: true })
  feedbackRequestCode: string;

  @Column({ type: 'uuid', name: 'company_id' })
  companyId: string;

  @Column({ type: 'uuid', name: 'requested_by_employee_id' })
  requestedByEmployeeId: string;

  @Column({ type: 'uuid', name: 'subject_employee_id' })
  subjectEmployeeId: string;

  @Column({ type: 'uuid', name: 'core_value_id', nullable: true })
  coreValueId?: string | null;

  @ManyToOne(() => CoreValueEntity, { nullable: true })
  @JoinColumn({ name: 'core_value_id' })
  coreValue?: CoreValueEntity | null;

  @Column({ type: 'text', nullable: true })
  note?: string | null;

  @Column({ type: 'jsonb', name: 'project_ids', nullable: true })
  projectIds?: string[] | null;

  @Column({ type: 'varchar', length: 30, default: 'open' })
  status: string;

  @OneToMany(
    () => FeedbackRequestReviewerEntity,
    (reviewer) => reviewer.feedbackRequest,
    { cascade: ['insert'] },
  )
  reviewers?: FeedbackRequestReviewerEntity[];

  @BeforeInsert()
  assignFeedbackRequestCode(): void {
    if (!this.feedbackRequestCode) {
      this.feedbackRequestCode = generatePrefixedCode('FBRQ');
    }
  }
}
