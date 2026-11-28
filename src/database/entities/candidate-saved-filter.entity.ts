import {
  Column,
  BeforeInsert,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { CompanyEntity } from './company.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Index('idx_candidate_saved_filter_tenant', ['company_id', 'owner_user_id'])
@Index(
  'uq_candidate_saved_filter_name',
  ['company_id', 'owner_user_id', 'normalized_name'],
  { unique: true, where: 'deleted_at IS NULL' },
)
@Entity({ name: 'candidate_saved_filters' })
export class CandidateSavedFilterEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'candidate_filter_id' })
  candidate_filter_id: string;
  @Column({ type: 'varchar', length: 32, unique: true })
  candidate_filter_code: string;
  @Column({ type: 'uuid' }) company_id: string;
  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;
  @Column({ type: 'uuid' }) owner_user_id: string;
  @Column({ type: 'varchar', length: 120 }) name: string;
  @Column({ type: 'varchar', length: 120 }) normalized_name: string;
  @Column({ type: 'jsonb', default: {} }) filters: Record<string, unknown>;
  @Column({ type: 'jsonb', default: [] }) visible_columns: string[];
  @Column({ type: 'jsonb', default: {} }) sort: {
    field: string;
    order: string;
  };
  @Column({ type: 'varchar', length: 20, default: 'PRIVATE' })
  visibility: string;
  @BeforeInsert() assignCode(): void {
    if (!this.candidate_filter_code)
      this.candidate_filter_code = generatePrefixedCode('CANDFLTR');
  }
}
