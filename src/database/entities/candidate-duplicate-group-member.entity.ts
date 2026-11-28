import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('candidate_duplicate_group_members')
@Index(
  'uq_candidate_duplicate_member',
  ['company_id', 'candidate_duplicate_group_id', 'candidate_id'],
  { unique: true, where: 'deleted_at IS NULL' },
)
export class CandidateDuplicateGroupMemberEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'candidate_duplicate_group_member_id',
  })
  candidate_duplicate_group_member_id: string;
  @Column({ type: 'uuid' }) company_id: string;
  @Column({ type: 'uuid' }) candidate_duplicate_group_id: string;
  @Column({ type: 'uuid' }) candidate_id: string;
}
