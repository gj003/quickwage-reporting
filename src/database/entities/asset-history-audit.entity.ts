import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('asset_history_audit_log')
@Index('idx_asset_history_audit_company', ['company_id'])
@Index('idx_asset_history_audit_asset', ['asset_id'])
export class AssetHistoryAuditLogEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly asset_history_audit_log_id: string;

  @Column({ type: 'varchar', length: 64 })
  company_id: string;

  @Column({ type: 'varchar', length: 64 })
  asset_id: string;

  @Column({ type: 'varchar', length: 40 })
  change_type: 'CREATE' | 'UPDATE' | 'DELETE';

  @Column({ type: 'varchar', length: 64, nullable: true })
  changed_by: string | null;

  @Column({ type: 'text', nullable: true })
  old_value: string | null;

  @Column({ type: 'text', nullable: true })
  new_value: string | null;

  @Column({ type: 'text', nullable: true })
  change_note: string | null;
}
