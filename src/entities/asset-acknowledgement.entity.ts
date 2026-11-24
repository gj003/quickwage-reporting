import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('asset_acknowledgements')
export class AssetAcknowledgementEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  asset_acknowledgement_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  asset_assignment_id: string;

  @Column({ type: 'uuid' })
  asset_id: string;

  @Column({ type: 'uuid' })
  employee_id: string;

  @Column({ type: 'varchar', length: 50, default: 'pending' })
  acknowledgement_status: string;

  @Column({ type: 'timestamp', nullable: true })
  reminded_at?: Date;

  @Column({ type: 'int', default: 0 })
  reminded_count: number;

  @Column({ type: 'timestamp', nullable: true })
  acknowledged_at?: Date;

  @Column({ type: 'uuid', nullable: true })
  acknowledged_by?: string;
}
