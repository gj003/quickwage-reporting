import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity({ name: 'payroll_professional_tax_setting' })
export class PayrollProfessionalTaxSettingEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'payroll_professional_tax_setting_id',
  })
  payroll_professional_tax_setting_id: string;
  @Column({ type: 'uuid' }) organization_id: string;
  @Column({ type: 'uuid' }) payroll_pay_group_id: string;
  @Column({ type: 'boolean', default: true }) is_enabled: boolean;
  @Column({ type: 'varchar', length: 64, nullable: true }) state_id?:
    string | null;
  @Column({ type: 'varchar', length: 120, nullable: true }) state_name?:
    string | null;
  @Column({ type: 'varchar', length: 120, nullable: true }) location_name?:
    string | null;
  @Column({ type: 'varchar', length: 50, default: 'active' }) status: string;
  @CreateDateColumn({ type: 'timestamptz' }) readonly created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) readonly updated_at: Date;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  readonly deleted_at?: Date | null;
}
