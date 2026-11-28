// src/database/entities/address.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  Unique,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { SharedEntity } from './shared.entity';

@Entity('address')
@Unique(['user_id'])
export class AddressEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'varchar' })
  careOf: string;

  @Column({ nullable: true, type: 'varchar' })
  country: string;

  @Column({ nullable: true, type: 'varchar' })
  district: string;

  @Column({ nullable: true, type: 'varchar' })
  house: string;

  @Column({ nullable: true, type: 'varchar' })
  landmark: string;

  @Column({ nullable: true, type: 'varchar' })
  locality: string;

  @Column({ nullable: true, type: 'varchar' })
  pincode: string;

  @Column({ nullable: true, type: 'varchar' })
  postOffice: string;

  @Column({ nullable: true, type: 'varchar' })
  state: string;

  @Column({ nullable: true, type: 'varchar' })
  street: string;

  @Column({ nullable: true, type: 'varchar' })
  subDistrict: string;

  @Column({ nullable: true, type: 'varchar' })
  vtc: string;

  @Column({ type: 'uuid' })
  user_id: string;

  // relations
  @ManyToOne(() => UserEntity, (user) => user.addresses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
