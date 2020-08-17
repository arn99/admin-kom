import { Pipe, PipeTransform } from '@angular/core';
/*
 *
 * Usage:
 *   value | calcualate
 * Example:
 *   {{ 12345 | calcualate }}
 *   formats to: 12350
*/
@Pipe({name: 'priceMinusProfite'})
export class PriceMinusProfitPipe implements PipeTransform {
  transform(price: number): number {
    price = 0.9 * price;
    const multiplier = Math.pow(10, -2 || 0);
    return Math.round(price * multiplier) / multiplier;
  }
}
