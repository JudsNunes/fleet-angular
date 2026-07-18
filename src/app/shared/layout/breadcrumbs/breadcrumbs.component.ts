import { Component, inject } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { filter, map, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

interface Breadcrumb {
  label: string;
  route: string;
}

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  template: `
    <nav class="breadcrumbs">
      <mat-icon class="breadcrumb-icon">home</mat-icon>
      @for (crumb of breadcrumbs(); track crumb.route; let last = $last) {
        <span class="separator">/</span>
        @if (last) {
          <span class="current">{{ crumb.label }}</span>
        } @else {
          <a [routerLink]="crumb.route" class="link">{{ crumb.label }}</a>
        }
      }
    </nav>
  `,
  styles: [`
    .breadcrumbs {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 8px 0;
      font-size: 13px;
      color: #666;
    }
    .breadcrumb-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }
    .separator {
      color: #999;
    }
    .link {
      color: #3f51b5;
      text-decoration: none;
    }
    .link:hover {
      text-decoration: underline;
    }
    .current {
      color: #333;
      font-weight: 500;
    }
  `],
})
export class BreadcrumbsComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  readonly breadcrumbs = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.buildBreadcrumbs(this.activatedRoute)),
    ),
    { initialValue: [] },
  );

  private buildBreadcrumbs(route: ActivatedRoute, url = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const children = route.children;
    if (children.length === 0) return breadcrumbs;

    for (const child of children) {
      const routeURL = child.snapshot.url.map((segment) => segment.path).join('/');
      if (routeURL) url += `/${routeURL}`;

      const label = child.snapshot.data['breadcrumb'] || routeURL;
      breadcrumbs.push({ label, route: url });

      return this.buildBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}
