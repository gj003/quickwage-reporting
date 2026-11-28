// src/database/entities/pip-task.entity.ts

import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { PipObjectiveEntity } from './pip-objective.entity';

@Entity('pip_tasks')
@Index('idx_pip_tasks_objective', ['pipObjectiveId'])
@Index('idx_pip_tasks_status', ['status'])
export class PipTaskEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'pip_task_id' })
  pipTaskId: string;

  @Column({ type: 'uuid', name: 'pip_objective_id' })
  pipObjectiveId: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  notes?: string | null;

  @Column({ type: 'varchar', length: 50, default: 'OPEN' })
  status: string;

  @Column({ type: 'date', name: 'due_date', nullable: true })
  dueDate?: string | null;

  @Column({ type: 'uuid', name: 'owner_employee_id', nullable: true })
  ownerEmployeeId?: string | null;

  @Column({ type: 'uuid', name: 'created_by' })
  createdBy: string;

  @Column({ type: 'uuid', name: 'updated_by' })
  updatedBy: string;

  @ManyToOne(() => PipObjectiveEntity, (objective) => objective.tasks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'pip_objective_id' })
  objective: PipObjectiveEntity;
}
