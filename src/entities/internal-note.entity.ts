import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity({ name: 'internal_notes' })
@Index('idx_internal_note_company_employee', ['companyId', 'employeeId'])
export class InternalNoteEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'internal_note_id' })
  internalNoteId: string;

  @Column({ type: 'varchar', name: 'internal_note_code', unique: true })
  internalNoteCode: string;

  @Column({ type: 'uuid', name: 'company_id' })
  companyId: string;

  @Column({ type: 'uuid', name: 'author_employee_id' })
  authorEmployeeId: string;

  @Column({ type: 'uuid', name: 'employee_id' })
  employeeId: string;

  @Column({ type: 'text' })
  note: string;

  @BeforeInsert()
  assignInternalNoteCode(): void {
    if (!this.internalNoteCode) {
      this.internalNoteCode = generatePrefixedCode('INOTE');
    }
  }
}
