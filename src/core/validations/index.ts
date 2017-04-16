import { isPresent, isDate } from './base.validator';
import { email } from './email.validator';
import { equal } from './equal.validator';
import { equalTo } from './equal-to.validator';
import { greaterThan } from './greater-than.validator';
import { lessThan } from './less-than.validator';
import { max } from './max.validator';
import { min } from './min.validator';
import { maxDate } from './max-date.validator';
import { minDate } from './min-date.validator';
import { number } from './number.validator';
import { range } from './range.validator';
import { phone } from './phone.validator';
import { rangeLength } from './range-length.validator';

export const CustomValidators: any = {
    email, equal, equalTo, greaterThan, lessThan,
    min, max, minDate, maxDate, number, range, rangeLength, phone
};