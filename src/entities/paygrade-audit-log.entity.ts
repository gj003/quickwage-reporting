import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { PayGradeEntity } from './paygrade.entity';

@Entity('paygrade_audit_logs')
export class PayGradeAuditLogEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  paygrade_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'varchar', length: 20 })
  action: 'created' | 'updated';

  @Column({ type: 'jsonb', nullable: true })
  changes?: Record<string, unknown>;

  @Column({ type: 'uuid', nullable: true })
  performed_by_user_id?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  performed_by_name?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  performed_by_role?: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  performed_at: Date;

  @ManyToOne(() => PayGradeEntity, (paygrade) => paygrade.auditLogs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'paygrade_id' })
  paygrade: PayGradeEntity;
}
