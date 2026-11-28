import {
  BeforeInsert,
  Column,
  Entity,
  Generated,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';
import { HireCommTemplateEntity } from './hire-comm-template.entity';
import { CompanyEntity } from './company.entity';

export type HireCommChannel = 'email' | 'sms' | 'whatsapp';
export type HireCommStatus =
  'queued' | 'sent' | 'delivered' | 'opened' | 'failed';

@Entity({ name: 'hire_communication' })
@Index('idx_hire_communication_status', ['status'])
@Index('idx_hire_communication_channel', ['channel'])
export class HireCommunicationEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'hire_communication_id' })
  hireCommunicationId: string;

  @Column({ name: 'auto_inc', type: 'int' })
  @Generated('increment')
  autoInc: number;

  @Column({ name: 'comm_code', type: 'varchar', unique: true })
  commCode: string;

  @Column({ name: 'company_id', type: 'uuid' })
  companyId: string;

  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;

  @Column({ name: 'recipient_candidate_id', type: 'uuid', nullable: true })
  recipientCandidateId?: string | null;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  channel: HireCommChannel;

  @Column({ type: 'varchar', length: 20 })
  status: HireCommStatus;

  @Column({ name: 'template_id', type: 'uuid', nullable: true })
  templateId?: string | null;

  @ManyToOne(() => HireCommTemplateEntity, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'template_id',
    referencedColumnName: 'hireCommTemplateId',
  })
  template?: HireCommTemplateEntity | null;

  @Column({ name: 'sent_at', type: 'timestamptz', nullable: true })
  sentAt?: Date | null;

  @Column({ name: 'delivered_at', type: 'timestamptz', nullable: true })
  deliveredAt?: Date | null;

  @Column({ name: 'opened_at', type: 'timestamptz', nullable: true })
  openedAt?: Date | null;

  @BeforeInsert()
  assignCommCode(): void {
    if (!this.commCode) {
      this.commCode = generatePrefixedCode('HCOMM');
    }
  }
}
