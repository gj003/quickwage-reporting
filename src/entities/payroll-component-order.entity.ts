import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'payroll_component_order' })
export class PayrollComponentOrderEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'payroll_component_order_id' })
  payroll_component_order_id: string;
  @Column({ type: 'uuid' }) organization_id: string;
  @Column({ type: 'uuid' }) payroll_pay_group_id: string;
  @Column({ type: 'varchar', length: 30 }) component_category: string;
  @Column({ type: 'uuid' }) payroll_salary_component_id: string;
  @Column({ type: 'int' }) sequence_number: number;
  @Column({ type: 'varchar', length: 20 }) component_frequency: string;
  @Column({ type: 'uuid', nullable: true }) created_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) updated_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) deleted_by?: string | null;
  @CreateDateColumn({ type: 'timestamptz' }) readonly created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) readonly updated_at: Date;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  readonly deleted_at?: Date | null;
}
