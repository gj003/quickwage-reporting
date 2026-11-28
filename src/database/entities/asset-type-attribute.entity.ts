import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity('asset_type_attributes')
export class AssetTypeAttributeEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  asset_type_attribute_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  asset_type_id: string;

  @Column({ type: 'varchar', length: 32, unique: true, nullable: true })
  asset_type_attribute_code: string;

  @Column({ type: 'varchar', length: 120 })
  attribute_name: string;

  @Column({ type: 'varchar', length: 50 })
  field_type: string;

  @Column({ type: 'jsonb', nullable: true })
  options_json?: unknown;

  @Column({ type: 'boolean', default: false })
  is_mandatory: boolean;

  @Column({ type: 'boolean', default: false })
  is_unique: boolean;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @BeforeInsert()
  generateCode() {
    if (!this.asset_type_attribute_code) {
      this.asset_type_attribute_code = generatePrefixedCode('ASTATTR');
    }
  }
}
