import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { ExitRequestEntity } from './exit-request.entity';

@Entity({ name: 'exit_clearance_task' })
@Index('idx_exit_clearance_request', ['exitRequestId'])
export class ExitClearanceTaskEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'exit_clearance_task_id' })
  exitClearanceTaskId: string;

  @Column({ name: 'exit_request_id', type: 'uuid' })
  exitRequestId: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ name: 'assigned_to_role', type: 'varchar', length: 50 })
  assignedToRole: string;

  @Column({ name: 'due_date', type: 'date' })
  dueDate: string;

  @Column({ type: 'varchar', length: 30 })
  status: string;

  @Column({ type: 'text', nullable: true })
  notes?: string | null;

  @ManyToOne(() => ExitRequestEntity)
  @JoinColumn({
    name: 'exit_request_id',
    referencedColumnName: 'exitRequestId',
  })
  exitRequest: ExitRequestEntity;
}
