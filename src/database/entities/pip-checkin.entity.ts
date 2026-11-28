// src/database/entities/pip-checkin.entity.ts

import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { PipEntity } from './pip.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity('pip_checkins')
@Index('idx_pip_checkins_pip', ['pipId'])
export class PipCheckinEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'pip_checkin_id' })
  pipCheckinId: string;

  @Column({ type: 'varchar', length: 30, name: 'checkin_code', unique: true })
  checkinCode: string;

  @Column({ type: 'uuid', name: 'pip_id' })
  pipId: string;

  @Column({ type: 'text', name: 'notes', nullable: true })
  notes?: string | null;

  @Column({ type: 'int', name: 'progress_percent', default: 0 })
  progressPercent: number;

  @Column({
    type: 'numeric',
    precision: 5,
    scale: 2,
    name: 'progress_delta_pct',
    nullable: true,
  })
  progressDeltaPct?: number | null;

  @Column({ type: 'date', name: 'meeting_date', nullable: true })
  meetingDate?: string | null;

  @Column({ type: 'text', name: 'next_actions', nullable: true })
  nextActions?: string | null;

  @Column({ type: 'uuid', name: 'created_by' })
  createdBy: string;

  @Column({ type: 'uuid', name: 'updated_by' })
  updatedBy: string;

  @ManyToOne(() => PipEntity, (pip) => pip.checkins, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pip_id' })
  pip: PipEntity;

  @BeforeInsert()
  assignCode(): void {
    if (!this.checkinCode) {
      this.checkinCode = generatePrefixedCode('PIC');
    }
  }
}
