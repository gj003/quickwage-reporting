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
import { RoleEntity } from './roles.entity';
@Index('idx_recruitment_job_field_role_company_only', ['companyId'])
@Entity({ name: 'recruitment_job_field_roles' })
@Unique('uq_recruitment_job_field_role', ['jobFieldId', 'roleId'])
export class RecruitmentJobFieldRoleEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'job_field_role_id' })
  jobFieldRoleId: string;
  @Column({ name: 'company_id', type: 'uuid' })
  companyId: string;
  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;
  @Column({ name: 'job_field_id', type: 'uuid' }) jobFieldId: string;
  @ManyToOne(() => RecruitmentJobFieldEntity, (field) => field.roles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'job_field_id', referencedColumnName: 'jobFieldId' })
  field: RecruitmentJobFieldEntity;
  @Column({ name: 'role_id', type: 'int' }) roleId: number;
  @ManyToOne(() => RoleEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role: RoleEntity;
}
