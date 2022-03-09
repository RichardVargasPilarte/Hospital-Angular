import { Component, Input } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.css']
})
export class DonaComponent {
  @Input() title: string = 'Sin titulo';

// Doughnut
@Input('labels') doughnutChartLabels: string[] = [
  'labels 1',
  'labels 2',
  'labels 3',
];

@Input('data') doughnutChartData: ChartData<'doughnut'> = {
  labels: this.doughnutChartLabels,
  datasets: [
    {
      data: [350, 450, 100],
      backgroundColor: ['#5882FA', '#FA58F4', '#A5DF00'],
      hoverBackgroundColor: ['#5882FA', '#FA58F4', '#A5DF00'],
      hoverBorderColor: ['#5882FA', '#FA58F4', '#A5DF00'],
    },
  ],
};

public doughnutChartType: ChartType = 'doughnut';

// events
public chartClicked({
  event,
  active,
}: {
  event: MouseEvent;
  active: {}[];
}): void {
  console.log(event, active);
}

public chartHovered({
  event,
  active,
}: {
  event: MouseEvent;
  active: {}[];
}): void {
  console.log(event, active);
}
}
