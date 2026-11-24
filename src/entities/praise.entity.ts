import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { DepartmentEntity } from './department.entity';
import { PraiseAttachmentEntity } from './praise-attachment.entity';
import { PraiseTypeEnum } from 'src/modules/Praise/praise.enums';
import { generatePrefixedCode } from 'src/common/utility';

@Entity({ name: 'praises' })
@Index('idx_praise_company_to_employee', ['companyId', 'toEmployeeId'])
@Index('idx_praise_company_post_to_wall', ['companyId', 'postToWall'])
export class PraiseEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'praise_id' })
  praiseId: string;

  @Column({ type: 'varchar', name: 'praise_code', unique: true })
  praiseCode: string;

  @Column({ type: 'uuid', name: 'company_id' })
  companyId: string;

  @Column({ type: 'uuid', name: 'from_employee_id' })
  fromEmployeeId: string;

  @Column({ type: 'uuid', name: 'to_employee_id' })
  toEmployeeId: string;

  @Column({ type: 'varchar', length: 30 })
  type: PraiseTypeEnum;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'jsonb', name: 'project_ids', nullable: true })
  projectIds?: string[] | null;

  @Column({ type: 'boolean', name: 'post_to_wall', default: false })
  postToWall: boolean;

  @Column({ type: 'int', name: 'department_id', nullable: true })
  departmentId?: number | null;

  @ManyToOne(() => DepartmentEntity, { nullable: true })
  @JoinColumn({ name: 'department_id' })
  department?: DepartmentEntity | null;

  @OneToMany(() => PraiseAttachmentEntity, (attachment) => attachment.praise, {
    cascade: ['insert'],
  })
  attachments?: PraiseAttachmentEntity[];

  @BeforeInsert()
  assignPraiseCode(): void {
    if (!this.praiseCode) {
      this.praiseCode = generatePrefixedCode('PRS');
    }
  }
}
