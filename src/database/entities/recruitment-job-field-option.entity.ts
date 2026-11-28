import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { CompanyEntity } from './company.entity';
import { RecruitmentJobFieldEntity } from './recruitment-job-field.entity';
@Index('idx_recruitment_job_field_option_company_only', ['companyId'])
@Entity({ name: 'recruitment_job_field_options' })
@Unique('uq_recruitment_job_field_option_value', ['jobFieldId', 'value'])
@Index('idx_recruitment_job_field_option_order', ['jobFieldId', 'displayOrder'])
export class RecruitmentJobFieldOptionEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'job_field_option_id' })
  jobFieldOptionId: string;
  @Column({ name: 'company_id', type: 'uuid' })
  companyId: string;
  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;
  @Column({ name: 'job_field_id', type: 'uuid' }) jobFieldId: string;
  @ManyToOne(() => RecruitmentJobFieldEntity, (field) => field.options, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'job_field_id', referencedColumnName: 'jobFieldId' })
  field: RecruitmentJobFieldEntity;
  @Column({ name: 'label', type: 'varchar', length: 150 }) label: string;
  @Column({ name: 'value', type: 'varchar', length: 150 }) value: string;
  @Column({ name: 'display_order', type: 'int' }) displayOrder: number;
  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;
}
