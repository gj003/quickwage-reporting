import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { PraiseEntity } from './praise.entity';
import { DocumentEntity } from './documents.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'praise_attachments' })
export class PraiseAttachmentEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'praise_attachment_id' })
  praiseAttachmentId: string;

  @Column({ type: 'uuid', name: 'praise_id' })
  praiseId: string;

  @ManyToOne(() => PraiseEntity, (praise) => praise.attachments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'praise_id', referencedColumnName: 'praiseId' })
  praise?: PraiseEntity;

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
