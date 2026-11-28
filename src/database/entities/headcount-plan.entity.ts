import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('headcount_plans')
export class HeadcountPlanEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int', nullable: true })
  business_unit_id: number;

  @Column({ type: 'date' })
  start_date: string;

  @Column({ type: 'date' })
  end_date: string;

  @Column({ type: 'uuid', nullable: true })
  created_by: string;
}
