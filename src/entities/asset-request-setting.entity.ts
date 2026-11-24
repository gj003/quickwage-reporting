import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('asset_request_settings')
export class AssetRequestSettingEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  asset_request_setting_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'boolean', default: true })
  is_enabled: boolean;

  @Column({ type: 'varchar', length: 50, default: 'enabled' })
  status: string;

  @Column({ type: 'jsonb', nullable: true })
  configuration_json?: Record<string, any>;

  @Column({ type: 'uuid', nullable: true })
  created_by?: string;
}
