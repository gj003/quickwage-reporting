import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('asset_request_approval_chains')
export class AssetRequestApprovalChainEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  asset_request_approval_chain_id: string;

  @Column({ type: 'uuid' })
  asset_request_setting_id: string;

  @Column({ type: 'int' })
  level: number;

  @Column({ type: 'varchar', length: 50 })
  approval_type: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  reference_id?: string;
}
