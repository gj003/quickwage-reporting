import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity('communication_email_actions')
export class CommunicationEmailActionEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  communication_email_action_id: string;

  @Column({ type: 'varchar', unique: true })
  email_action_code: string;

  @Column({ type: 'uuid' })
  organization_id: string;

  @Column({ type: 'uuid' })
  communication_event_action_id: string;

  @Column({ type: 'varchar', nullable: true })
  from_email_alias?: string | null;

  @Column({ type: 'text' })
  subject_template: string;

  @Column({ type: 'text' })
  message_template: string;

  @Column({ type: 'varchar', nullable: true })
  default_template_name?: string | null;

  @Column({ type: 'varchar' })
  template_mode: string;

  @Column({ type: 'jsonb' })
  send_to: Array<Record<string, any>>;

  @Column({ type: 'jsonb', default: () => "'[]'::jsonb" })
  send_cc: Array<Record<string, any>>;

  @Column({ type: 'jsonb', default: () => "'[]'::jsonb" })
  send_bcc: Array<Record<string, any>>;

  @Column({ type: 'boolean', default: false })
  show_cc_bcc: boolean;

  @Column({ type: 'uuid', nullable: true })
  created_by?: string | null;

  @Column({ type: 'uuid', nullable: true })
  updated_by?: string | null;

  @BeforeInsert()
  assignCode() {
    if (!this.email_action_code)
      this.email_action_code = generatePrefixedCode('EMAIL_ACTION');
  }
}
