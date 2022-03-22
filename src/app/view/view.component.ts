import { Component, OnInit } from '@angular/core';
import {FtxService, NFT_LIST} from "../ftx.service";




@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  private nfts:any;

  constructor(private ftx:FtxService) { }

  ngOnInit(): void {
    this.ftx.getNfts().subscribe((data:any) => {
      this.nfts=data.result;
    })
  }

}
