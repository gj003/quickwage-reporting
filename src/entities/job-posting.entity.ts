import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';
import { JobRequisitionEntity } from './job-requisition.entity';

@Entity({ name: 'job_postings' })
export class JobPostingEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('increment', { name: 'job_posting_id' })
  jobPostingId: number;

  @Column({ name: 'post_code', type: 'varchar', length: 32, unique: true })
  postCode: string;

  @Column({ name: 'requisition_id', type: 'int' })
  requisitionId: number;

  @ManyToOne(
    () => JobRequisitionEntity,
    (requisition) => requisition.postings,
    {
      nullable: false,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({
    name: 'requisition_id',
    referencedColumnName: 'jobRequisitionId',
  })
  requisition: JobRequisitionEntity;

  @Column({
    name: 'board',
    type: 'varchar',
    length: 32,
  })
  board: 'website' | 'linkedin' | 'indeed' | 'naukri' | 'other';

  @Column({
    name: 'external_url',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  externalUrl?: string | null;

  @Column({ name: 'is_published', type: 'boolean', default: false })
  isPublished: boolean;

  @Column({ name: 'published_at', type: 'timestamptz', nullable: true })
  publishedAt?: Date | null;

  @BeforeInsert()
  assignCode(): void {
    if (!this.postCode) {
      this.postCode = generatePrefixedCode('JOBPST');
    }
  }
}
