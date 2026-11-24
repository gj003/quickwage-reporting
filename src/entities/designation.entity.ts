// src/database/entities/designation.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { CompanyEntity } from './company.entity';
import { DepartmentEntity } from './department.entity';
import { JobDetailEntity } from './job-detail.entity';
import { UserEntity } from './user.entity';

@Entity('designations')
export class DesignationEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('int', { nullable: false })
  level: number;

  @Column('text', { nullable: true })
  description?: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'int', nullable: true })
  department_id?: number;

  @Column({ type: 'uuid', nullable: true })
  reporting_user_id?: string;

  // 🔹 Relations
  @ManyToOne(() => CompanyEntity, (rel) => rel.designations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @ManyToOne(() => DepartmentEntity, (rel) => rel.designations, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'department_id' })
  department?: DepartmentEntity;

  @OneToMany(() => JobDetailEntity, (rel) => rel.designation)
  jobDetails: JobDetailEntity[];

  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'reporting_user_id' })
  reportingUser?: UserEntity;
}
