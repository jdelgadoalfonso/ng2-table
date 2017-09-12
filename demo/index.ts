import {NgModule, Component} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {TabsModule, PaginationModule, BsDropdownModule,
  ComponentLoaderFactory, PositioningService, BsDropdownConfig} from 'ngx-bootstrap';

import {DCLModule} from 'dcl-component/dcl-component';

import {TableModule} from '../components/ng-table.module';
import {NgTable} from '../components/table/ng-table.component';

import {TableSection} from './components/table-section';
import {TableDemo} from './components/table/table-demo';
import {TableData} from './components/table/table-data';
import {Buttons} from './components/buttons/buttons';
import {Editable} from './components/editable/editable';

let gettingStarted = require('./getting-started.md');

@Component({
  selector: 'app',
  template: `
  <main class="bd-pageheader">
    <div class="container">
      <h1>ng2-table</h1>
      <p>Native Angular2 directives for Table</p>
      <a class="btn btn-primary" href="https://github.com/valor-software/ng2-table">View on GitHub</a>
      <div class="row">
        <div class="col-lg-1"><iframe src="https://ghbtns.com/github-btn.html?user=valor-software&repo=ng2-table&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe></div>
        <div class="col-lg-1"><iframe src="https://ghbtns.com/github-btn.html?user=valor-software&repo=ng2-table&type=fork&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe></div>
      </div>
    </div>
  </main>

  <div class="container">
    <section id="getting-started">${gettingStarted}</section>

    <table-section class="col-md-12"></table-section>
  </div>

  <footer class="footer">
    <div class="container">
      <p class="text-muted text-center"><a href="https://github.com/valor-software/ng2-table">ng2-table</a> is maintained by <a href="https://github.com/valor-software">valor-software</a>.</p>
    </div>
  </footer>
  `
})
export class Demo {
}

@NgModule({
  providers: [ ComponentLoaderFactory, PositioningService, BsDropdownConfig ],
  imports: [
    BrowserModule, FormsModule, TabsModule.forRoot(), TableModule, PaginationModule.forRoot(), BsDropdownModule ],
  declarations: [ Demo, TableSection, TableDemo, Editable, Buttons ],
  entryComponents: [ Editable, Buttons ],
  bootstrap: [ Demo ]
})
export class AppModule { }

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
