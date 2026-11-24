import {
  BeforeInsert,
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';
import { TalentPoolEntity } from './talent-pool.entity';
import { CompanyEntity } from './company.entity';
import { CandidateEntity } from './candidate.entity';

@Index(
  'idx_pool_member_company_pool_candidate',
  ['companyId', 'poolId', 'candidateId'],
  { unique: true, where: 'deleted_at IS NULL' },
)
@Entity({ name: 'pool_member' })
export class PoolMemberEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'pool_member_id' })
  poolMemberId: string;

  @Column({ name: 'auto_inc', type: 'int' })
  @Generated('increment')
  autoInc: number;

  @Column({ name: 'member_code', type: 'varchar', length: 32, unique: true })
  memberCode: string;

  @Column({ name: 'company_id', type: 'uuid' })
  companyId: string;

  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;

  @Column({ name: 'pool_id', type: 'uuid' })
  poolId: string;

  @ManyToOne(() => TalentPoolEntity, (pool) => pool.members, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'pool_id', referencedColumnName: 'talentPoolId' })
  pool: TalentPoolEntity;

  @Column({ name: 'candidate_id', type: 'uuid' })
  candidateId: string;

  @ManyToOne(() => CandidateEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'candidate_id', referencedColumnName: 'candidate_id' })
  candidate?: CandidateEntity;

  recentNote?: Record<string, unknown> | null;

  @Column({ name: 'source', type: 'varchar', length: 32 })
  source: 'LINKED' | 'IMPORTED' | 'AI_SUGGESTED';

  @Column({
    name: 'ai_score',
    type: 'numeric',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  aiScore?: string | null;

  @BeforeInsert()
  assignMemberCode(): void {
    if (!this.memberCode) {
      this.memberCode = generatePrefixedCode('POOLMBR');
    }
  }
}
