import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';

@Entity({ name: 'recognition_settings' })
@Unique('uq_recognition_settings_company', ['companyId'])
export class RecognitionSettingEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'recognition_setting_id' })
  recognitionSettingId: string;

  @Column({ type: 'uuid', name: 'company_id' })
  companyId: string;

  @Column({ type: 'boolean', name: 'enable_notifications', default: true })
  enableNotifications: boolean;

  @Column({ type: 'boolean', name: 'allow_anonymous', default: false })
  allowAnonymous: boolean;

  @Column({ type: 'boolean', name: 'require_manager_approval', default: false })
  requireManagerApproval: boolean;

  @Column({ type: 'int', name: 'auto_archive_days', nullable: true })
  autoArchiveDays?: number | null;

  @Column({ type: 'boolean', name: 'point_system_enabled', default: true })
  pointSystemEnabled: boolean;
}
