import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity('asset_id_series')
export class AssetIdSeriesEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  asset_id_series_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'varchar', length: 32, unique: true, nullable: true })
  asset_id_series_code: string;

  @Column({ type: 'varchar', length: 120 })
  series_title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  prefix?: string;

  @Column({ type: 'int', default: 4 })
  digits: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  suffix?: string;

  @Column({ type: 'int', default: 0 })
  next_number: number;

  @Column({ type: 'boolean', default: true })
  is_enabled: boolean;

  @Column({ type: 'varchar', length: 50, default: 'active' })
  status: string;

  @Column({ type: 'uuid', nullable: true })
  created_by?: string;

  @BeforeInsert()
  generateCode() {
    if (!this.asset_id_series_code) {
      this.asset_id_series_code = generatePrefixedCode('ASTSER');
    }
  }
}
