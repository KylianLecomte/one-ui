import { getValuesFromMap } from './record.utils';
import { WeekDay } from '../../modules/task/domain/dtos/frequency.type';

describe('getValuesFromMap', () => {
  it("Should return 'lundi, dimanche'", () => {
    expect(getValuesFromMap([WeekDay.MONDAY, WeekDay.SUNDAY])).toEqual('lundi, dimanche');
    expect(getValuesFromMap(WeekDay.SUNDAY)).toEqual('dimanche');
  });
});
