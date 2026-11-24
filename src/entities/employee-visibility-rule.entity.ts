import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { DepartmentEntity } from './department.entity';
import { RoleEntity } from './roles.entity';
import { DesignationEntity } from './designation.entity';
import {
  EmployeeVisibilityRuleScope,
  EmployeeVisibilityRuleType,
  EmployeeVisibilityRuleWhomCanView,
} from 'src/common/enum';
import { HRMS_AddressEntity } from './hrms-address.entity';

@Entity('employee_visibility_rules')
export class EmployeeVisibilityRuleEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 150, nullable: false })
  name: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  visibility_type: EmployeeVisibilityRuleType;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  scope: EmployeeVisibilityRuleScope;

  // Active / Inactive
  @Column({ type: 'boolean', default: true })
  status: boolean;

  // company scoping (keeps parity with other modules)
  @Column({ type: 'uuid' })
  company_id: string;

  // Whom can view -> array of enum values (SAME_DEPARTMENT, DIRECT_REPORTEE, etc.)
  @Column({
    type: 'jsonb',
    nullable: false,
    default: () => "'[]'::jsonb",
  })
  whom_can_view: EmployeeVisibilityRuleWhomCanView[];

  // relations

  // Many-to-Many: Departments (used when scope === DEPARTMENT or CUSTOM)
  @ManyToMany(() => DepartmentEntity)
  @JoinTable({
    name: 'employee_visibility_rule_departments',
    joinColumn: { name: 'rule_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'department_id', referencedColumnName: 'id' },
  })
  departments?: DepartmentEntity[];

  // Many-to-Many: Locations (addresses) (used when scope === LOCATION or CUSTOM)
  @ManyToMany(() => HRMS_AddressEntity)
  @JoinTable({
    name: 'employee_visibility_rule_locations',
    joinColumn: { name: 'rule_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'location_id', referencedColumnName: 'id' },
  })
  locations?: HRMS_AddressEntity[];

  // Many-to-Many: Roles (used when scope === ROLE or CUSTOM)
  @ManyToMany(() => RoleEntity)
  @JoinTable({
    name: 'employee_visibility_rule_roles',
    joinColumn: { name: 'rule_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles?: RoleEntity[];

  // Who can view -> designations (multiple)
  @ManyToMany(() => DesignationEntity)
  @JoinTable({
    name: 'employee_visibility_rule_designations',
    joinColumn: { name: 'rule_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'designation_id', referencedColumnName: 'id' },
  })
  who_can_view?: DesignationEntity[];
}
