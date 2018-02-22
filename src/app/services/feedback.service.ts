import { Injectable } from '@angular/core';

import { Feedback } from "../shared/feedback";
import { Restangular, RestangularModule } from "ngx-restangular";

import { Observable } from 'rxjs/Observable';

@Injectable()
export class FeedbackService {

  constructor(private restangular: Restangular) { }

  submitFeedback(feedback: Feedback): Observable<Feedback> {
    return this.restangular.all('feedback').post(feedback);
  }

  getFeedback(id) :Observable<Feedback> {
    return this.restangular.one('feedback', id).get();
  }

}
