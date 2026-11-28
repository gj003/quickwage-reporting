import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';

@Entity({ name: 'employee_finance_declarations' })
@Index('idx_employee_finance_decl_employee_fy', [
  'organizationId',
  'employeeId',
  'financialYear',
])
@Index('idx_employee_finance_decl_section', ['sectionKey'])
export class EmployeeFinanceDeclarationEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'employee_finance_declaration_id' })
  employeeFinanceDeclarationId: string;

  @Column({ type: 'uuid', name: 'organization_id' })
  organizationId: string;

  @Column({ type: 'uuid', name: 'employee_id' })
  employeeId: string;

  @Column({ type: 'varchar', name: 'financial_year', length: 20 })
  financialYear: string;

  @Column({ type: 'varchar', name: 'section_key', length: 80 })
  sectionKey: string;

  @Column({ type: 'varchar', name: 'section', length: 80 })
  section: string;

  @Column({ type: 'varchar', name: 'category', length: 80 })
  category: string;

  @Column({ type: 'numeric', name: 'declared_amount', default: 0 })
  declaredAmount: number;

  @Column({ type: 'numeric', name: 'approved_amount', nullable: true })
  approvedAmount?: number | null;

  @Column({ type: 'jsonb', name: 'details', default: () => "'{}'::jsonb" })
  details: Record<string, any>;

  @Column({ type: 'varchar', name: 'status', default: 'DRAFT' })
  status: string;

  @Column({ type: 'varchar', name: 'tax_regime', nullable: true })
  taxRegime?: string | null;

  @Column({ type: 'jsonb', name: 'proofs', default: () => "'[]'::jsonb" })
  proofs: Array<Record<string, any>>;

  @Column({ type: 'uuid', name: 'reviewed_by_employee_id', nullable: true })
  reviewedByEmployeeId?: string | null;

  @Column({ type: 'text', name: 'review_note', nullable: true })
  reviewNote?: string | null;
}
