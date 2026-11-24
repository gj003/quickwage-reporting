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
import { RecruitmentCandidateFieldEntity } from './recruitment-candidate-field.entity';
import { RoleEntity } from './roles.entity';
@Index('idx_recruitment_candidate_field_role_company_only', ['companyId'])
@Entity({ name: 'recruitment_candidate_field_roles' })
@Unique('uq_recruitment_candidate_field_role', ['candidateFieldId', 'roleId'])
export class RecruitmentCandidateFieldRoleEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'candidate_field_role_id' })
  candidateFieldRoleId: string;
  @Column({ name: 'company_id', type: 'uuid' })
  companyId: string;
  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;
  @Column({ name: 'candidate_field_id', type: 'uuid' })
  candidateFieldId: string;
  @ManyToOne(() => RecruitmentCandidateFieldEntity, (field) => field.roles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'candidate_field_id',
    referencedColumnName: 'candidateFieldId',
  })
  field: RecruitmentCandidateFieldEntity;
  @Column({ name: 'role_id', type: 'int' }) roleId: number;
  @ManyToOne(() => RoleEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role: RoleEntity;
}
