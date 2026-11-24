import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { FfEmailTemplateEntity } from './ff-email-template.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity({ name: 'ff_dispatch_job' })
@Index('uq_ff_dispatch_job_code', ['jobCode'], { unique: true })
export class FfDispatchJobEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'ff_dispatch_job_id' })
  ffDispatchJobId: string;

  @Column({ name: 'job_code', type: 'varchar', unique: true })
  jobCode: string;

  @Column({ name: 'dispatch_option', type: 'varchar', length: 30 })
  dispatchOption: string;

  @Column({ name: 'schedule_at', type: 'timestamptz', nullable: true })
  scheduleAt?: Date | null;

  @Column({ name: 'template_id', type: 'uuid' })
  templateId: string;

  @Column({ name: 'created_by_employee_id', type: 'int' })
  createdByEmployeeId: number;

  @ManyToOne(() => FfEmailTemplateEntity)
  @JoinColumn({
    name: 'template_id',
    referencedColumnName: 'ffEmailTemplateId',
  })
  template: FfEmailTemplateEntity;

  @BeforeInsert()
  assignJobCode(): void {
    if (!this.jobCode) {
      this.jobCode = generatePrefixedCode('FFDISP');
    }
  }
}
