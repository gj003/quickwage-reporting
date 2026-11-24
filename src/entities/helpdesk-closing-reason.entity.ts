import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity({ name: 'helpdesk_closing_reasons' })
@Index('idx_helpdesk_closing_reasons_org', ['organizationId'])
export class HelpdeskClosingReasonEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'helpdesk_closing_reason_id' })
  helpdeskClosingReasonId: string;

  @Column({ type: 'uuid', name: 'organization_id' })
  organizationId: string;

  @Column({
    type: 'varchar',
    name: 'closing_reason_code',
    length: 30,
    unique: true,
  })
  closingReasonCode: string;

  @Column({ type: 'varchar', length: 120 })
  reason: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'boolean', name: 'is_active', default: true })
  isActive: boolean;

  @BeforeInsert()
  assignCode(): void {
    if (!this.closingReasonCode) {
      this.closingReasonCode = generatePrefixedCode('HDCLS');
    }
  }
}
