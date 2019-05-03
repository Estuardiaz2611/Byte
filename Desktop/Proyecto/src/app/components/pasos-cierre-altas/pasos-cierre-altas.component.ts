import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-pasos-cierre-altas',
  templateUrl: './pasos-cierre-altas.component.html',
  styleUrls: ['./pasos-cierre-altas.component.scss']
})
export class PasosCierreAltasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
export class DatepickerValueExample {
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
}
