import { enableProdMode, NgZone } from '@angular/core';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { getSingleSpaExtraProviders, singleSpaAngular } from 'single-spa-angular';

import { AppComponent } from './app/app.component';
import { environment } from './environments/environment.development';
import { singleSpaPropsSubject } from './single-spa/single-spa-props';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { EmptyRouteComponent } from './app/empty-route/empty-route.component';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

// if (environment.production) {
//   enableProdMode();
// }
console.log(window.location.pathname)

const lifecycles = singleSpaAngular({
  bootstrapFunction: singleSpaProps => {
    singleSpaPropsSubject.next(singleSpaProps);
    return bootstrapApplication(AppComponent, {
      providers: [
        getSingleSpaExtraProviders(),
        { provide: APP_BASE_HREF, useValue: `${window.location.pathname}` },
        { provide: 'singleSpaProps', useValue: singleSpaProps },
        provideHttpClient(),
        provideAnimations()
      ],
    });
  },
  NgZone,
  template: '<app-root></app-root>',
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
