// src/database/entities/user-family.entity.ts

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { Gender, RelationType } from 'src/common/enum';
import { SharedEntity } from './shared.entity';

@Entity('user_family')
export class UserFamilyEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column('varchar')
  name: string;

  @Column('date', { nullable: true })
  dob: string;

  @Column({
    type: 'varchar',
  })
  relation: RelationType;

  @Column({
    type: 'varchar',
  })
  gender: Gender;

  // relations

  @ManyToOne(() => UserEntity, (rel) => rel.family_members, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
