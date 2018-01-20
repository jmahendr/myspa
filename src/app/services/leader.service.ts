import { Injectable } from '@angular/core';

import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';

@Injectable()
export class LeaderService {

  constructor() { }

  getLeader(id): Observable<Leader>{
    //simulate server latency with a delay of 2 seconds
    return Observable.of(LEADERS.filter((leader) => (leader.id === id))[0]).delay(2000);
  }

  getFeaturedLeader(): Observable<Leader> {
    //simulate server latency with a delay of 2 seconds
    return Observable.of(LEADERS.filter((leader) => (leader.featured))[0]).delay(2000);
  }

  getLeaders(): Observable<Leader[]> {
    //simulate server latency with a delay of 2 seconds
    return Observable.of(LEADERS).delay(2000);
  }
}
