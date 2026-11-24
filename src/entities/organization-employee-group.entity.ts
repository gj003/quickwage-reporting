// src/database/entities/organization-employee-group.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { CompanyEntity } from './company.entity';
import { UserEntity } from './user.entity';

@Entity('organization_employee_group')
export class OrganizationEmployeeGroup extends SharedEntity {
  @PrimaryGeneratedColumn() // ← This will generate an auto-incrementing number
  id: number;

  @Column({ name: 'group_name', type: 'varchar' })
  groupName: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'company_id', type: 'uuid' })
  company_id: string;

  // relations

  @ManyToOne(() => CompanyEntity, (rel) => rel.employeeGroups, {
    onDelete: 'CASCADE',
  })
  company: CompanyEntity;

  @ManyToMany(() => UserEntity, (rel) => rel.groups, { cascade: true })
  @JoinTable({
    name: 'group_members',
    joinColumn: {
      name: 'group_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'user_id',
    },
  })
  members: UserEntity[];
}
