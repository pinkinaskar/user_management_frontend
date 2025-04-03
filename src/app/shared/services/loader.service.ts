import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private showLoader: boolean = false;
  
  constructor() 
  { }

  setLoading(loading: boolean) {
    this.showLoader = loading;
    console.log('-------',this.showLoader);
  }

  getLoading(): boolean {
    return this.showLoader;
  }

}
