import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

OfflinePluginRuntime.install();

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
