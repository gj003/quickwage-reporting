// src/database/entities/external-api-logs.entity.ts

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { BloodGroup, Gender, MaritalStatus } from 'src/common/enum';
import { SharedEntity } from './shared.entity';

@Entity('user_info')
export class UserInfoEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column('varchar', { nullable: true })
  first_name: string;

  @Column('varchar', { nullable: true })
  middle_name: string;

  @Column('varchar', { nullable: true })
  last_name: string;

  @Column('varchar', { nullable: true })
  display_name: string;

  @Column({ type: 'varchar', nullable: true })
  gender: Gender;

  @Column('varchar', { nullable: true })
  dob: string;

  @Column('varchar', { nullable: true })
  time_zone: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  blood_group: BloodGroup;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  marital_status: MaritalStatus;

  @Column('varchar', { nullable: true })
  nationality: string;

  @Column({ type: 'uuid' })
  user_id: string;

  // fatherName not in use
  @Column({ type: 'varchar', nullable: true })
  fatherName: string;

  @Column({
    type: 'varchar',
    nullable: true,
    comment: 'It will be use for LMS sheet. need for NBFC',
  })
  sanction_number: string;

  @Column({ type: 'varchar', nullable: true })
  ip: string;

  @Column({ type: 'varchar', nullable: true })
  latitude: string;

  @Column({ type: 'varchar', nullable: true })
  longitude: string;

  @Column({ type: 'varchar', nullable: true })
  profile_picture_s3_url?: string | null;

  @Column('varchar', { nullable: true })
  personal_email?: string | null;

  @Column('varchar', { nullable: true })
  work_number?: string | null;

  @Column('text', { nullable: true })
  about?: string | null;

  @Column('text', { nullable: true })
  what_i_love_about_my_job?: string | null;

  @Column('text', { nullable: true })
  interests_and_hobbies?: string | null;

  @Column('text', { nullable: true })
  team?: string | null;

  @Column('text', { nullable: true })
  professional_summary?: string | null;

  @Column('simple-array', { nullable: true })
  skills?: string[] | null;

  @Column('simple-array', { nullable: true })
  languages?: string[] | null;

  @Column({ type: 'jsonb', nullable: true })
  previous_work_experience?: Record<string, any>[] | null;

  @Column({ type: 'jsonb', nullable: true })
  education?: Record<string, any>[] | null;

  // relations

  @OneToOne(() => UserEntity, (rel) => rel.user_id)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
