export const Frequency = {
  WEEKLY: 'Hebdomadaire',
  MONTHLY: 'Mensuel',
  FIX: 'Fix',
} as const;

export type Frequency = (typeof Frequency)[keyof typeof Frequency];
