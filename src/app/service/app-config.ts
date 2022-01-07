import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfig {
  hostUrl = 'http://localhost:8080'

  constructor() { }
}
