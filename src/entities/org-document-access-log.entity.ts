import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { OrgDocumentEntity } from './org-document.entity';
import { UserEntity } from './user.entity';

export enum OrgDocumentAccessStatus {
  NOT_VIEWED = 'not_viewed',
  VIEWED = 'viewed',
  ACKNOWLEDGED = 'acknowledged',
}

@Entity('org_document_access_logs')
export class OrgDocumentAccessLogEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  document_id: number;

  @Column({ type: 'uuid' })
  employee_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({
    type: 'varchar',
    default: OrgDocumentAccessStatus.NOT_VIEWED,
  })
  status: OrgDocumentAccessStatus;

  @Column({ type: 'timestamptz', nullable: true })
  viewed_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  acknowledged_at: Date;

  @ManyToOne(() => OrgDocumentEntity, (doc) => doc.access_logs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'document_id' })
  document: OrgDocumentEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employee_id', referencedColumnName: 'user_id' })
  employee: UserEntity;
}
