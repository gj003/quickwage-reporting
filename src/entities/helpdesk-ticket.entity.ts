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
import { BaseEntityColumns } from 'src/database/entities/base-entity-columns.entity';
import { UserEntity } from 'src/database/entities/user.entity';
import { HelpdeskTicketCommentEntity } from './helpdesk-ticket-comment.entity';
import { HelpdeskTicketAttachmentEntity } from './helpdesk-ticket-attachment.entity';
import { HelpdeskClosingReasonEntity } from './helpdesk-closing-reason.entity';
import { HelpdeskCategoryEntity } from './helpdesk-category.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity({ name: 'helpdesk_tickets' })
@Index('idx_helpdesk_tickets_status', ['status'])
@Index('idx_helpdesk_tickets_category', ['category'])
@Index('idx_helpdesk_tickets_priority', ['priority'])
@Index('idx_helpdesk_tickets_assigned_to', ['assignedToEmployeeId'])
@Index('idx_helpdesk_tickets_sla_status', ['slaStatus'])
@Index('idx_helpdesk_tickets_created_at', ['created_at'])
export class HelpdeskTicketEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'helpdesk_ticket_id' })
  helpdeskTicketId: string;

  @Column({
    type: 'varchar',
    name: 'ticket_code',
    unique: true,
  })
  ticketCode: string;

  @Column({ type: 'varchar', length: 240 })
  subject: string;

  @Column({ type: 'uuid', name: 'organization_id', nullable: true })
  organizationId?: string | null;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'varchar' })
  category: string;

  @Column({ type: 'uuid', name: 'helpdesk_category_id', nullable: true })
  helpdeskCategoryId?: string | null;

  @ManyToOne(() => HelpdeskCategoryEntity, { nullable: true })
  @JoinColumn({
    name: 'helpdesk_category_id',
    referencedColumnName: 'helpdeskCategoryId',
  })
  helpdeskCategory?: HelpdeskCategoryEntity | null;

  @Column({ type: 'varchar', name: 'sub_category', nullable: true })
  subCategory?: string | null;

  @Column({ type: 'varchar', name: 'sub_category_key', nullable: true })
  subCategoryKey?: string | null;

  @Column({
    type: 'timestamptz',
    name: 'first_response_due_at',
    nullable: true,
  })
  firstResponseDueAt?: Date | null;

  @Column({ type: 'timestamptz', name: 'first_responded_at', nullable: true })
  firstRespondedAt?: Date | null;

  @Column({ type: 'timestamptz', name: 'last_reverted_at', nullable: true })
  lastRevertedAt?: Date | null;

  @Column({ type: 'text', name: 'revert_reason', nullable: true })
  revertReason?: string | null;

  @Column({ type: 'uuid', name: 'reverted_by_employee_id', nullable: true })
  revertedByEmployeeId?: string | null;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({
    name: 'reverted_by_employee_id',
    referencedColumnName: 'user_id',
  })
  revertedByUser?: UserEntity | null;

  @Column({ type: 'varchar' })
  priority: string;

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'text', name: 'on_hold_reason', nullable: true })
  onHoldReason?: string | null;

  @Column({ type: 'uuid', name: 'closing_reason_id', nullable: true })
  closingReasonId?: string | null;

  @ManyToOne(() => HelpdeskClosingReasonEntity, { nullable: true })
  @JoinColumn({
    name: 'closing_reason_id',
    referencedColumnName: 'helpdeskClosingReasonId',
  })
  closingReason?: HelpdeskClosingReasonEntity | null;

  @Column({ type: 'text', name: 'closing_note', nullable: true })
  closingNote?: string | null;

  @Column({ type: 'int', name: 'csat_score', nullable: true })
  csatScore?: number | null;

  @Column({ type: 'varchar', name: 'sla_status' })
  slaStatus: string;

  @Column({ type: 'uuid', name: 'assigned_to_employee_id', nullable: true })
  assignedToEmployeeId?: string | null;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({
    name: 'assigned_to_employee_id',
    referencedColumnName: 'user_id',
  })
  assignedTo?: UserEntity | null;

  @Column({ type: 'varchar', nullable: true })
  department?: string | null;

  @Column({ type: 'varchar', array: true, nullable: true })
  tags?: string[] | null;

  @Column({ type: 'uuid', name: 'submitted_by_employee_id' })
  submittedByEmployeeId: string;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn({
    name: 'submitted_by_employee_id',
    referencedColumnName: 'user_id',
  })
  submittedByUser: UserEntity;

  @Column({ type: 'timestamptz', name: 'due_at', nullable: true })
  dueAt?: Date | null;

  @Column({ type: 'timestamptz', name: 'resolved_at', nullable: true })
  resolvedAt?: Date | null;

  @Column({ type: 'timestamptz', name: 'closed_at', nullable: true })
  closedAt?: Date | null;

  @Column({ type: 'int', name: 'resolution_minutes', nullable: true })
  resolutionMinutes?: number | null;

  @Column({ type: 'int', name: 'reopened_count', default: 0 })
  reopenedCount: number;

  @OneToMany(() => HelpdeskTicketCommentEntity, (comment) => comment.ticket)
  comments?: HelpdeskTicketCommentEntity[];

  @OneToMany(
    () => HelpdeskTicketAttachmentEntity,
    (attachment) => attachment.ticket,
  )
  attachments?: HelpdeskTicketAttachmentEntity[];

  @BeforeInsert()
  assignTicketCode(): void {
    if (!this.ticketCode) {
      this.ticketCode = generatePrefixedCode('HD');
    }
  }
}
