import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'payroll_professional_tax_state_detail' })
export class PayrollProfessionalTaxStateDetailEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'payroll_professional_tax_state_detail_id',
  })
  payroll_professional_tax_state_detail_id: string;
  @Column({ type: 'uuid' }) organization_id: string;
  @Column({ type: 'uuid' }) payroll_pay_group_id: string;
  @Column({ type: 'varchar', length: 64 }) state_id: string;
  @Column({ type: 'varchar', length: 120 }) state_name: string;
  @Column({ type: 'varchar', length: 120 }) location_name: string;
  @Column({ type: 'varchar', length: 120 }) establishment_id: string;
  @Column({ type: 'date' }) registration_date: string;
  @Column({ type: 'uuid', nullable: true }) signatory_employee_id?:
    string | null;
  @Column({ type: 'jsonb', default: () => "'[]'" })
  linked_location_ids: string[];
  @Column({ type: 'varchar', length: 50, default: 'active' }) status: string;
  @Column({ type: 'uuid', nullable: true }) created_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) updated_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) deleted_by?: string | null;
  @CreateDateColumn({ type: 'timestamptz' }) readonly created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) readonly updated_at: Date;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  readonly deleted_at?: Date | null;
}
