// src/database/entities/roles.entity.ts

import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { CompanyEntity } from './company.entity';
import {
  MODULE_NAME,
  RoleAccessScope,
  RolePermissionType,
} from 'src/common/enum';
import { UserEntity } from './user.entity';
import { UserRoleEntity } from './user-role.entity';

@Entity('roles')
@Unique(['name', 'role_code', 'company_id'])
export class RoleEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ type: 'varchar', nullable: true })
  role_code?: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', default: 'custom' })
  role_type: string;

  @Column({ type: 'boolean', default: false })
  is_system_defined: boolean;

  @Column({ type: 'boolean', default: true })
  is_editable: boolean;

  @Column({ type: 'boolean', default: true })
  is_deletable: boolean;

  @Column({ type: 'boolean', default: true })
  is_renamable: boolean;

  @Column({ type: 'varchar', default: 'active' })
  status: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  access_scope: RoleAccessScope;

  @Column({ type: 'int', nullable: true })
  inherits_from_id?: number;

  // relations

  @ManyToOne(() => CompanyEntity, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @ManyToOne(() => RoleEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'inherits_from_id' })
  inherits_from?: RoleEntity;

  @Column({ type: 'jsonb', nullable: true })
  permissions: Partial<
    Record<MODULE_NAME, Partial<Record<RolePermissionType, boolean>>>
  >;

  @OneToMany(() => UserRoleEntity, (userRole) => userRole.role)
  userRoles: UserRoleEntity[];

  @ManyToMany(() => UserEntity, (user) => user.roles)
  users: UserEntity[];
}
