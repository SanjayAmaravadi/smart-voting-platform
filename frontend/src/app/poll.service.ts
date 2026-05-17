import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiResponse, Poll, PollPage } from './poll.models';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  private baseUrl = 'http://localhost:8080/api/polls';

  constructor( private http: HttpClient ) {}

  createPoll( poll: any ): Observable<ApiResponse<Poll>> {
    return this.http.post<ApiResponse<Poll>>( this.baseUrl, poll );
  }

  getPolls( page: number, size: number, search: string, category: string ): Observable<ApiResponse<PollPage>> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if(search) { params = params.set('search', search); }
    if(category) { params = params.set('category', category); }
    return this.http.get<ApiResponse<PollPage>>( this.baseUrl, { params } );
  }

  vote( pollId: number, optionIndex: number ): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.baseUrl}/vote`, {pollId, optionIndex});
  }
}

// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { Poll } from './poll.models';

// @Injectable({
//   providedIn: 'root',
// })
// export class PollService {

//   private baseUrl = 'http://localhost:8080/api/polls';
//   constructor(private http: HttpClient) {}
//   createPoll(poll: Poll): Observable<Poll> {
//     return this.http.post<Poll>(this.baseUrl, poll);
//   }

//   getPolls(): Observable<Poll[]> {
//     return this.http.get<Poll[]>(this.baseUrl);
//   }

//   vote(pollId: number, optionIndex: number): Observable<Poll> {

//     return this.http.post<Poll>(
//       `${this.baseUrl}/vote`,
//       {
//         pollId,
//         optionIndex,
//       }
//     );
//   }
// }