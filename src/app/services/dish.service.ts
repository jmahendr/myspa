import { Injectable } from '@angular/core';

import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Promotion } from '../shared/promotion';

@Injectable()
export class DishService {

  constructor() { }

  getDishes() : Promise<Dish[]> {
    //simulate server latency with a delay of 2 seconds
    return new Promise(resolve => {
      setTimeout(() => resolve(DISHES), 2000);
    });
  }

  getDish(id) : Promise<Dish> {
    //simulate server latency with a delay of 2 seconds
    return new Promise(resolve => {
      setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
    });
  }

  getFeaturedDish() : Promise<Dish> {
    //simulate server latency with a delay of 2 seconds
    return new Promise(resolve => {
      setTimeout(() => resolve(DISHES.filter((dish) => (dish.featured))[0]), 2000);
    });
  }

}
