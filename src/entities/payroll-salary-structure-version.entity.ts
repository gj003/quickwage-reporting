import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity({ name: 'payroll_salary_structure_version' })
export class PayrollSalaryStructureVersionEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'payroll_salary_structure_version_id',
  })
  payroll_salary_structure_version_id: string;
  @Column({ type: 'uuid' }) organization_id: string;
  @Column({ type: 'uuid' }) payroll_salary_structure_id: string;
  @Column({ type: 'int' }) version_number: number;
  @Column({ type: 'text', nullable: true }) snapshot_json?: string | null;
  @CreateDateColumn({ type: 'timestamptz' }) readonly created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) readonly updated_at: Date;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  readonly deleted_at?: Date | null;
}
