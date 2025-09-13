export const Repetition = {
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
  FIX: 'FIX',
} as const;
export type Repetition = (typeof Repetition)[keyof typeof Repetition];
export const RepetitionLabels: Record<Repetition, string> = {
  WEEKLY: 'Hebdomadaire',
  MONTHLY: 'Mensuel',
  FIX: 'Fix',
};
