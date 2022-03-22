import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {environment} from "../environments/environment";

export interface NFT {
  id: number,
  name: string,
  description: string,
  issuer: string,
  collection: string,
  series: string,
  solMintAddress: string,
  ethContractAddress: string,
  imageUrl: string,
  videoUrl: string,
  attributes: string,
  redeemable: boolean,
  redeemed: boolean,
  offerPrice: number,
  auction: {
    bestBid: number,
    minNextBid: number,
    endTime: string,
    bids: number
  }
}

export interface NFT_LIST {
  success: boolean,
  result: NFT[]
}



@Injectable({
  providedIn: 'root'
})
export class FtxService {

  lst: NFT_LIST | undefined;
  domain=environment.server+"/api/"

  constructor(private http: HttpClient) { }

  getNfts(collections:string,limit=100) {
    //voir https://angular.io/gui de/http
    return this.http.get<NFT_LIST>(this.domain+"nfts/?collections="+collections+"&limit="+limit)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
