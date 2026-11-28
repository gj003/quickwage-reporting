import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity({ name: 'helpdesk_canned_responses' })
@Index('idx_helpdesk_canned_responses_org', ['organizationId'])
export class HelpdeskCannedResponseEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'helpdesk_canned_response_id' })
  helpdeskCannedResponseId: string;

  @Column({ type: 'uuid', name: 'organization_id' })
  organizationId: string;

  @Column({ type: 'varchar', name: 'response_code', length: 30, unique: true })
  responseCode: string;

  @Column({ type: 'varchar', length: 120 })
  title: string;

  @Column({ type: 'text', name: 'response_body' })
  responseBody: string;

  @Column({ type: 'boolean', name: 'is_active', default: true })
  isActive: boolean;

  @BeforeInsert()
  assignCode(): void {
    if (!this.responseCode) {
      this.responseCode = generatePrefixedCode('HDCR');
    }
  }
}
