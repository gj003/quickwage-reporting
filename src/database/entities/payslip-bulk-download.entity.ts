import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { generatePrefixedCode } from 'src/common/utility';
import { SharedEntity } from './shared.entity';
import { CompanyEntity } from './company.entity';

@Entity({ name: 'payslip_bulk_downloads' })
@Index('idx_payslip_bulk_downloads_company', ['company_id'])
export class PayslipBulkDownloadEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'payslip_bulk_download_id' })
  payslip_bulk_download_id: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  download_code: string;

  @Column({ type: 'uuid' }) company_id: string;
  @Column({ type: 'uuid' }) pay_group_id: string;
  @Column({ type: 'uuid', nullable: true }) requested_by?: string | null;

  @Column({ type: 'jsonb' }) employee_payslip_ids: string[];

  @Column({ type: 'varchar', length: 20, default: 'PENDING' }) status: string;
  @Column({ type: 'text', nullable: true }) file_url?: string | null;
  @Column({ type: 'timestamptz', nullable: true }) completed_at?: Date | null;

  @ManyToOne(() => CompanyEntity, (rel) => rel.id)
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @BeforeInsert()
  assignCode() {
    if (!this.download_code) {
      this.download_code = generatePrefixedCode('DL');
    }
  }
}
