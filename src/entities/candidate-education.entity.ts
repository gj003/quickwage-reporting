// src/database/entities/candidate-education.entity.ts

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

@Index('idx_candidate_education_candidate_deleted', [
  'candidate_id',
  'deleted_at',
])
@Entity({ name: 'candidate_education' })
export class CandidateEducationEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'candidate_education_id' })
  candidate_education_id: string;

  @Column({ name: 'candidate_id', type: 'uuid' })
  candidate_id: string;

  @ManyToOne(() => CandidateEntity, (candidate) => candidate.education, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'candidate_id', referencedColumnName: 'candidate_id' })
  candidate: CandidateEntity;

  @Column({ name: 'school', type: 'varchar', length: 200 })
  school: string;

  @Column({ name: 'degree', type: 'varchar', length: 150 })
  degree: string;

  @Column({
    name: 'specialization',
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  specialization?: string | null;

  @Column({ name: 'start_year', type: 'int' })
  start_year: number;

  @Column({ name: 'end_year', type: 'int', nullable: true })
  end_year?: number | null;
}
