import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { UserEntity } from './user.entity';
import { ContractWorkerType } from 'src/common/enum';

@Entity('contract_workers')
export class ContractWorkerEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  worker_type: ContractWorkerType; // VENDOR | FREELANCE | CONSULTANT | RETAINER

  @Column({ type: 'date', nullable: true })
  contract_start_date?: string;

  @Column({ type: 'date', nullable: true })
  contract_end_date?: string;

  @Column({ type: 'varchar', nullable: true })
  project_mapping?: string;

  @Column({ type: 'text', nullable: true })
  remark?: string;

  // store linking document IDs (documents.id)
  @Column({ type: 'int', array: true, nullable: true })
  document_ids?: number[];

  @Column({ type: 'uuid', unique: true })
  user_id: string;

  @OneToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}

export default ContractWorkerEntity;
