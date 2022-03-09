import { Component } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [],
})
export class Grafica1Component {
  labels1 : string[] =  [ 'Dato1', 'Dato2', 'Dato3' ];
  data1: ChartData<'doughnut'> = {
    labels: this.labels1,
    datasets: [
      { data: [ 75, 45, 10 ],
        backgroundColor: [ '#6857E6', '#009FEE', '#F02059' ],
        hoverBackgroundColor: [ '#6857E6', '#009FEE', '#F02059' ],
        hoverBorderColor: [ '#6857E6', '#009FEE', '#F02059' ],
      }
    ]
  };
}
