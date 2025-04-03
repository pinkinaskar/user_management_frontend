import { Component, OnInit, Input, Output, EventEmitter,SimpleChanges } from '@angular/core';
import { LoaderService } from '../../shared/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})

export class LoaderComponent implements OnInit {

  showLoader: boolean = false;

  constructor(public loaderService : LoaderService)
  {}

  ngOnInit(): void {

  }


}
