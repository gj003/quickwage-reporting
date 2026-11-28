import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';
import { ShiftBoardEntity } from './shift_board.entity';

@Entity('shift_board_managers')
export class ShiftBoardManagerEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  shift_board_manager_id: string;

  @Column({ type: 'uuid' })
  organization_id: string;

  @Column({ type: 'uuid' })
  shift_board_id: string;

  @Column({ type: 'uuid' })
  employee_id: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  assigned_at: Date;

  @ManyToOne(() => ShiftBoardEntity, (board) => board.managers)
  shift_board?: ShiftBoardEntity;
}
