import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('candidate_duplicate_groups')
@Index('idx_candidate_duplicate_group_company_status', ['company_id', 'status'])
@Index(
  'uq_candidate_duplicate_group_company_fingerprint',
  ['company_id', 'fingerprint'],
  {
    unique: true,
    where: 'deleted_at IS NULL',
  },
)
export class CandidateDuplicateGroupEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'candidate_duplicate_group_id' })
  candidate_duplicate_group_id: string;
  @Column({ type: 'uuid' }) company_id: string;
  @Column({ type: 'varchar', length: 20, default: 'OPEN' }) status:
    'OPEN' | 'MERGED' | 'DISMISSED';
  @Column({ type: 'text', array: true, default: '{}' })
  matched_fields: string[];
  @Column({ type: 'numeric', precision: 5, scale: 4, default: 1 })
  confidence: string;
  @Column({ type: 'varchar', length: 500 }) fingerprint: string;
  @Column({ type: 'uuid', nullable: true }) resolved_by?: string | null;
  @Column({ type: 'timestamptz', nullable: true }) resolved_at?: Date | null;
  @Column({ type: 'text', nullable: true }) resolution_reason?: string | null;
}
