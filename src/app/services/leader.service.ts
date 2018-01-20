import { Injectable } from '@angular/core';

import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable()
export class LeaderService {

  constructor() { }

  getLeader(id): Promise<Leader>{
    //simulate server latency with a delay of 2 seconds
    return new Promise(resolve => {
      setTimeout(() => resolve(LEADERS.filter((leader) => (leader.id === id))[0]), 2000);
    });
  }

  getFeaturedLeader(): Promise<Leader> {
    //simulate server latency with a delay of 2 seconds
    return new Promise(resolve => {
      setTimeout(() => resolve(LEADERS.filter((leader) => (leader.featured))[0]), 2000);
    });
  }

  getLeaders(): Promise<Leader[]> {
    //simulate server latency with a delay of 2 seconds
    return new Promise(resolve => {
      setTimeout(() => resolve(LEADERS), 2000);
    });
  }
}
