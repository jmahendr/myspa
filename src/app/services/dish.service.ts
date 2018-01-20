import { Injectable } from '@angular/core';

import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Promotion } from '../shared/promotion';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';

@Injectable()
export class DishService {

  constructor() { }

  getDishes() : Observable<Dish[]> {
    //simulate server latency with a delay of 2 seconds
    return Observable.of(DISHES).delay(2000);
  }

  getDish(id) : Observable<Dish> {
    //simulate server latency with a delay of 2 seconds
    return Observable.of(DISHES.filter((dish) => (dish.id === id))[0]).delay(2000);
  }

  getFeaturedDish() : Observable<Dish> {
    //simulate server latency with a delay of 2 seconds
    return Observable.of(DISHES.filter((dish) => (dish.featured))[0]).delay(2000);
  }

}
