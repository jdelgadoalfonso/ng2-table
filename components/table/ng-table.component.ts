import {Component, Directive, EventEmitter, ElementRef, Renderer, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'ngTable, [ngTable]',
  inputs: ['rows', 'columns', 'config', 'id', 'cSelectAll', 'setResponsive'],
  outputs: ['tableChanged'],
  styles: [`
    .table > thead > tr > th {
      cursor: pointer;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  `],
  template: `
    <div class="table-responsive" [ngClass]="{'table-responsive': setResponsive}">
      <table class="table table-striped table-bordered dataTable"
             role="grid" style="width: 100%;">
        <thead>
        <tr role="row">
          <th *ngFor="let column of columns; let i = index" [ngStyle]="{'display' : (column.configurable && !column.show) ? 'none' : 'normal'}" [ngTableSorting]="config" [column]="column" (sortChanged)="onChangeTable($event)">
            <div style="display: flex;">
              <dclcomponent *ngIf="i === cSelectAll.index" [identifier]="{column: column.name}" [type]="cSelectAll.component" [init]="cSelectAll.init"></dclcomponent>
              {{column.title}}
              <span *ngIf="config && column.sort" style="margin-left: 5px;"></span>
              <i *ngIf="config && column.sort" class="glyphicon" style="margin-left: auto;"
                [ngClass]="{'glyphicon-chevron-down': column.sort === 'desc', 'glyphicon-chevron-up': column.sort === 'asc'}">
              </i>
            </div>
          </th>
        </tr>
        </thead>
        <tbody>
          <ng-template [ngIf]="rows && rows.length > 0" [ngIfElse]="empty_content">
            <tr *ngFor="let row of rows" [ngStyle]="row?.ngStyle">
              <td *ngFor="let column of columns" [ngStyle]="{'display' : (column.configurable && !column.show) ? 'none' : 'normal'}">
                <dclcomponent [identifier]="{row: row[id], column: column.name}" [type]="column.component" [init]="column.init" [data]="row[column.name]"></dclcomponent>
              </td>
            </tr>
          </ng-template>
          <ng-template #empty_content>
            <tr>
              <td [attr.colspan]="columns?.length" style="text-align: center">
                There are no results that match your search or list is empty
              </td>
            </tr>
          </ng-template>
        </tbody>
      </table>
    </div>
`
})
export class NgTable {
  // Table values
  public rows:Array<any> = [];
  private _columns:Array<any> = [];
  public config:any = {};
  public id:string = 'id';
  public cSelectAll:any = {};

  // Outputs (Events)
  public tableChanged:EventEmitter<any> = new EventEmitter();

  ngOnChanges(changes: SimpleChanges) {
    let value = 'columns';
    if (changes[value]) {
      this._columns = changes[value].currentValue;
    }
  }

  public set columns(values:Array<any>) {
    values.forEach((value) => {
      let column = this._columns.find((col) => col.name === value.name);
      if (column) {
        Object.assign(column, value);
      } else {
        this._columns.push(value);
      }
    });
  }

  public get columns() {
    return this._columns;
  }

  public get configColumns() {
    let sortColumns:Array<any> = [];

    this.columns.forEach((column) => {
      if (column.sort) {
        sortColumns.push(column);
      }
    });

    return {columns: sortColumns};
  }

  onChangeTable(column:any) {
    this._columns.forEach((col) => {
      if (col.name !== column.name && col.sort !== false) {
        col.sort = '';
      }
    });
    this.tableChanged.emit({sorting: this.configColumns});
  }
}
