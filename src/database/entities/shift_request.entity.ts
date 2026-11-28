import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity('shift_requests')
@Index('idx_shift_request_org_status', ['organization_id', 'status'])
export class ShiftRequestEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  shift_request_id: string;

  @Column({ type: 'uuid' })
  organization_id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  shift_request_code: string;

  @Column({ type: 'uuid' })
  employee_id: string;

  @Column({ type: 'uuid', nullable: true })
  approver_id?: string | null;

  @Column({ type: 'uuid', nullable: true })
  shift_assignment_id?: string | null;

  @Column({ type: 'varchar', length: 40, default: 'PENDING' })
  status: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  reason?: string | null;

  @Column({ type: 'jsonb', nullable: true })
  requested_changes?: Record<string, any> | null;

  @BeforeInsert()
  assignCode(): void {
    if (!this.shift_request_code) {
      this.shift_request_code = generatePrefixedCode('SHIFT_REQUEST');
    }
  }
}
