import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'payroll_statutory_filing_detail' })
export class PayrollStatutoryFilingDetailEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'payroll_statutory_filing_detail_id',
  })
  payroll_statutory_filing_detail_id: string;
  @Column({ type: 'uuid' }) organization_id: string;
  @Column({ type: 'uuid' }) payroll_pay_group_id: string;
  @Column({ type: 'varchar', length: 20 }) filing_type: string;
  @Column({ type: 'varchar', length: 255, nullable: true }) name?:
    string | null;
  @Column({ type: 'varchar', length: 50, nullable: true }) pan?: string | null;
  @Column({ type: 'varchar', length: 50, nullable: true }) tan?: string | null;
  @Column({ type: 'varchar', length: 100, nullable: true }) tan_circle_number?:
    string | null;
  @Column({ type: 'varchar', length: 100, nullable: true }) tds_location?:
    string | null;
  @Column({ type: 'varchar', length: 100, nullable: true })
  registration_number?: string | null;
  @Column({ type: 'varchar', length: 100, nullable: true }) establishment_id?:
    string | null;
  @Column({ type: 'date', nullable: true }) registration_date?: string | null;
  @Column({ type: 'varchar', length: 64, nullable: true }) state_id?:
    string | null;
  @Column({ type: 'varchar', length: 120, nullable: true }) location_name?:
    string | null;
  @Column({ type: 'uuid', nullable: true }) signatory_employee_id?:
    string | null;
  @Column({ type: 'varchar', length: 50, default: 'active' }) status: string;
  @Column({ type: 'uuid', nullable: true }) created_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) updated_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) deleted_by?: string | null;
  @CreateDateColumn({ type: 'timestamptz' }) readonly created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) readonly updated_at: Date;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  readonly deleted_at?: Date | null;
}
