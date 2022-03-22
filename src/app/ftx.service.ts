import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParamsOptions} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

//Documentation FTX
//list des NFTs: https://docs.ftx.com/?javascript#list-nfts

const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');


export interface NFT_LIST {
  "success": boolean,
  "result": [
    {
      "id": number,
      "name": string,
      "description": string,
      "issuer": string,
      "collection": string,
      "series": string,
      "solMintAddress": string,
      "ethContractAddress": string,
      "imageUrl": string,
      "videoUrl": string,
      "attributes": string,
      "redeemable": boolean,
      "redeemed": boolean,
      "offerPrice": number,
      "auction": {
        "bestBid": number,
        "minNextBid": number,
        "endTime": string,
        "bids": number
      }
    }
  ]
}

@Injectable({
  providedIn: 'root'
})
export class FtxService {

  lst: NFT_LIST | undefined;
  api_key="d87Qu7i0znABaUs0mbMLM_LS2gPntUFEhnO9HbE8"
  api_secret="u4jGfTNN17xFb5fA2XFwE5rNWkEV0w2f9sBj2Jxd"

  constructor(private http: HttpClient) { }

  getNfts() {
    //voir https://angular.io/gui de/http
    return this.http.get<NFT_LIST>("https://ftx.com/api/nft/nfts",{headers:headers})
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
