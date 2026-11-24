import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity('communication_event_actions')
export class CommunicationEventActionEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  communication_event_action_id: string;

  @Column({ type: 'varchar', unique: true })
  action_code: string;

  @Column({ type: 'uuid' })
  organization_id: string;

  @Column({ type: 'uuid' })
  communication_event_trigger_id: string;

  @Column({ type: 'uuid', nullable: true })
  conditional_criteria_id?: string | null;

  @Column({ type: 'varchar' })
  action_type: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', default: 'ACTIVE' })
  status: string;

  @Column({ type: 'int', default: 0 })
  sort_order: number;

  @Column({ type: 'jsonb', nullable: true })
  config?: Record<string, any> | null;

  @Column({ type: 'uuid', nullable: true })
  created_by?: string | null;

  @Column({ type: 'uuid', nullable: true })
  updated_by?: string | null;

  @BeforeInsert()
  assignCode() {
    if (!this.action_code)
      this.action_code = generatePrefixedCode('EVENT_ACTION');
  }
}
