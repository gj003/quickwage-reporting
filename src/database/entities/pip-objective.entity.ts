// src/database/entities/pip-objective.entity.ts

import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { PipEntity } from './pip.entity';
import { PipTaskEntity } from './pip-task.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity('pip_objectives')
@Index('idx_pip_objectives_pip', ['pipId'])
export class PipObjectiveEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'pip_objective_id' })
  pipObjectiveId: string;

  @Column({ type: 'varchar', length: 30, name: 'objective_code', unique: true })
  objectiveCode: string;

  @Column({ type: 'uuid', name: 'pip_id' })
  pipId: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({
    type: 'numeric',
    precision: 5,
    scale: 2,
    name: 'weight_pct',
    default: 0,
  })
  weightPct: number;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'objective_type',
    nullable: true,
  })
  objectiveType?: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  unit?: string | null;

  @Column({ type: 'date', name: 'deadline', nullable: true })
  deadline?: string | null;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    name: 'target_value',
    nullable: true,
  })
  targetValue?: number | null;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    name: 'baseline_value',
    nullable: true,
  })
  baselineValue?: number | null;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    name: 'current_value',
    nullable: true,
  })
  currentValue?: number | null;

  @Column({ type: 'varchar', length: 30, default: 'NOT_STARTED' })
  status: string;

  @Column({ type: 'uuid', name: 'created_by' })
  createdBy: string;

  @Column({ type: 'uuid', name: 'updated_by' })
  updatedBy: string;

  @ManyToOne(() => PipEntity, (pip) => pip.objectives, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pip_id' })
  pip: PipEntity;

  @OneToMany(() => PipTaskEntity, (task) => task.objective)
  tasks?: PipTaskEntity[];

  @BeforeInsert()
  assignCode(): void {
    if (!this.objectiveCode) {
      this.objectiveCode = generatePrefixedCode('PIO');
    }
  }
}
