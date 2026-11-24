import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { ExitSurveyCategory, ExitSurveyScaleType } from 'src/common/enum';
import { UserEntity } from './user.entity';
import { EmployeeExitRequestEntity } from './employee-exit-request.entity';

@Entity('employee_exit_survey_form_answer')
@Index('idx_employee_exit_survey_form_answer_request', [
  'employeeExitRequestId',
])
export class EmployeeExitSurveyFormAnswerEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  exit_survey_form_answer_id: string;

  @Column({ name: 'employee_exit_request_id', type: 'uuid' })
  employeeExitRequestId: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'varchar', nullable: true })
  category: ExitSurveyCategory;

  @Column({ type: 'text', nullable: true })
  question: string;

  @Column({ type: 'text', nullable: true })
  answer: string;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column({ type: 'jsonb', nullable: true })
  selected_options: string[];

  @Column({ type: 'int', nullable: true })
  scale_rating: number;

  @Column({ type: 'varchar', nullable: true })
  scale_type: ExitSurveyScaleType;

  //  relations

  @ManyToOne(() => UserEntity, { eager: true })
  user: UserEntity;

  @ManyToOne(() => EmployeeExitRequestEntity, (rel) => rel.surveyAnswers)
  @JoinColumn({
    name: 'employee_exit_request_id',
    referencedColumnName: 'employeeExitRequestId',
  })
  employeeExitRequest: EmployeeExitRequestEntity;
}
