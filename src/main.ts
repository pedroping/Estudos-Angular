import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { AlreadyLoggedGuardService } from './app/core/guards/alreadyLoggedGuard.service';
import { AuthGuardService } from './app/core/guards/secretGuard.service';
import { LoaderInterceptor } from './app/core/interceptors/loader.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      BrowserModule,
      AppRoutingModule,
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000',
      }),
    ),
    provideHttpClient(),
    provideAnimations(),
    AuthGuardService,
    AlreadyLoggedGuardService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    provideRouter([]),
  ],
}).catch((err) => console.error(err));
