import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { HelpdeskTicketEntity } from './helpdesk-ticket.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'helpdesk_ticket_attachments' })
export class HelpdeskTicketAttachmentEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'helpdesk_ticket_attachment_id' })
  helpdeskTicketAttachmentId: string;

  @Column({ type: 'uuid', name: 'helpdesk_ticket_id' })
  helpdeskTicketId: string;

  @ManyToOne(() => HelpdeskTicketEntity, (ticket) => ticket.attachments, {
    nullable: false,
  })
  @JoinColumn({
    name: 'helpdesk_ticket_id',
    referencedColumnName: 'helpdeskTicketId',
  })
  ticket?: HelpdeskTicketEntity;

  @Column({ type: 'varchar', name: 'file_name' })
  fileName: string;

  @Column({ type: 'varchar', name: 'mime_type' })
  mimeType: string;

  @Column({ type: 'int', name: 'size_bytes' })
  sizeBytes: number;

  @Column({ type: 'varchar', name: 'storage_key' })
  storageKey: string;

  @Column({ type: 'uuid', name: 'uploaded_by_user_id' })
  uploadedByUserId: string;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'uploaded_by_user_id', referencedColumnName: 'user_id' })
  uploadedBy?: UserEntity;

  @Column({ type: 'text', nullable: true })
  note?: string | null;
}
