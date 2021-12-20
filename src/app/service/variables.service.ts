import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VariablesService {
  hostUrl = 'http://localhost:8080'

  constructor() { }
}
