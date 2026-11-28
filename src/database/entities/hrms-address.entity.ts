// src/database/entities/hrms-address.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { CompanyEntity } from './company.entity';
import { SharedEntity } from './shared.entity';
import { AddressTypeEnum } from 'src/common/enum';
import { CompanyHolidayEntity } from './company-holiday.entity';

@Entity('hrms_address')
export class HRMS_AddressEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  title: string; // e.g. Head Office, Branch

  @Column({ type: 'varchar', length: 50, nullable: true })
  address_type: AddressTypeEnum; // Use enum if you want

  @Column({ type: 'varchar', length: 255, nullable: true })
  line_1: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  line_2: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  state: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  country: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  pin_code: string;

  @Column({ type: 'boolean', default: false })
  is_default: boolean;

  // Nullable FK for user or company, only one will be set based on address_type
  @Column({ type: 'uuid', nullable: true })
  user_id: string;

  @Column({ type: 'uuid', nullable: true })
  company_id: string;

  @Column({
    type: 'boolean',
    default: true,
    comment: 'True => ACTIVE, False => INACTIVE',
  })
  status: boolean;

  // Relations

  @ManyToOne(() => UserEntity, (rel) => rel.addresses, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => CompanyEntity, (rel) => rel.addresses, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @OneToMany(() => CompanyHolidayEntity, (rel) => rel.hrms_address)
  holidays: CompanyHolidayEntity[];
}
