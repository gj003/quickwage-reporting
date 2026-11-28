import {
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
import { UserEntity } from './user.entity';
import type { JobVersionDefinitionDTO } from 'src/modules/recruitment-and-onboarding/requisitions/dto/requisition-job-lifecycle.dto';

@Entity('job_listing_versions')
@Index('idx_job_versions_company_job', ['company_id', 'job_listing_id'])
@Index('uq_job_versions_job_version', ['job_listing_id', 'version_number'], {
  unique: true,
})
export class JobListingVersionEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid') job_listing_version_id: string;
  @Column({ type: 'uuid' }) company_id: string;
  @ManyToOne(() => CompanyEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;
  @Column({ type: 'uuid' }) job_listing_id: string;
  @ManyToOne(() => JobListingEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'job_listing_id' })
  job_listing: JobListingEntity;
  @Column({ type: 'int' }) version_number: number;
  @Column({ type: 'uuid' }) reopened_by: string;
  @ManyToOne(() => UserEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'reopened_by', referencedColumnName: 'user_id' })
  reopenedBy: UserEntity;
  @Column({ type: 'jsonb' }) definition: JobVersionDefinitionDTO;
  @Column({ type: 'uuid', array: true, default: () => "'{}'::uuid[]" })
  linked_requisition_ids: string[];
}
