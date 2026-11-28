import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { TagEntity } from './tag.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'candidate_tag' })
export class CandidateTagEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'candidate_tag_id' })
  candidateTagId: string;

  @Column({ name: 'auto_inc', type: 'int' })
  @Generated('increment')
  autoInc: number;

  @Column({ name: 'candidate_id', type: 'uuid' })
  candidateId: string;

  @Column({ name: 'tag_id', type: 'uuid' })
  tagId: string;

  @ManyToOne(() => TagEntity, (tag) => tag.candidateTags, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tag_id', referencedColumnName: 'tagId' })
  tag: TagEntity;

  @Column({ name: 'added_by', type: 'uuid', nullable: true })
  addedBy?: string | null;

  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'added_by', referencedColumnName: 'user_id' })
  addedByUser?: UserEntity | null;

  @Column({
    name: 'confidence',
    type: 'numeric',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  confidence?: number | null;
}
