import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity('asset_recoveries')
export class AssetRecoveryEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  asset_recovery_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'varchar', length: 32, unique: true, nullable: true })
  asset_recovery_code: string;

  @Column({ type: 'uuid' })
  asset_id: string;

  @Column({ type: 'uuid', nullable: true })
  asset_assignment_id?: string;

  @Column({ type: 'uuid' })
  recovered_by_employee_id: string;

  @Column({ type: 'date' })
  recovered_on: Date;

  @Column({ type: 'uuid', nullable: true })
  resulting_condition_id?: string;

  @Column({ type: 'boolean', default: false })
  charge_employee_for_damage: boolean;

  @Column({ type: 'text', nullable: true })
  additional_note?: string;

  @Column({ type: 'jsonb', nullable: true })
  image_attachment_refs?: any[];

  @Column({ type: 'jsonb', nullable: true })
  document_attachment_refs?: any[];

  @Column({ type: 'uuid', nullable: true })
  created_by?: string;

  @BeforeInsert()
  generateCode() {
    if (!this.asset_recovery_code) {
      this.asset_recovery_code = generatePrefixedCode('ASTREC');
    }
  }
}
