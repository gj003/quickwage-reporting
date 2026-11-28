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
@Index('idx_recruitment_candidate_field_context_company_only', ['companyId'])
@Entity({ name: 'recruitment_candidate_field_contexts' })
@Unique('uq_recruitment_candidate_field_context', [
  'candidateFieldId',
  'context',
])
@Index('idx_recruitment_candidate_field_context_context', ['context'])
export class RecruitmentCandidateFieldContextEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'candidate_field_context_id' })
  candidateFieldContextId: string;
  @Column({ name: 'company_id', type: 'uuid' })
  companyId: string;
  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;
  @Column({ name: 'candidate_field_id', type: 'uuid' })
  candidateFieldId: string;
  @ManyToOne(() => RecruitmentCandidateFieldEntity, (field) => field.contexts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'candidate_field_id',
    referencedColumnName: 'candidateFieldId',
  })
  field: RecruitmentCandidateFieldEntity;
  @Column({ name: 'context', type: 'varchar', length: 40 }) context: string;
  @Column({ name: 'enabled', type: 'boolean', default: true }) enabled: boolean;
  @Column({ name: 'required', type: 'boolean', default: false })
  required: boolean;
}
