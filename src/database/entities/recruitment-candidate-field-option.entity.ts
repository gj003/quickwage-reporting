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
@Index('idx_recruitment_candidate_field_option_company_only', ['companyId'])
@Entity({ name: 'recruitment_candidate_field_options' })
@Unique('uq_recruitment_candidate_field_option_value', [
  'candidateFieldId',
  'value',
])
@Index('idx_recruitment_candidate_field_option_order', [
  'candidateFieldId',
  'displayOrder',
])
export class RecruitmentCandidateFieldOptionEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'candidate_field_option_id' })
  candidateFieldOptionId: string;
  @Column({ name: 'company_id', type: 'uuid' })
  companyId: string;
  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;
  @Column({ name: 'candidate_field_id', type: 'uuid' })
  candidateFieldId: string;
  @ManyToOne(() => RecruitmentCandidateFieldEntity, (field) => field.options, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'candidate_field_id',
    referencedColumnName: 'candidateFieldId',
  })
  field: RecruitmentCandidateFieldEntity;
  @Column({ name: 'label', type: 'varchar', length: 150 }) label: string;
  @Column({ name: 'value', type: 'varchar', length: 150 }) value: string;
  @Column({ name: 'display_order', type: 'int' }) displayOrder: number;
  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;
}
