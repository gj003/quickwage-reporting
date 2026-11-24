// src/database/entities/job-listing-collaborator.entity.ts

import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { JobListingEntity } from './job-listing.entity';
import { UserEntity } from './user.entity';
import { DesignationEntity } from './designation.entity';
import { JobListingCollaboratorStatus } from 'src/common/enum';

@Index('idx_job_listing_collaborators_listing_deleted', [
  'job_listing_id',
  'deleted_at',
])
@Index(
  'uq_job_listing_collaborators_listing_user',
  ['job_listing_id', 'user_id'],
  { unique: true, where: '"deleted_at" IS NULL' },
)
@Entity({ name: 'job_listing_collaborators' })
export class JobListingCollaboratorEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'job_listing_collaborator_id' })
  job_listing_collaborator_id: string;

  @Column({ name: 'job_listing_id', type: 'uuid' })
  job_listing_id: string;

  @ManyToOne(() => JobListingEntity, (jobListing) => jobListing.collaborators, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'job_listing_id',
    referencedColumnName: 'job_listing_id',
  })
  job_listing: JobListingEntity;

  @Column({ name: 'user_id', type: 'uuid' })
  user_id: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  user: UserEntity;

  @Column({ name: 'designation_id', type: 'int', nullable: true })
  designation_id?: number | null;

  @ManyToOne(() => DesignationEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'designation_id', referencedColumnName: 'id' })
  designation?: DesignationEntity | null;

  @Column({ name: 'designation_text', type: 'varchar', nullable: true })
  designation_text?: string | null;

  @Column({
    name: 'status',
    type: 'varchar',
    default: JobListingCollaboratorStatus.PENDING,
  })
  status: JobListingCollaboratorStatus;
}
