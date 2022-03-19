import { Component,OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styles: [],
})
export class BreadcrumsComponent implements OnDestroy {
  public titulo!: string;
  public tituloSubs$: Subscription | undefined;

  constructor(private router: Router) {
    this.getArgumentsRutas();
  }

  ngOnDestroy(): void {
    this.tituloSubs$?.unsubscribe();
  }

  getArgumentsRutas(): void {
    this.tituloSubs$ = this.router.events
      .pipe(
        filter(
          (event): event is ActivationEnd => event instanceof ActivationEnd
        ),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data)
      )
      .subscribe(({ titulo }) => {
        this.titulo = titulo;
        document.title = `Hospital - ${titulo}`;
      });
  }
}
