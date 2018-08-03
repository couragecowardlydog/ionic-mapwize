/**
 * @author Vivekanandan Sakthivelu
 * @created on 03 August 2018
 * @augments seconds required to cover a distance
 */
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'requiredtime',
})
export class RequiredtimePipe implements PipeTransform {
  /**
   * @description Transform seconds to variable time 
   * @param value 
   */
  transform(seconds: number): string {
    let timeRequired: string = '0 min'
    if (seconds < 60)
      timeRequired = Math.ceil(seconds) + ' sec'
    else if (seconds > 60 && seconds < 60 * 60)
      timeRequired = Math.ceil(seconds / 60) + ' min';
    else if (seconds > 60 * 60 && seconds < 60 * 60 * 24)
      timeRequired = Math.ceil(seconds / (60 * 60)) + ' hours'
    else
      timeRequired = Math.ceil(seconds / (60 * 60 * 24)) + ' days'
    return timeRequired;

  }
}
