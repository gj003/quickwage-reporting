import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { generatePrefixedCode } from 'src/common/utility';
import { SharedEntity } from './shared.entity';

@Entity({ name: 'payroll_salary_component_claim' })
export class SalaryComponentClaimEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'salary_component_claim_id' })
  salary_component_claim_id: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  salary_component_claim_code: string;

  @Column({ type: 'uuid' }) organization_id: string;
  @Column({ type: 'uuid' }) employee_id: string;
  @Column({ type: 'uuid' }) payroll_salary_component_id: string;
  @Column({ type: 'uuid', nullable: true }) payroll_pay_group_id?:
    string | null;
  @Column({ type: 'numeric' }) claim_amount: number;
  @Column({ type: 'numeric', nullable: true }) approved_amount?: number | null;
  @Column({ type: 'varchar', length: 40, default: 'PENDING' }) status: string;
  @Column({ type: 'date' }) claim_date: string;
  @Column({ type: 'date', nullable: true }) run_start_date?: string | null;
  @Column({ type: 'date', nullable: true }) run_end_date?: string | null;
  @Column({ type: 'uuid', nullable: true }) reviewed_by?: string | null;
  @Column({ type: 'timestamptz', nullable: true }) reviewed_at?: Date | null;
  @Column({ type: 'varchar', length: 1000, nullable: true })
  review_comment?: string | null;
  @Column({ type: 'varchar', length: 500, nullable: true })
  attachment_url?: string | null;
  @Column({ type: 'varchar', length: 1000, nullable: true }) comment?:
    string | null;
  @Column({ type: 'uuid', nullable: true }) created_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) updated_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) deleted_by?: string | null;

  @BeforeInsert()
  assignCode() {
    if (!this.salary_component_claim_code) {
      this.salary_component_claim_code = generatePrefixedCode('SCC');
    }
  }
}
