import {
  BeforeInsert,
  Column,
  Entity,
  Generated,
  OneToMany,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';
import { PoolMemberEntity } from './pool-member.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'talent_pool' })
@Index('idx_talent_pool_company_owner_status', [
  'companyId',
  'ownerUserId',
  'status',
])
export class TalentPoolEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'talent_pool_id' })
  talentPoolId: string;

  @Column({ name: 'auto_inc', type: 'int' })
  @Generated('increment')
  autoInc: number;

  @Column({ name: 'pool_code', type: 'varchar', length: 32, unique: true })
  poolCode: string;

  @Column({ name: 'company_id', type: 'uuid' })
  companyId: string;

  @Column({ name: 'owner_user_id', type: 'uuid' })
  ownerUserId: string;

  @ManyToOne(() => UserEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'owner_user_id', referencedColumnName: 'user_id' })
  owner?: UserEntity;

  @Column({
    name: 'visibility',
    type: 'varchar',
    length: 20,
    default: 'PRIVATE',
  })
  visibility: 'PRIVATE' | 'SHARED';

  @Column({ name: 'status', type: 'varchar', length: 20, default: 'ACTIVE' })
  status: 'ACTIVE' | 'INACTIVE';

  @Column({
    name: 'shared_with_user_ids',
    type: 'uuid',
    array: true,
    default: '{}',
  })
  sharedWithUserIds: string[];

  @Column({
    name: 'shared_with_team_ids',
    type: 'uuid',
    array: true,
    default: '{}',
  })
  sharedWithTeamIds: string[];

  @Column({ name: 'is_online', type: 'boolean', default: false })
  isOnline: boolean;

  memberCount?: number;

  @Column({ name: 'name', type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'description', type: 'varchar', length: 500, nullable: true })
  description?: string | null;

  @Column({ name: 'criteria_json', type: 'text', nullable: true })
  criteriaJson?: string | null;

  @Column({ name: 'metrics_json', type: 'text', nullable: true })
  metricsJson?: string | null;

  @OneToMany(() => PoolMemberEntity, (member) => member.pool)
  members: PoolMemberEntity[];

  @BeforeInsert()
  assignPoolCode(): void {
    if (!this.poolCode) {
      this.poolCode = generatePrefixedCode('POOL');
    }
  }
}
