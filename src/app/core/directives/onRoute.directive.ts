import { Directive, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Directive({
  selector: '[onRoute]',
})
export class OnRouteDirective implements OnInit {
  @Input('onRoute') rota!: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.route.url, this.rota);
  }
}
