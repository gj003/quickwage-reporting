import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { generatePrefixedCode } from 'src/common/utility';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { CompanyEntity } from './company.entity';

/**
 * Tenant-configurable reason an entity (candidate, preboarding profile, job,
 * requisition) can be archived for. `applies_to` scopes which archive flows
 * may offer a given reason as an option. Soft-deleted (retired) reasons must
 * stay resolvable for historical records that already reference them, they
 * are simply excluded from selection in new archive actions.
 */
@Index('idx_archive_reasons_company_deleted', ['company_id', 'deleted_at'])
@Index('idx_archive_reasons_company_applies_to_active_deleted', [
  'company_id',
  'applies_to',
  'active',
  'deleted_at',
])
@Entity({ name: 'archive_reasons' })
export class ArchiveReasonEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'archive_reason_id' })
  archive_reason_id: string;

  @Column({
    name: 'archive_reason_code',
    type: 'varchar',
    length: 32,
    unique: true,
  })
  archive_reason_code: string;

  @Column({ name: 'company_id', type: 'uuid' })
  company_id: string;

  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;

  @Column({ name: 'name', type: 'varchar', length: 200 })
  name: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 1000,
    nullable: true,
  })
  description?: string | null;

  // HIRING | PREBOARDING | JOB | REQUISITION - kept as a free varchar rather
  // than a DB enum per project convention; validated at the DTO layer.
  @Column({ name: 'applies_to', type: 'varchar', length: 20 })
  applies_to: string;

  @Column({ name: 'active', type: 'boolean', default: true })
  active: boolean;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  created_by?: string | null;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updated_by?: string | null;

  @BeforeInsert()
  assignCode(): void {
    if (!this.archive_reason_code) {
      this.archive_reason_code = generatePrefixedCode('AR');
    }
  }
}
