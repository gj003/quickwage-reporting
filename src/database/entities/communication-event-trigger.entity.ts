import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity('communication_event_triggers')
export class CommunicationEventTriggerEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  communication_event_trigger_id: string;

  @Column({ type: 'varchar', unique: true })
  event_trigger_code: string;

  @Column({ type: 'uuid' })
  organization_id: string;

  @Column({ type: 'uuid' })
  communication_event_category_id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'varchar' })
  trigger_type: string;

  @Column({ type: 'varchar' })
  event_key: string;

  @Column({ type: 'varchar' })
  source_module: string;

  @Column({ type: 'varchar', default: 'ACTIVE' })
  status: string;

  @Column({ type: 'boolean', default: false })
  is_system_defined: boolean;

  @Column({ type: 'uuid', nullable: true })
  last_modified_by?: string | null;

  @Column({ type: 'uuid', nullable: true })
  created_by?: string | null;

  @Column({ type: 'uuid', nullable: true })
  updated_by?: string | null;

  @BeforeInsert()
  assignCode() {
    if (!this.event_trigger_code)
      this.event_trigger_code = generatePrefixedCode('EVENT_TRIGGER');
  }
}
