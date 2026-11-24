// src/database/entities/id-card-setting.entity.ts

import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import {
  CardOrientation,
  FontSize,
  LogoPosition,
  ProfilePhotoPosition,
  QRLinksTo,
} from 'src/common/enum';
import { CompanyEntity } from './company.entity';
import { IDCardAccess, IDCardFields } from 'src/common/classes';

@Entity('id_card_setting')
export class IDCardSettingEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  color_theme: string;

  @Column({ type: 'varchar', default: FontSize.MEDIUM })
  font_size: FontSize;

  @Column({ type: 'varchar', default: ProfilePhotoPosition.LEFT })
  profile_photo_position: ProfilePhotoPosition;

  @Column({ type: 'varchar', default: LogoPosition.TOP_LEFT })
  logo_position: LogoPosition;

  @Column({ type: 'varchar', default: CardOrientation.PORTRAIT })
  card_orientation: CardOrientation;

  @Column({ type: 'jsonb', default: {} })
  fields: IDCardFields;

  @Column({ type: 'jsonb', default: {} })
  access: IDCardAccess;

  @Column({ type: 'boolean', default: false })
  enable_qr_code: boolean;

  @Column({ type: 'varchar', nullable: true })
  qr_links_to: QRLinksTo;

  @Column({ type: 'varchar', nullable: true })
  custom_link_url: string;

  @Column({ type: 'uuid' })
  company_id: string;

  // 🔹 Relations
  @OneToOne(() => CompanyEntity, (company) => company.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;
}
