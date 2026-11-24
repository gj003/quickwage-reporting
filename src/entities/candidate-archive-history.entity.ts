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
import { CandidateEntity } from './candidate.entity';
import { JobPipelineStageEntity } from './job-pipeline-stage.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Index('idx_candidate_archive_history_tenant', [
  'company_id',
  'candidate_id',
  'created_at',
])
@Entity({ name: 'candidate_archive_history' })
export class CandidateArchiveHistoryEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'candidate_archive_history_id' })
  candidate_archive_history_id: string;

  @Column({ type: 'varchar', length: 32, unique: true })
  archive_history_code: string;

  @Column({ type: 'uuid' }) company_id: string;
  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;

  @Column({ type: 'uuid' }) candidate_id: string;
  @ManyToOne(() => CandidateEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_id', referencedColumnName: 'candidate_id' })
  candidate: CandidateEntity;

  @Column({ type: 'varchar', length: 20 }) action: string;
  @Column({ type: 'uuid', nullable: true }) archive_reason_id?: string | null;
  @Column({ type: 'uuid', nullable: true }) job_listing_id?: string | null;
  @Column({ type: 'varchar', length: 50, nullable: true }) stage?:
    string | null;
  @Column({ type: 'uuid', nullable: true })
  pipeline_stage_id?: string | null;
  @ManyToOne(() => JobPipelineStageEntity, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'pipeline_stage_id',
    referencedColumnName: 'job_pipeline_stage_id',
  })
  pipeline_stage?: JobPipelineStageEntity | null;
  @Column({ type: 'text', nullable: true }) note?: string | null;
  @Column({ type: 'uuid' }) actor_id: string;

  @BeforeInsert() assignCode(): void {
    if (!this.archive_history_code)
      this.archive_history_code = generatePrefixedCode('CANDARCH');
  }
}
