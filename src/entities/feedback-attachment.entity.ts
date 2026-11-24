import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { FeedbackEntity } from './feedback.entity';
import { DocumentEntity } from './documents.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'feedback_attachments' })
export class FeedbackAttachmentEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'feedback_attachment_id' })
  feedbackAttachmentId: string;

  @Column({ type: 'uuid', name: 'feedback_id' })
  feedbackId: string;

  @ManyToOne(() => FeedbackEntity, (feedback) => feedback.attachments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'feedback_id', referencedColumnName: 'feedbackId' })
  feedback?: FeedbackEntity;

  @Column({ type: 'int', name: 'document_id' })
  documentId: number;

  @ManyToOne(() => DocumentEntity, { nullable: false })
  @JoinColumn({ name: 'document_id' })
  document?: DocumentEntity;

  @Column({ type: 'uuid', name: 'uploaded_by_user_id' })
  uploadedByUserId: string;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'uploaded_by_user_id', referencedColumnName: 'user_id' })
  uploadedBy?: UserEntity;
}
