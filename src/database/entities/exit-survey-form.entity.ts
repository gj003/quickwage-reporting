import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';
import { ExitSurveyCategory, ExitSurveyFieldType } from 'src/common/enum';

@Entity('exit_survey_form')
export class ExitSurveyFormEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  exit_survey_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'varchar', nullable: true })
  category: ExitSurveyCategory;

  @Column({ type: 'jsonb', default: [] })
  questions: {
    question: string;
    field_type: ExitSurveyFieldType;
    options: string[];
    allow_comment: boolean;
    is_active: boolean;
  }[];
}
