import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from 'src/database/entities/base-entity-columns.entity';
import { HelpdeskTicketEntity } from './helpdesk-ticket.entity';
import { UserEntity } from 'src/database/entities/user.entity';

@Entity({ name: 'helpdesk_ticket_comments' })
@Index('idx_helpdesk_ticket_comments_ticket', ['helpdeskTicketId'])
export class HelpdeskTicketCommentEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'helpdesk_ticket_comment_id' })
  helpdeskTicketCommentId: string;

  @Column({ type: 'uuid', name: 'helpdesk_ticket_id' })
  helpdeskTicketId: string;

  @Column({
    type: 'varchar',
    name: 'comment_number',
    unique: true,
    nullable: true,
  })
  commentNumber?: string | null;

  @ManyToOne(() => HelpdeskTicketEntity, (ticket) => ticket.comments, {
    nullable: false,
  })
  @JoinColumn({
    name: 'helpdesk_ticket_id',
    referencedColumnName: 'helpdeskTicketId',
  })
  ticket?: HelpdeskTicketEntity;

  @Column({ type: 'text' })
  comment: string;

  @Column({ type: 'uuid', name: 'author_employee_id' })
  authorEmployeeId: string;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'author_employee_id', referencedColumnName: 'user_id' })
  author?: UserEntity;
}
