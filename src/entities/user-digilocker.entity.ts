// src/database/entities/user-digilocker.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  Unique,
  OneToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { DigilockerTransactionStatus } from 'src/common/enum';
import { SharedEntity } from './shared.entity';

@Entity('user_digilocker')
@Unique(['user_id'])
export class UserDigilockerEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({
    unique: true,
    type: 'varchar',
    length: 100,
    comment: 'DigiLocker Transaction ID',
  })
  transaction_id: string;

  @Column({
    comment: 'KYC URL provided by DigiLocker',
    type: 'varchar',
    length: 1200,
  })
  kyc_url: string;

  @Column({
    type: 'varchar',
    default: DigilockerTransactionStatus.PENDING,
  })
  status: DigilockerTransactionStatus;

  // relations
  @OneToOne(() => UserEntity, (user) => user.user_id)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
