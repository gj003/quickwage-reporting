import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity('communication_email_templates')
export class CommunicationEmailTemplateEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  communication_email_template_id: string;

  @Column({ type: 'varchar', unique: true })
  email_template_code: string;

  @Column({ type: 'uuid', nullable: true })
  organization_id?: string | null;

  @Column({ type: 'varchar' })
  template_key: string;

  @Column({ type: 'varchar' })
  template_name: string;

  @Column({ type: 'text' })
  subject_template: string;

  @Column({ type: 'text' })
  message_template: string;

  @Column({ type: 'varchar' })
  module: string;

  @Column({ type: 'varchar', nullable: true })
  event_key?: string | null;

  @Column({ type: 'varchar' })
  template_type: string;

  @Column({ type: 'jsonb', default: () => "'[]'::jsonb" })
  supported_placeholders: string[];

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'uuid', nullable: true })
  created_by?: string | null;

  @Column({ type: 'uuid', nullable: true })
  updated_by?: string | null;

  @BeforeInsert()
  assignCode() {
    if (!this.email_template_code)
      this.email_template_code = generatePrefixedCode('EMAIL_TEMPLATE');
  }
}
