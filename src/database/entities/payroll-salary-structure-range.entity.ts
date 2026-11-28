import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity({ name: 'payroll_salary_structure_range' })
export class PayrollSalaryStructureRangeEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'payroll_salary_structure_range_id' })
  payroll_salary_structure_range_id: string;
  @Column({ type: 'uuid' }) organization_id: string;
  @Column({ type: 'uuid' }) payroll_salary_structure_id: string;
  @Column({ type: 'varchar', length: 120 }) range_name: string;
  @Column({ type: 'decimal', precision: 12, scale: 2 }) min_amount: string;
  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  max_amount?: string | null;
  @Column({ type: 'int' }) sequence_number: number;
  @Column({ type: 'varchar', length: 50, default: 'active' }) status: string;
  @Column({ type: 'uuid', nullable: true }) created_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) updated_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) deleted_by?: string | null;
  @CreateDateColumn({ type: 'timestamptz' }) readonly created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) readonly updated_at: Date;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  readonly deleted_at?: Date | null;
}
