import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  message: any = null;

  constructor(
    private titleService: Title) { }

  ngOnInit(): void {
    this.updateFaviconAndTitle();
  }

  updateFaviconAndTitle(): void {
    const hostname = window.location.hostname;
    this.setFavicon('assets/img/favicon.png');
    this.setTitle('User Management');

  }

  setFavicon(faviconUrl: string): void {
    const link: HTMLLinkElement = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = faviconUrl;
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }

}
