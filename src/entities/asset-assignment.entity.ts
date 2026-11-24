import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { AssetEntity } from './asset.entity';
import { UserEntity } from './user.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity('asset_assignments')
export class AssetAssignmentEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  asset_assignment_id: string;

  @Column({ type: 'varchar', length: 32, unique: true, nullable: true })
  asset_assignment_code: string;

  @Column({ type: 'uuid' })
  asset_id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'uuid', nullable: true })
  company_id?: string;

  @Column({ type: 'varchar', length: 50, default: 'assigned' })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  assigned_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  returned_at?: Date;

  @Column({ type: 'timestamp', nullable: true })
  recovered_on?: Date;

  @Column({ type: 'boolean', default: true })
  acknowledgement_required: boolean;

  @Column({ type: 'varchar', nullable: true })
  assignment_note?: string;

  @ManyToOne(() => AssetEntity, (rel) => rel.assignments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'asset_id' })
  asset: AssetEntity;

  @ManyToOne(() => UserEntity, (rel) => rel.assetAssignments, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @BeforeInsert()
  generateCode() {
    if (!this.asset_assignment_code) {
      this.asset_assignment_code = generatePrefixedCode('ASTASN');
    }
  }
}
