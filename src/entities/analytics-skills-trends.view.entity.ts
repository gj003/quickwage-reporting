import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({ name: 'v_skills_trends', synchronize: false })
export class SkillsTrendView {
  @ViewColumn({ name: 'org_id' })
  orgId: string;

  @ViewColumn({ name: 'metric_date' })
  metricDate: string;

  @ViewColumn({ name: 'skill' })
  skill: string;

  @ViewColumn({ name: 'mentions' })
  mentions: string;

  @ViewColumn({ name: 'avg_fit_score' })
  averageFitScore: string;
}
