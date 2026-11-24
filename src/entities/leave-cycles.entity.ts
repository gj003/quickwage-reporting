// src/database/entities/leave-cycles.entities.ts

import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { LeavePlanCalendarType } from 'src/common/enum';
import { EmployeeLeaveLedgerEntity } from './employee-leave-ledger.entity';
import { EmployeeLeaveBalanceEntity } from './employee-leave-balance.entity';

@Entity('leave_cycles')
@Unique(['calendar_type', 'period_key'])
export class LeaveCycleEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  leave_cycle_id: string;

  @Column({
    type: 'varchar',
    length: 30,
  })
  calendar_type: LeavePlanCalendarType;

  /**
   * 2026
   * 2026-2027
   */
  @Column({
    type: 'varchar',
    length: 30,
  })
  period_key: string;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date' })
  end_date: Date;

  @Column({ type: 'boolean', default: false })
  is_closed: boolean;

  // =====================================================
  // RELATIONS
  // =====================================================

  @OneToMany(() => EmployeeLeaveLedgerEntity, (ledger) => ledger.leaveCycle)
  ledgers: EmployeeLeaveLedgerEntity[];

  latestLedger: EmployeeLeaveLedgerEntity;

  @OneToMany(() => EmployeeLeaveBalanceEntity, (balance) => balance.leaveCycle)
  balances: EmployeeLeaveBalanceEntity[];
}
