import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { CompanyEntity } from './company.entity';
import { AssetAssignmentEntity } from './asset-assignment.entity';
import { generatePrefixedCode } from 'src/common/utility';
import { AssetConditionEntity } from './asset-condition.entity';

@Entity('assets')
export class AssetEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  asset_id: string;

  @Column('varchar', { length: 32, unique: true, nullable: true })
  asset_code: string;

  @Column('varchar', { length: 255, nullable: true, unique: true })
  asset_display_id: string;

  @Column('varchar', { length: 150, nullable: false })
  name: string;

  @Column('varchar', { length: 100, unique: true })
  code: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column({ type: 'uuid', nullable: true })
  asset_type_id?: string;

  @Column({ type: 'uuid', nullable: true })
  asset_id_series_id?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  location_id?: string;

  @Column({ type: 'uuid', nullable: true })
  condition_id?: string;

  @Column({ type: 'uuid', nullable: true })
  unavailable_reason_id?: string;

  @Column({ type: 'varchar', length: 50, default: 'available' })
  status: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  warranty_status?: string;

  @Column({ type: 'date', nullable: true })
  purchased_on?: Date;

  @Column({ type: 'date', nullable: true })
  warranty_expires_on?: Date;

  @Column({ type: 'jsonb', nullable: true })
  custom_fields_json?: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true })
  image_attachment_refs?: any[];

  @Column({ type: 'jsonb', nullable: true })
  document_attachment_refs?: any[];

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid', nullable: true })
  created_by?: string;

  @ManyToOne(() => CompanyEntity, (rel) => rel.assets, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @OneToMany(() => AssetAssignmentEntity, (rel) => rel.asset)
  assignments: AssetAssignmentEntity[];

  @ManyToOne(() => AssetConditionEntity, (rel) => rel.assets, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'condition_id',
    referencedColumnName: 'asset_condition_id',
  })
  condition?: AssetConditionEntity;

  @BeforeInsert()
  generateAssetCode() {
    if (!this.asset_code) {
      this.asset_code = generatePrefixedCode('AST');
    }
  }
}
