import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { CompanyEntity } from './company.entity';
import { LegalEntity } from './legal_entity.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity('legal_entity_signatory')
@Index('idx_legal_signatory_company_entity', ['company_id', 'legal_entity_id'])
@Index('uq_legal_signatory_company_code', ['company_id', 'signatory_code'], {
  unique: true,
})
export class LegalEntitySignatory extends SharedEntity {
  @PrimaryGeneratedColumn('uuid') readonly legal_entity_signatory_id: string;
  @Column({ type: 'uuid' }) company_id: string;
  @ManyToOne(() => CompanyEntity, { nullable: false })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;
  @Column({ type: 'uuid' }) legal_entity_id: string;
  @ManyToOne(() => LegalEntity, { nullable: false })
  @JoinColumn({ name: 'legal_entity_id' })
  legal_entity: LegalEntity;
  @Column({ type: 'varchar', length: 50 }) signatory_code: string;
  @Column({ type: 'varchar', length: 255 }) signatory_name: string;
  @Column({ type: 'varchar', length: 255 }) designation: string;
  @Column({ type: 'varchar', length: 254 }) email: string;
  @Column({ type: 'varchar', length: 255 }) father_name: string;
  @Column({ type: 'varchar', length: 255, nullable: true }) address_line_1?:
    string | null;
  @Column({ type: 'varchar', length: 255, nullable: true }) address_line_2?:
    string | null;
  @Column({ type: 'varchar', length: 120, nullable: true }) city?:
    string | null;
  @Column({ type: 'varchar', length: 120, nullable: true }) state?:
    string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) zip_code?:
    string | null;
  @Column({ type: 'varchar', length: 120, nullable: true }) country?:
    string | null;
  @Column({ type: 'uuid' }) created_by: string;
  @Column({ type: 'uuid', nullable: true }) updated_by?: string | null;
  @BeforeInsert() assignCode() {
    if (!this.signatory_code)
      this.signatory_code = generatePrefixedCode('SIGNATORY');
  }
}
