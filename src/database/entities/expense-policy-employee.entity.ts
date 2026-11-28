import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('expense_policy_employees')
export class ExpensePolicyEmployeeEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  expense_policy_employee_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  expense_policy_id: string;

  @Column({ type: 'uuid' })
  employee_id: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;
}
