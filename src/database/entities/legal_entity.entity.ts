import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity('legal_entity')
@Index('idx_legal_entity_org_default', ['organization_id', 'is_default'])
@Index('idx_legal_entity_org_locked', ['organization_id', 'is_locked'])
@Index('uq_legal_entity_org_code', ['organization_id', 'legal_entity_code'], {
  unique: true,
})
@Index('idx_legal_entity_pan_number', ['pan_number'])
@Index('idx_legal_entity_gstin', ['gstin'])
@Index('idx_legal_entity_cin', ['cin'])
export class LegalEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly legal_entity_id: string;

  @Column({ type: 'varchar', length: 64 })
  organization_id: string;

  @Column({ type: 'varchar', length: 50 })
  legal_entity_code: string;

  @Column({ type: 'varchar', length: 255 })
  registered_company_name: string;

  @Column({ type: 'varchar', length: 100 })
  entity_type: string;

  @Column({ type: 'varchar', length: 3, default: 'INR' })
  currency: string;

  @Column({ type: 'varchar', length: 30, default: 'April-March' })
  financial_year: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  cin: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  pan_number: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  gstin: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  tan_number: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  msme_udyam_registration: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  epfo_establishment_number: string | null;

  @Column({ type: 'varchar', length: 255, default: 'Address not available' })
  registered_address_line_1: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  registered_address_line_2: string | null;

  @Column({ type: 'varchar', length: 120, default: 'Unknown' })
  registered_address_city: string;

  @Column({ type: 'varchar', length: 120, default: 'Unknown' })
  registered_address_state: string;

  @Column({ type: 'varchar', length: 120, default: 'Unknown' })
  registered_address_country: string;

  @Column({ type: 'varchar', length: 20, default: '000000' })
  registered_address_pin_code: string;

  @Column({ type: 'boolean', default: false })
  is_locked: boolean;

  @Column({ type: 'boolean', default: false })
  is_default: boolean;

  @Column({ type: 'varchar', length: 64 })
  created_by: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  updated_by: string | null;

  @BeforeInsert()
  assignCode(): void {
    if (!this.legal_entity_code) {
      this.legal_entity_code = generatePrefixedCode('LEGALENTITY');
    }
  }
}
