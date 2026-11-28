// src/database/entities/candidate-stage-history.entity.ts

import {
  BeforeInsert,
  Column,
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
import { UserEntity } from './user.entity';
import { generatePrefixedCode } from 'src/common/utility';

/** Audit trail for pipeline-stage moves, following the same per-domain
 * own-history-table pattern already used by RecruitmentRequisitionApprovalHistoryEntity
 * (no generic audit log exists anywhere in this codebase to reuse instead). */
@Index('idx_candidate_stage_history_candidate', [
  'company_id',
  'candidate_id',
  'created_at',
])
@Index('idx_candidate_stage_history_company', ['company_id'])
@Entity({ name: 'candidate_stage_history' })
export class CandidateStageHistoryEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'candidate_stage_history_id' })
  candidate_stage_history_id: string;

  @Column({
    name: 'candidate_stage_history_code',
    type: 'varchar',
    length: 32,
    unique: true,
  })
  candidate_stage_history_code: string;

  @Column({ name: 'company_id', type: 'uuid' })
  company_id: string;

  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;

  @Column({ name: 'candidate_id', type: 'uuid' })
  candidate_id: string;

  @ManyToOne(() => CandidateEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_id', referencedColumnName: 'candidate_id' })
  candidate: CandidateEntity;

  @Column({ name: 'from_pipeline_stage_id', type: 'uuid', nullable: true })
  from_pipeline_stage_id?: string | null;

  @ManyToOne(() => JobPipelineStageEntity, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'from_pipeline_stage_id',
    referencedColumnName: 'job_pipeline_stage_id',
  })
  from_pipeline_stage?: JobPipelineStageEntity | null;

  @Column({ name: 'to_pipeline_stage_id', type: 'uuid', nullable: true })
  to_pipeline_stage_id?: string | null;

  @ManyToOne(() => JobPipelineStageEntity, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'to_pipeline_stage_id',
    referencedColumnName: 'job_pipeline_stage_id',
  })
  to_pipeline_stage?: JobPipelineStageEntity | null;

  // null for system-driven moves (e.g. the auto-reject-inactive cron)
  @Column({ name: 'moved_by', type: 'uuid', nullable: true })
  moved_by?: string | null;

  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'moved_by', referencedColumnName: 'user_id' })
  moved_by_user?: UserEntity | null;

  @Column({ name: 'reason', type: 'text', nullable: true })
  reason?: string | null;

  @BeforeInsert()
  assignCode(): void {
    if (!this.candidate_stage_history_code) {
      this.candidate_stage_history_code = generatePrefixedCode('STAGE_HIST');
    }
  }
}
