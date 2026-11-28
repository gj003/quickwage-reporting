import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('asset_request_activities')
export class AssetRequestActivityEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  asset_request_activity_id: string;

  @Column({ type: 'uuid' })
  asset_request_id: string;

  @Column({ type: 'varchar', length: 80 })
  action_type: string;

  @Column({ type: 'text', nullable: true })
  comment?: string;

  @Column({ type: 'uuid', nullable: true })
  action_by?: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>;
}
