// src/database/entities/job-evaluation-skill.entity.ts

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
import { JobListingEntity } from './job-listing.entity';
import { generatePrefixedCode } from 'src/common/utility';

/** Skills interviewers score candidates on for a job (Scorecard tab). Not a
 * scorecard-submission/scoring system - the screenshots only show this
 * configuration list plus the hiring-rule toggles on JobListingEntity;
 * actual per-candidate scorecard capture is a separate, larger feature not
 * evidenced here (see gap analysis). */
@Index('idx_job_evaluation_skills_job_deleted', [
  'job_listing_id',
  'deleted_at',
])
@Entity({ name: 'job_evaluation_skills' })
export class JobEvaluationSkillEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'job_evaluation_skill_id' })
  job_evaluation_skill_id: string;

  @Column({
    name: 'job_evaluation_skill_code',
    type: 'varchar',
    length: 32,
    unique: true,
  })
  job_evaluation_skill_code: string;

  @Column({ name: 'company_id', type: 'uuid' })
  company_id: string;

  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;

  @Column({ name: 'job_listing_id', type: 'uuid' })
  job_listing_id: string;

  @ManyToOne(() => JobListingEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'job_listing_id',
    referencedColumnName: 'job_listing_id',
  })
  job_listing: JobListingEntity;

  @Column({ name: 'name', type: 'varchar', length: 150 })
  name: string;

  @Column({ name: 'display_order', type: 'int' })
  display_order: number;

  @BeforeInsert()
  assignCode(): void {
    if (!this.job_evaluation_skill_code) {
      this.job_evaluation_skill_code = generatePrefixedCode('EVALSKILL');
    }
  }
}
