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
import { OneOnOneMeetingEntity } from './one-on-one-meeting.entity';
import { UserEntity } from './user.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity({ name: 'o3_employee_inputs' })
@Index('idx_o3_employee_inputs_meeting', ['oneOnOneId'])
@Index('idx_o3_employee_inputs_employee', ['employeeId'])
export class O3EmployeeInputEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'o3_employee_input_id' })
  o3EmployeeInputId: string;

  @Column({ type: 'varchar', length: 30, name: 'input_code', unique: true })
  inputCode: string;

  @Column({ type: 'uuid', name: 'one_on_one_id' })
  oneOnOneId: string;

  @Column({ type: 'uuid', name: 'employee_id' })
  employeeId: string;

  @Column({ type: 'text' })
  text: string;

  @ManyToOne(() => OneOnOneMeetingEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'one_on_one_id' })
  meeting?: OneOnOneMeetingEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employee_id' })
  employee?: UserEntity;

  @BeforeInsert()
  assignCode(): void {
    if (!this.inputCode) {
      // 10 digits — see the note on OneOnOneMeetingEntity.assignBadgeCode.
      // `input_code` is UNIQUE and varchar(30); 'O3IN_' + 10 digits fits.
      this.inputCode = generatePrefixedCode('O3IN', 10);
    }
  }
}
