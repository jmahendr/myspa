import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Observable } from 'rxjs/Observable';

import { Restangular, RestangularModule } from 'ngx-restangular';

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';

@Injectable()
export class PromotionService {

  constructor(private restangular: Restangular) { }

  getPromotions(): Observable<Promotion[]> {
    //simulate server latency with a delay of 2 seconds
    //return Observable.of(PROMOTIONS).delay(2000);
    return this.restangular.all('promotions').getList();
  }

  getPromotion(id: number): Observable<Promotion> {
    //simulate server latency with a delay of 2 seconds
    //return Observable.of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).delay(2000);
    return this.restangular.one('promotions', id).get();
  }

  getFeaturedPromotion(): Observable<Promotion> {
    //simulate server latency with a delay of 2 seconds
    //return Observable.of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).delay(2000);
    return this.restangular.all('promotions').getList({featured_like:true})
    .map(promotions => promotions[0]);
  }

}
