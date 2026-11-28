import {
  BeforeInsert,
  Column,
  Entity,
  Generated,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';
import { PostExitCommEntity } from './post-exit-comm.entity';
import { CompanyEntity } from './company.entity';

@Entity({ name: 'post_exit_activity_log' })
@Index('idx_post_exit_activity_event_occurred', ['event', 'occurredAt'])
@Index('uq_post_exit_activity_code', ['activityCode'], { unique: true })
export class PostExitActivityLogEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', {
    name: 'post_exit_activity_log_id',
  })
  postExitActivityLogId: string;

  @Column({ name: 'auto_inc', type: 'int' })
  @Generated('increment')
  autoInc: number;

  @Column({ name: 'activity_code', type: 'varchar', unique: true })
  activityCode: string;

  @Column({ name: 'company_id', type: 'uuid' })
  companyId: string;

  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;

  @Column({ type: 'varchar', length: 100 })
  event: string;

  @Column({ name: 'comm_id', type: 'uuid', nullable: true })
  commId?: string | null;

  @ManyToOne(() => PostExitCommEntity, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'comm_id', referencedColumnName: 'postExitCommId' })
  comm?: PostExitCommEntity | null;

  @Column({ name: 'details_json', type: 'text' })
  detailsJson: string;

  @Column({
    name: 'occurred_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  occurredAt: Date;

  @BeforeInsert()
  assignActivityCode(): void {
    if (!this.activityCode) {
      this.activityCode = generatePrefixedCode('PXCLOG');
    }
  }
}
