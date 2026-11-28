import {
  Column,
  Entity,
  Index,
  OneToMany,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { CompanyEntity } from './company.entity';
import { RecruitmentJobFieldOptionEntity } from './recruitment-job-field-option.entity';
import { RecruitmentJobFieldRoleEntity } from './recruitment-job-field-role.entity';
@Index('idx_recruitment_job_field_company_only', ['companyId'])
@Entity({ name: 'recruitment_job_fields' })
@Unique('uq_recruitment_job_field_company_code', ['companyId', 'jobFieldCode'])
@Index('idx_recruitment_job_field_company_order', ['companyId', 'displayOrder'])
@Index('idx_recruitment_job_field_type', ['fieldType'])
export class RecruitmentJobFieldEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'job_field_id' }) jobFieldId: string;
  @Column({ name: 'company_id', type: 'uuid' }) companyId: string;
  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;
  @Column({ name: 'job_field_code', type: 'varchar', length: 64 })
  jobFieldCode: string;
  @Column({ name: 'field_name', type: 'varchar', length: 150 })
  fieldName: string;
  @Column({ name: 'field_type', type: 'varchar', length: 40 })
  fieldType: string;
  @Column({ name: 'is_system_defined', type: 'boolean', default: false })
  isSystemDefined: boolean;
  @Column({ name: 'is_enabled', type: 'boolean', default: true })
  isEnabled: boolean;
  @Column({ name: 'display_order', type: 'int', default: 1 })
  displayOrder: number;
  @Column({ name: 'include_in_job', type: 'boolean', default: true })
  includeInJob: boolean;
  @Column({ name: 'required_in_job', type: 'boolean', default: false })
  requiredInJob: boolean;
  @Column({ name: 'include_in_requisition', type: 'boolean', default: true })
  includeInRequisition: boolean;
  @Column({ name: 'required_in_requisition', type: 'boolean', default: false })
  requiredInRequisition: boolean;
  @Column({ name: 'validation_config', type: 'jsonb', nullable: true })
  validationConfig?: Record<string, unknown> | null;
  @Column({ name: 'created_by', type: 'uuid', nullable: true }) createdBy?:
    string | null;
  @Column({ name: 'updated_by', type: 'uuid', nullable: true }) updatedBy?:
    string | null;
  @OneToMany(() => RecruitmentJobFieldOptionEntity, (option) => option.field)
  options: RecruitmentJobFieldOptionEntity[];
  @OneToMany(() => RecruitmentJobFieldRoleEntity, (role) => role.field)
  roles: RecruitmentJobFieldRoleEntity[];
}
