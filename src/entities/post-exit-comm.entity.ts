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
import { PostExitTemplateEntity } from './post-exit-template.entity';
import { UserEntity } from './user.entity';
import { CompanyEntity } from './company.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity({ name: 'post_exit_comm' })
@Index('idx_post_exit_comm_employee', ['recipientEmployeeId'])
@Index('idx_post_exit_comm_status_sent_at', ['status', 'sentAt'])
export class PostExitCommEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'post_exit_comm_id' })
  postExitCommId: string;

  @Column({ name: 'auto_inc', type: 'int' })
  @Generated('increment')
  autoInc: number;

  @Column({ name: 'comm_code', type: 'varchar', unique: true })
  commCode: string;

  @Column({ name: 'company_id', type: 'uuid', nullable: true })
  companyId?: string | null;

  @ManyToOne(() => CompanyEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company?: CompanyEntity | null;

  @Column({ name: 'recipient_employee_id', type: 'uuid' })
  recipientEmployeeId: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ name: 'last_working_day', type: 'date', nullable: true })
  lastWorkingDay?: string | null;

  @Column({ type: 'varchar', length: 30, default: 'queued' })
  status: string;

  @Column({ name: 'sent_at', type: 'timestamptz', nullable: true })
  sentAt?: Date | null;

  @Column({ name: 'delivered_at', type: 'timestamptz', nullable: true })
  deliveredAt?: Date | null;

  @Column({ name: 'opened_at', type: 'timestamptz', nullable: true })
  openedAt?: Date | null;

  @Column({ name: 'template_id', type: 'uuid' })
  templateId: string;

  @ManyToOne(() => PostExitTemplateEntity)
  @JoinColumn({
    name: 'template_id',
    referencedColumnName: 'postExitTemplateId',
  })
  template: PostExitTemplateEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'recipient_employee_id',
    referencedColumnName: 'user_id',
  })
  employee: UserEntity;

  @BeforeInsert()
  assignCommCode(): void {
    if (!this.commCode) {
      this.commCode = generatePrefixedCode('PXCOMM');
    }
  }
}
