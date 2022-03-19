import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rjxs',
  templateUrl: './rjxs.component.html',
  styleUrls: ['./rjxs.component.css'],
})
export class RjxsComponent implements OnDestroy {
  public intervalSubscription: Subscription | undefined;

  constructor() {
    // this.retornaObservable().pipe(
    //   retry(2)
    // ).subscribe(
    //   valor => console.log('Subs', valor),
    //   error => console.log('Error', error),
    //   () => console.log('Completado')
    // );

    this.intervalSubscription = this.retornaIntervalo().subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.intervalSubscription?.unsubscribe(); 
  }

  retornaIntervalo(): Observable<number> {
    return interval(500).pipe(
      take(10),
      map((valor) => valor + 1),
      filter((valor) => (valor % 2 === 0 ? true : false))
    );
  }

  retornaObservable(): Observable<number> {
    let i = -1;
    return new Observable<number>((observer) => {
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (i === 2) {
          observer.error('i llego al valor de 2');
        }
      }, 1000);
    });
  }

  ngOnInit(): void {}
}
