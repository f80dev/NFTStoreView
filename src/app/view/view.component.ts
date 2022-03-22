import { Component, OnInit } from '@angular/core';
import {FtxService, NFT_LIST,NFT} from "../ftx.service";
import {ActivatedRoute} from "@angular/router";




@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  nfts:NFT_LIST={success:false,result:[]};

  constructor(private ftx:FtxService,private routes:ActivatedRoute) { }

  //http://localhost:4200/view?collections=Coachella%20Keys&limit=100
  ngOnInit(): void {
    let collections:string=this.routes.snapshot.queryParamMap.get("collections") || "";
    let limit:number=Number(this.routes.snapshot.queryParamMap.get("limit")) || 100;
    this.ftx.getNfts(collections,limit).subscribe((data:NFT_LIST) => {
      this.nfts=data;
    })
  }

}
