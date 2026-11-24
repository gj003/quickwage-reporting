import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity('asset_unavailable_reasons')
export class AssetUnavailableReasonEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  asset_unavailable_reason_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'varchar', length: 32, unique: true, nullable: true })
  asset_unavailable_reason_code: string;

  @Column({ type: 'varchar', length: 120 })
  reason_name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'uuid', nullable: true })
  created_by?: string;

  @BeforeInsert()
  generateCode() {
    if (!this.asset_unavailable_reason_code) {
      this.asset_unavailable_reason_code = generatePrefixedCode('ASTRSN');
    }
  }
}
