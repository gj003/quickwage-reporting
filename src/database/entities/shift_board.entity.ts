import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { generatePrefixedCode } from 'src/common/utility';
import { ShiftBoardManagerEntity } from './shift_board_manager.entity';

@Entity('shift_boards')
@Index('idx_shift_board_company_name', ['company_id', 'name'], {
  unique: true,
})
export class ShiftBoardEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  shift_board_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  shift_board_code: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description?: string | null;

  @Column({ type: 'uuid', nullable: true })
  shift_id?: string | null;

  @Column({ type: 'jsonb', nullable: true })
  rules_json?: Record<string, any> | null;

  @Column({
    type: 'varchar',
    length: 40,
    default: 'DRAFT',
  })
  status: string;

  @Column({ type: 'timestamptz', nullable: true })
  last_published_at?: Date | null;

  @Column({ type: 'uuid', nullable: true })
  last_published_by?: string | null;

  @OneToMany(() => ShiftBoardManagerEntity, (manager) => manager.shift_board, {
    cascade: true,
  })
  managers?: ShiftBoardManagerEntity[];

  @BeforeInsert()
  assignCode(): void {
    if (!this.shift_board_code) {
      this.shift_board_code = generatePrefixedCode('SHIFT_BOARD');
    }
  }
}
