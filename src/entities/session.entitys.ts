import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('session')
export class SessionEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 6, nullable: true })
  otp: string;

  @Column({ type: 'timestamptz', nullable: true })
  timestamp: Date;

  @Column({ type: 'timestamptz', nullable: true })
  last_login_at: Date;

  // @Unique(['user_id'])
  // @Column()
  // user_id: string;

  // @OneToOne(() => UserEntity, (user) => user.user_id, {
  //     onDelete: 'CASCADE',
  // })
  // @JoinColumn({ name: 'user_id' })
  // user: UserEntity;
}
