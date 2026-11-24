// src/database/entities/documents.entity.ts

import { Documents } from 'src/common/enum';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('documents')
export class DocumentEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', nullable: false })
  user_id: string;

  @Column({
    type: 'varchar',
  })
  document_type: Documents;

  @Column({
    type: 'jsonb',
  })
  data: Record<string, any>;
}
