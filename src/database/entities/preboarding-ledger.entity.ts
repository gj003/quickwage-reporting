import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { PreboardingEntity } from './preboarding.entity';
import { UserEntity } from './user.entity';
import { PreboardingStatus } from 'src/common/enum';

@Index('idx_preboarding_ledger_preboarding_created', [
  'preboarding_id',
  'created_at',
])
@Entity({ name: 'preboarding_ledger' })
export class PreboardingLedgerEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'preboarding_ledger_id' })
  preboarding_ledger_id: string;

  @Column({ type: 'uuid' })
  preboarding_id: string;

  @ManyToOne(
    () => PreboardingEntity,
    (preboarding) => preboarding.ledger_entries,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({
    name: 'preboarding_id',
    referencedColumnName: 'preboarding_id',
  })
  preboarding: PreboardingEntity;

  @Column({ type: 'varchar', length: 30 })
  status: PreboardingStatus;

  @Column({ type: 'uuid' })
  updated_by: string;

  @ManyToOne(() => UserEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'updated_by', referencedColumnName: 'user_id' })
  updated_by_user: UserEntity;

  @Column({ type: 'text', nullable: true })
  remark?: string | null;
}
