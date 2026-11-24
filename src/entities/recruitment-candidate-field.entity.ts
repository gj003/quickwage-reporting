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
import { RecruitmentCandidateFieldContextEntity } from './recruitment-candidate-field-context.entity';
import { RecruitmentCandidateFieldOptionEntity } from './recruitment-candidate-field-option.entity';
import { RecruitmentCandidateFieldRoleEntity } from './recruitment-candidate-field-role.entity';
@Index('idx_recruitment_candidate_field_company_only', ['companyId'])
@Entity({ name: 'recruitment_candidate_fields' })
@Unique('uq_recruitment_candidate_field_company_code', [
  'companyId',
  'candidateFieldCode',
])
@Index('idx_recruitment_candidate_field_company_order', [
  'companyId',
  'displayOrder',
])
@Index('idx_recruitment_candidate_field_type', ['fieldType'])
export class RecruitmentCandidateFieldEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'candidate_field_id' })
  candidateFieldId: string;
  @Column({ name: 'company_id', type: 'uuid' }) companyId: string;
  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;
  @Column({ name: 'candidate_field_code', type: 'varchar', length: 64 })
  candidateFieldCode: string;
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
  @Column({ name: 'validation_config', type: 'jsonb', nullable: true })
  validationConfig?: Record<string, unknown> | null;
  @Column({ name: 'created_by', type: 'uuid', nullable: true }) createdBy?:
    string | null;
  @Column({ name: 'updated_by', type: 'uuid', nullable: true }) updatedBy?:
    string | null;
  @OneToMany(
    () => RecruitmentCandidateFieldContextEntity,
    (context) => context.field,
  )
  contexts: RecruitmentCandidateFieldContextEntity[];
  @OneToMany(
    () => RecruitmentCandidateFieldOptionEntity,
    (option) => option.field,
  )
  options: RecruitmentCandidateFieldOptionEntity[];
  @OneToMany(() => RecruitmentCandidateFieldRoleEntity, (role) => role.field)
  roles: RecruitmentCandidateFieldRoleEntity[];
}
