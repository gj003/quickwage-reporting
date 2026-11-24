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
import { PipEntity } from './pip.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity({ name: 'pip_documents' })
@Index('idx_pip_documents_pip', ['pipId'])
export class PipDocumentEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'pip_document_id' })
  pipDocumentId: string;

  @Column({ type: 'varchar', length: 30, name: 'document_code', unique: true })
  documentCode: string;

  @Column({ type: 'uuid', name: 'pip_id' })
  pipId: string;

  @Column({ type: 'varchar', length: 120 })
  label: string;

  @Column({ type: 'varchar', length: 500 })
  url: string;

  @ManyToOne(() => PipEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pip_id' })
  pip?: PipEntity;

  @BeforeInsert()
  assignCode(): void {
    if (!this.documentCode) {
      this.documentCode = generatePrefixedCode('PID');
    }
  }
}
