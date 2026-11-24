import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { generatePrefixedCode } from 'src/common/utility';
import { ShiftType } from 'src/common/enum';

@Entity('shift_templates')
@Index('idx_shift_template_company_name', ['company_id', 'name'], {
  unique: true,
})
export class ShiftEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  shift_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  shift_code: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 50, default: ShiftType.DAY })
  shift_type: string;

  @Column({ type: 'varchar', length: 5 })
  start_time: string;

  @Column({ type: 'varchar', length: 5 })
  end_time: string;

  @Column({ type: 'int', default: 0 })
  grace_period_minutes: number;

  @Column({ type: 'int', default: 0 })
  break_minutes: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  weekly_off_pattern?: string | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description?: string | null;

  @Column({ type: 'varchar', length: 7, nullable: true })
  color_hex?: string | null;

  @Column({ type: 'boolean', default: false })
  is_default: boolean;

  @Column({ type: 'int', nullable: true })
  capacity?: number | null;

  @Column({ type: 'varchar', length: 40, default: 'ACTIVE' })
  status: string;

  @BeforeInsert()
  assignCode(): void {
    if (!this.shift_code) {
      this.shift_code = generatePrefixedCode('SHIFT');
    }
  }
}
