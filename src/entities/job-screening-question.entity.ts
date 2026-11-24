// src/database/entities/job-screening-question.entity.ts

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

@Index('idx_job_screening_questions_job_deleted', [
  'job_listing_id',
  'deleted_at',
])
@Entity({ name: 'job_screening_questions' })
export class JobScreeningQuestionEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'job_screening_question_id' })
  job_screening_question_id: string;

  @Column({
    name: 'job_screening_question_code',
    type: 'varchar',
    length: 32,
    unique: true,
  })
  job_screening_question_code: string;

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

  @Column({ name: 'question_text', type: 'text' })
  question_text: string;

  @Column({ name: 'display_order', type: 'int' })
  display_order: number;

  @BeforeInsert()
  assignCode(): void {
    if (!this.job_screening_question_code) {
      this.job_screening_question_code = generatePrefixedCode('SCRQ');
    }
  }
}
