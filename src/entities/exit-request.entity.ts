import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';
import { UserEntity } from './user.entity';
import { DepartmentEntity } from './department.entity';

@Entity({ name: 'exit_request' })
@Index('uq_exit_request_code', ['exitRequestCode'], { unique: true })
@Index('idx_exit_request_employee', ['employeeId'])
export class ExitRequestEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'exit_request_id' })
  exitRequestId: string;

  @Column({ name: 'exit_request_code', type: 'varchar', unique: true })
  exitRequestCode: string;

  @Column({ name: 'employee_id', type: 'uuid' })
  employeeId: string;

  @Column({ name: 'department_id', type: 'int' })
  departmentId: number;

  @Column({ type: 'varchar', length: 255 })
  designation: string;

  @Column({ name: 'resignation_date', type: 'date' })
  resignationDate: string;

  @Column({ name: 'notice_start_date', type: 'date' })
  noticeStartDate: string;

  @Column({ name: 'last_working_day', type: 'date' })
  lastWorkingDay: string;

  @Column({ type: 'varchar', length: 30 })
  status: string;

  @Column({ name: 'exit_reason', type: 'varchar', length: 255 })
  exitReason: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'employee_id', referencedColumnName: 'user_id' })
  employee: UserEntity;

  @ManyToOne(() => DepartmentEntity)
  @JoinColumn({ name: 'department_id', referencedColumnName: 'id' })
  department: DepartmentEntity;

  @BeforeInsert()
  assignExitRequestCode(): void {
    if (!this.exitRequestCode) {
      this.exitRequestCode = generatePrefixedCode('EXITREQ');
    }
  }
}
