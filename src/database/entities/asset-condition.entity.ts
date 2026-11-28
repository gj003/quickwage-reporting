import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { generatePrefixedCode } from 'src/common/utility';
import { AssetEntity } from './asset.entity';

@Entity('asset_conditions')
export class AssetConditionEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  asset_condition_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'varchar', length: 32, unique: true, nullable: true })
  asset_condition_code: string;

  @Column({ type: 'varchar', length: 120 })
  condition_name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'int', nullable: true })
  sort_order?: number;

  @Column({ type: 'uuid', nullable: true })
  created_by?: string;

  @OneToMany(() => AssetEntity, (asset) => asset.condition)
  assets: AssetEntity[];

  @BeforeInsert()
  generateCode() {
    if (!this.asset_condition_code) {
      this.asset_condition_code = generatePrefixedCode('ASTCOND');
    }
  }
}
