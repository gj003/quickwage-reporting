import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { SharedEntity } from './shared.entity';
import { VerificationType } from 'src/common/enum';

@Entity('user_verified_data')
export class VerifiedDataEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  user_id: string;

  @Column({
    type: 'varchar',
  })
  verification_type: VerificationType;

  @Column({
    type: 'varchar',
    nullable: true,
    comment: 'Save Id like UID, PAN Card, etc',
  })
  verificationID: string;

  @Column({
    nullable: true,
    comment: 'received verified data from decentro',
    type: 'jsonb',
  })
  verifiedData: Record<string, any>;

  @ManyToOne(() => UserEntity, (user) => user.user_id)
  @JoinColumn({ name: 'user_id' }) // This is the foreign key column name
  user: UserEntity;
}
