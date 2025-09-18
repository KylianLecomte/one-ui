export const EndRepetitionType = {
  DATE: 'DATE',
  NB_OCCURENCE: 'NB_OCCURENCE',
} as const;
export type EndRepetitionType = (typeof EndRepetitionType)[keyof typeof EndRepetitionType];
export const EndRepetitionLabels: Record<EndRepetitionType, string> = {
  DATE: 'date',
  NB_OCCURENCE: 'nbOccurence',
};
