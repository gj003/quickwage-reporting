import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';

@Entity({ name: 'post_exit_audit' })
@Index('idx_post_exit_audit_action', ['action'])
export class PostExitAuditEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'post_exit_audit_id' })
  postExitAuditId: string;

  @Column({ type: 'varchar', length: 100 })
  action: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    name: 'occurred_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  occurredAt: Date;
}
