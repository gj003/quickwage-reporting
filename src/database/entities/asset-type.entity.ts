import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity('asset_types')
export class AssetTypeEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  asset_type_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  asset_category_id: string;

  @Column({ type: 'varchar', length: 32, unique: true, nullable: true })
  asset_type_code: string;

  @Column({ type: 'varchar', length: 120 })
  type_name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  icon?: string;

  @Column({ type: 'varchar', length: 32, nullable: true, default: 'blue' })
  icon_color?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'jsonb', nullable: true })
  standard_attributes_json?: Record<string, unknown>;

  @Column({ type: 'jsonb', nullable: true })
  custom_attributes_json?: Record<string, unknown>[];

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'uuid', nullable: true })
  created_by?: string;

  @BeforeInsert()
  generateCode() {
    if (!this.asset_type_code) {
      this.asset_type_code = generatePrefixedCode('ASTTYPE');
    }
  }
}
