import type { PortalTaskStoredSubmissionDTO } from 'src/modules/recruitment-and-onboarding/preboarding/dto/portal-task-submission.dto';
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
import { PreboardingEntity } from './preboarding.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity({ name: 'preboarding_portal_tasks' })
@Index('idx_preboarding_portal_tasks_tenant', ['company_id', 'preboarding_id'])
@Index(
  'uq_preboarding_portal_task_active',
  ['company_id', 'preboarding_id', 'candidate_portal_task_id'],
  { unique: true, where: 'deleted_at IS NULL' },
)
export class PreboardingPortalTaskEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'preboarding_portal_task_id' })
  preboarding_portal_task_id: string;
  @Column({ type: 'varchar', length: 64, unique: true })
  preboarding_portal_task_code: string;
  @Column({ type: 'uuid' }) company_id: string;
  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;
  @Column({ type: 'uuid' }) preboarding_id: string;
  @ManyToOne(() => PreboardingEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({
    name: 'preboarding_id',
    referencedColumnName: 'preboarding_id',
  })
  preboarding: PreboardingEntity;

  @Column({ type: 'uuid' }) candidate_portal_task_id: string;
  @Column({ type: 'varchar', length: 200 }) name: string;
  @Column({ type: 'varchar', length: 100 }) type: string;
  @Column({ type: 'date' }) due_date: string;
  @Column({ type: 'varchar', default: 'PENDING' }) status: string;

  @Column({ type: 'jsonb', nullable: true })
  submission: PortalTaskStoredSubmissionDTO | null;
  @Column({ type: 'timestamptz', nullable: true }) submitted_at: Date | null;

  @BeforeInsert() assignCode(): void {
    if (!this.preboarding_portal_task_code)
      this.preboarding_portal_task_code = generatePrefixedCode(
        'PREBOARDING_PORTAL_TASK',
      );
  }
}
