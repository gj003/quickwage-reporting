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
import { generatePrefixedCode } from 'src/common/utility';
import { WallPollOptionDto } from 'src/modules/social-wall/social-wall.dto';

@Entity('social_wall_posts')
@Index('idx_wall_posts_company_feed', ['company_id', 'pinned', 'created_at'])
export class SocialWallPostEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid') post_id: string;
  @Column({ type: 'varchar', unique: true }) post_code: string;
  @Column({ type: 'uuid' }) company_id: string;
  @Column({ type: 'uuid' }) author_id: string;
  @Column({ type: 'text' }) text: string;
  @Column({ type: 'int', array: true, default: () => "'{}'" })
  document_ids: number[];
  @Column({ type: 'jsonb', nullable: true }) poll_options:
    WallPollOptionDto[] | null;
  @Column({ type: 'timestamptz', nullable: true }) poll_ends_at: Date | null;
  @Column({ type: 'boolean', default: false }) poll_anonymous: boolean;
  @Column({ default: false }) pinned: boolean;
  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'author_id' })
  author: UserEntity;
  @BeforeInsert() assignCode() {
    if (!this.post_code) this.post_code = generatePrefixedCode('WALL', 10);
  }
}
