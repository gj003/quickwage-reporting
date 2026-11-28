import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { CompanyEntity } from './company.entity';
import { UserEntity } from './user.entity';
import { SocialWallPostEntity } from './social-wall-post.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity('social_wall_comments')
@Index('idx_wall_comments_company_post', ['company_id', 'post_id'])
export class SocialWallCommentEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid') comment_id: string;
  @Column({ type: 'varchar', unique: true }) comment_code: string;
  @Column({ type: 'uuid' }) company_id: string;
  @Column({ type: 'uuid' }) post_id: string;
  @Column({ type: 'uuid' }) author_id: string;
  @Column({ type: 'text' }) text: string;
  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;
  @ManyToOne(() => SocialWallPostEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: SocialWallPostEntity;
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'author_id' })
  author: UserEntity;
  @BeforeInsert() assignCode() {
    if (!this.comment_code)
      this.comment_code = generatePrefixedCode('WCOM', 10);
  }
}
