import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity({ name: 'payroll_pay_register_field_setting' })
export class PayrollPayRegisterFieldSettingEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'payroll_pay_register_field_setting_id',
  })
  payroll_pay_register_field_setting_id: string;
  @Column({ type: 'uuid' }) organization_id: string;
  @Column({ type: 'uuid' }) payroll_pay_group_id: string;
  @Column({ type: 'varchar', length: 100 }) field_key: string;
  @Column({ type: 'varchar', length: 150 }) field_label: string;
  @Column({ type: 'varchar', length: 100 }) section_name: string;
  @Column({ type: 'boolean', default: true }) is_selected: boolean;
  @Column({ type: 'boolean', default: false }) is_pinned: boolean;
  @Column({ type: 'int', default: 0 }) sequence_number: number;
  @Column({ type: 'varchar', length: 50, default: 'active' }) status: string;
  @Column({ type: 'uuid', nullable: true }) created_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) updated_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) deleted_by?: string | null;
  @CreateDateColumn({ type: 'timestamptz' }) readonly created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) readonly updated_at: Date;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  readonly deleted_at?: Date | null;
}
