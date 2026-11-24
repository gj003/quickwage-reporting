// src/database/entities/pip-risk-signal.entity.ts

import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { PipEntity } from './pip.entity';

@Entity('pip_risk_signals')
@Index('idx_pip_risk_signals_pip', ['pipId'])
@Index('idx_pip_risk_signals_active', ['active'])
export class PipRiskSignalEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'pip_risk_signal_id' })
  pipRiskSignalId: string;

  @Column({ type: 'uuid', name: 'pip_id' })
  pipId: string;

  @Column({ type: 'varchar', length: 50, name: 'risk_type' })
  riskType: string;

  @Column({
    type: 'numeric',
    precision: 5,
    scale: 2,
    name: 'risk_score',
  })
  riskScore: number;

  @Column({ type: 'jsonb', nullable: true })
  factors?: Record<string, unknown> | null;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column({ type: 'uuid', name: 'created_by' })
  createdBy: string;

  @Column({ type: 'uuid', name: 'updated_by' })
  updatedBy: string;

  @ManyToOne(() => PipEntity, (pip) => pip.riskSignals, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pip_id' })
  pip: PipEntity;
}
