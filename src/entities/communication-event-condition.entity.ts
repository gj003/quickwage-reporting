import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity('communication_event_conditions')
export class CommunicationEventConditionEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  communication_event_condition_id: string;

  @Column({ type: 'varchar', unique: true })
  condition_code: string;

  @Column({ type: 'uuid' })
  organization_id: string;

  @Column({ type: 'uuid' })
  communication_event_trigger_id: string;

  @Column({ type: 'varchar', nullable: true })
  name?: string | null;

  @Column({ type: 'jsonb' })
  condition_expression: Array<Record<string, any>>;

  @Column({ type: 'varchar', default: 'ACTIVE' })
  status: string;

  @Column({ type: 'uuid', nullable: true })
  created_by?: string | null;

  @Column({ type: 'uuid', nullable: true })
  updated_by?: string | null;

  @BeforeInsert()
  assignCode() {
    if (!this.condition_code)
      this.condition_code = generatePrefixedCode('CONDITION');
  }
}
