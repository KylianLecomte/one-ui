export const Frequency = {
  WEEKLY: 'Hebdomadaire',
  MONTHLY: 'Mensuel',
  YEARLY: 'Annuel',
  FIX: 'Fix',
  CUSTOM: 'Personnalisable',
} as const;

export type Frequency = (typeof Frequency)[keyof typeof Frequency];
