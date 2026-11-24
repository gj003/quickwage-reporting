// src/database/entities/candidate-experience.entity.ts

import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { CandidateEntity } from './candidate.entity';

@Index('idx_candidate_experience_candidate_deleted', [
  'candidate_id',
  'deleted_at',
])
@Entity({ name: 'candidate_experience' })
export class CandidateExperienceEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'candidate_experience_id' })
  candidate_experience_id: string;

  @Column({ name: 'candidate_id', type: 'uuid' })
  candidate_id: string;

  @ManyToOne(() => CandidateEntity, (candidate) => candidate.experience, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'candidate_id', referencedColumnName: 'candidate_id' })
  candidate: CandidateEntity;

  @Column({ name: 'role', type: 'varchar', length: 150 })
  role: string;

  @Column({ name: 'company', type: 'varchar', length: 150 })
  company: string;

  @Column({ name: 'location', type: 'varchar', length: 200, nullable: true })
  location?: string | null;

  @Column({
    name: 'currently_working_here',
    type: 'boolean',
    default: false,
  })
  currently_working_here: boolean;

  /** Month + year the role started, stored as the first day of that month (YYYY-MM-01). */
  @Column({ name: 'start_month', type: 'date' })
  start_month: Date;

  /** Month + year the role ended, stored as the first day of that month. Null while currently working here. */
  @Column({ name: 'end_month', type: 'date', nullable: true })
  end_month?: Date | null;
}
