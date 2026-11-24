import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { DepartmentEntity } from './department.entity';

@Entity({ name: 'praise_settings' })
export class PraiseSettingEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'praise_setting_id' })
  praiseSettingId: string;

  @Column({ type: 'uuid', name: 'company_id', unique: true })
  companyId: string;

  @Column({ type: 'boolean', name: 'enable_praise', default: true })
  enablePraise: boolean;

  /** 'everyone' | 'managers' | 'managers_and_peers' */
  @Column({
    type: 'varchar',
    length: 30,
    name: 'who_can_give_praise',
    default: 'everyone',
  })
  whoCanGivePraise: string;

  /**
   * Set only when who_can_give_praise is 'everyone' and the "Restrict
   * praises exclusively to <department>" toggle is on; narrows "everyone"
   * down to members of this department. Null means unrestricted.
   */
  @Column({ type: 'int', name: 'restrict_to_department_id', nullable: true })
  restrictToDepartmentId?: number | null;

  @ManyToOne(() => DepartmentEntity, { nullable: true })
  @JoinColumn({ name: 'restrict_to_department_id' })
  restrictToDepartment?: DepartmentEntity | null;

  @Column({
    type: 'boolean',
    name: 'restrict_wall_posts_to_department',
    default: false,
  })
  restrictWallPostsToDepartment: boolean;

  @Column({
    type: 'boolean',
    name: 'enable_badge_certificate',
    default: false,
  })
  enableBadgeCertificate: boolean;
}
