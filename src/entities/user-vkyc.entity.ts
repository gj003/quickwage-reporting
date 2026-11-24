import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { UserEntity as UserEntity } from './user.entity';
import { SharedEntity } from './shared.entity';

@Entity('user_vkyc')
export class UserVkycEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', nullable: true })
  status: string;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  user_id: string;

  @Column({ type: 'json', nullable: true })
  agentTransactionInformation: Record<string, any>;

  @OneToOne(() => UserEntity, (rel) => rel.user_id, { onDelete: 'CASCADE' }) // Define the one-to-one relationship
  @JoinColumn({ name: 'user_id' }) // Define the foreign key column
  user: UserEntity; // This property represents the related FileEntity
}
