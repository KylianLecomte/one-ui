export const RepetitionRuleType = {
  WEEKLY_BY_DAY: 'WEEKLY_BY_DAY',
  WEEKLY_REGULAR: 'WEEKLY_REGULAR',
} as const;
export type RepetitionRuleType = (typeof RepetitionRuleType)[keyof typeof RepetitionRuleType];
export const RepetitionRuleTypeLabels: Record<RepetitionRuleType, string> = {
  WEEKLY_BY_DAY: 'Par jour',
  WEEKLY_REGULAR: 'Régulier',
};
