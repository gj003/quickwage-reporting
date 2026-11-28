import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { generatePrefixedCode } from 'src/common/utility';
import { AssetRequestCommentEntity } from './asset-request-comment.entity';

@Entity('asset_requests')
export class AssetRequestEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  asset_request_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'varchar', length: 32, unique: true, nullable: true })
  asset_request_code: string;

  @Column({ type: 'varchar', length: 50 })
  request_type: string;

  @Column({ type: 'varchar', length: 50, default: 'pending' })
  request_status: string;

  @Column({ type: 'uuid' })
  employee_id: string;

  @Column({ type: 'uuid', nullable: true })
  requested_asset_id?: string;

  @Column({ type: 'uuid', nullable: true })
  requested_asset_category_id?: string;

  @Column({ type: 'uuid', nullable: true })
  requested_asset_type_id?: string;

  @Column({ type: 'uuid', nullable: true })
  replacement_for_asset_id?: string;

  @Column({ type: 'jsonb', nullable: true })
  replacement_image_urls?: string[];

  @Column({ type: 'text', nullable: true })
  reason_for_request?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  waiting_on?: string;

  @Column({ type: 'int', nullable: true })
  current_approval_level?: number;

  @Column({ type: 'uuid', nullable: true })
  assigned_asset_id?: string;

  @Column({ type: 'timestamp', nullable: true })
  closed_on?: Date;

  @Column({ type: 'uuid', nullable: true })
  created_by?: string;

  @OneToMany(
    () => AssetRequestCommentEntity,
    (assetRequestComment) => assetRequestComment.asset_request,
  )
  comments?: AssetRequestCommentEntity[];

  @BeforeInsert()
  generateCode() {
    if (!this.asset_request_code) {
      this.asset_request_code = generatePrefixedCode('ASTREQ');
    }
  }
}
