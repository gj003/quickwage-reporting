import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity('communication_email_digests')
export class CommunicationEmailDigestEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  communication_email_digest_id: string;

  @Column({ type: 'varchar', unique: true })
  email_digest_code: string;

  @Column({ type: 'uuid' })
  organization_id: string;

  @Column({ type: 'varchar' })
  digest_name: string;

  @Column({ type: 'varchar' })
  module: string;

  @Column({ type: 'varchar' })
  frequency: string;

  @Column({ type: 'jsonb' })
  recipients: Array<Record<string, any>>;

  @Column({ type: 'uuid', nullable: true })
  template_id?: string | null;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'uuid', nullable: true })
  created_by?: string | null;

  @Column({ type: 'uuid', nullable: true })
  updated_by?: string | null;

  @BeforeInsert()
  assignCode() {
    if (!this.email_digest_code)
      this.email_digest_code = generatePrefixedCode('EMAIL_DIGEST');
  }
}
