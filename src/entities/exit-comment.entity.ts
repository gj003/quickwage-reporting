import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { ExitRequestEntity } from './exit-request.entity';

@Entity({ name: 'exit_comment' })
@Index('idx_exit_comment_request', ['exitRequestId'])
export class ExitCommentEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'exit_comment_id' })
  exitCommentId: string;

  @Column({ name: 'exit_request_id', type: 'uuid' })
  exitRequestId: string;

  @Column({ name: 'author_role', type: 'varchar', length: 30 })
  authorRole: string;

  @Column({ type: 'text' })
  comment: string;

  @ManyToOne(() => ExitRequestEntity)
  @JoinColumn({
    name: 'exit_request_id',
    referencedColumnName: 'exitRequestId',
  })
  exitRequest: ExitRequestEntity;
}
