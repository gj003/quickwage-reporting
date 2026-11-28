// src/database/entities/business-unit.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { CompanyEntity } from './company.entity';
import { UserEntity } from './user.entity';
import { DepartmentEntity } from './department.entity';
import { JobDetailEntity } from './job-detail.entity';
import { LegalEntity } from './legal_entity.entity';

@Entity('business_units')
export class BusinessUnitEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150, nullable: true })
  name?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  code?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'varchar', array: true, nullable: true })
  tags?: string[];

  @Column({ type: 'boolean', nullable: true })
  status?: boolean;

  @Column({ type: 'uuid', nullable: true })
  company_id?: string;

  @Column({ type: 'uuid', nullable: true })
  user_head_id?: string;

  @Column({ type: 'uuid' })
  legal_entity_id: string;

  // 🔹 Relations
  @ManyToOne(() => CompanyEntity, (rel) => rel.businessUnits, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company?: CompanyEntity;

  @ManyToOne(() => UserEntity, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'user_head_id' })
  userHead?: UserEntity;

  @ManyToOne(() => LegalEntity, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({
    name: 'legal_entity_id',
    referencedColumnName: 'legal_entity_id',
  })
  legalEntity: LegalEntity;

  // 🔹 One Business Unit → Many Departments
  @OneToMany(() => DepartmentEntity, (rel) => rel.businessUnit)
  departments?: DepartmentEntity[];

  @OneToMany(() => JobDetailEntity, (rel) => rel.department)
  jobDetails: JobDetailEntity[];
}
