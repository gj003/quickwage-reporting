import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { FeedbackRequestEntity } from './feedback-request.entity';
import { FeedbackEntity } from './feedback.entity';

@Entity({ name: 'feedback_request_reviewers' })
@Index('idx_feedback_request_reviewer_employee', ['reviewerEmployeeId'])
export class FeedbackRequestReviewerEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'feedback_request_reviewer_id' })
  feedbackRequestReviewerId: string;

  @Column({ type: 'uuid', name: 'feedback_request_id' })
  feedbackRequestId: string;

  @ManyToOne(
    () => FeedbackRequestEntity,
    (feedbackRequest) => feedbackRequest.reviewers,
    { nullable: false, onDelete: 'CASCADE' },
  )
  @JoinColumn({
    name: 'feedback_request_id',
    referencedColumnName: 'feedbackRequestId',
  })
  feedbackRequest?: FeedbackRequestEntity;

  @Column({ type: 'uuid', name: 'reviewer_employee_id' })
  reviewerEmployeeId: string;

  @Column({ type: 'varchar', length: 30, default: 'pending' })
  status: string;

  @Column({ type: 'uuid', name: 'feedback_id', nullable: true })
  feedbackId?: string | null;

  @ManyToOne(() => FeedbackEntity, { nullable: true })
  @JoinColumn({ name: 'feedback_id' })
  feedback?: FeedbackEntity | null;

  @Column({ type: 'timestamptz', name: 'responded_at', nullable: true })
  respondedAt?: Date | null;
}
