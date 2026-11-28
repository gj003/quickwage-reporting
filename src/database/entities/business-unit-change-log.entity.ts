import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('business_unit_change_log')
@Index('idx_business_unit_change_company', ['company_id'])
@Index('idx_business_unit_change_unit', ['business_unit_id'])
export class BusinessUnitChangeLog extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly business_unit_change_log_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'integer' })
  business_unit_id: number;

  @Column({ type: 'varchar', length: 120 })
  field_name: string;

  @Column({ type: 'text', nullable: true })
  old_value: string | null;

  @Column({ type: 'text', nullable: true })
  new_value: string | null;

  @Column({ type: 'varchar', length: 40 })
  change_type: string;

  @Column({ type: 'uuid' })
  changed_by: string;

  @Column({ type: 'text', nullable: true })
  change_note: string | null;
}
