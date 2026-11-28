import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity('attendance_shift_rotation_teams')
export class AttendanceShiftRotationTeamEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  attendance_shift_rotation_team_id: string;

  @Column({ type: 'uuid' })
  organization_id: string;

  @Column({ type: 'uuid' })
  attendance_shift_rotation_id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  team_code: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description?: string | null;

  @BeforeInsert()
  assignCode(): void {
    if (!this.team_code) {
      this.team_code = generatePrefixedCode('ROT_TEAM');
    }
  }
}
