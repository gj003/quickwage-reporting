import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { UserEntity } from './user.entity';
import { AssetRequestEntity } from './asset-request.entity';

@Entity('asset_request_comments')
export class AssetRequestCommentEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  asset_request_comment_id: string;

  @Column({ type: 'uuid' })
  asset_request_id: string;

  @ManyToOne(() => AssetRequestEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'asset_request_id',
    referencedColumnName: 'asset_request_id',
  })
  asset_request: AssetRequestEntity;

  @Column({ type: 'uuid' })
  user_id: string;

  @ManyToOne(() => UserEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  user: UserEntity;

  @Column({ type: 'text' })
  comment: string;
}
