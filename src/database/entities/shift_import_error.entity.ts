import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('shift_import_errors')
@Index('idx_shift_import_error_batch', ['shift_import_batch_id'])
export class ShiftImportErrorEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  shift_import_error_id: string;

  @Column({ type: 'uuid' })
  shift_import_batch_id: string;

  @Column({ type: 'int' })
  row_number: number;

  @Column({ type: 'varchar', length: 500 })
  error: string;

  @Column({ type: 'jsonb', nullable: true })
  payload?: Record<string, any> | null;
}
