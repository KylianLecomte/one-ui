export const EndRepetition = {
  DATE: 'DATE',
  NB_OCCURENCE: 'NB_OCCURENCE',
} as const;
export type EndRepetition = (typeof EndRepetition)[keyof typeof EndRepetition];
export const EndRepetitionLabels: Record<EndRepetition, string> = {
  DATE: 'date',
  NB_OCCURENCE: 'nbOccurence',
};
