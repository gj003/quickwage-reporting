import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { AssetEntity } from './asset.entity';
import { UserEntity } from './user.entity';

@Entity('asset_damage_charges')
export class AssetDamageChargeEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  asset_damage_charge_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  asset_id: string;

  @Column({ type: 'uuid', nullable: true })
  asset_recovery_id?: string;

  @Column({ type: 'uuid', nullable: true })
  charged_employee_id?: string;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  amount: string;

  @Column({ type: 'date' })
  charge_date: Date;

  @Column({ type: 'varchar', length: 120 })
  collection_source: string;

  @Column({ type: 'text', nullable: true })
  damage_note?: string;

  @Column({ type: 'jsonb', nullable: true })
  damage_document_refs?: string[];

  @Column({ type: 'uuid', nullable: true })
  created_by?: string;

  @ManyToOne(() => AssetEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'asset_id' })
  asset: AssetEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'charged_employee_id', referencedColumnName: 'user_id' })
  charged_employee?: UserEntity;
}
