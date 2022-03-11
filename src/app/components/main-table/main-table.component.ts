import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Paginate } from 'src/app/models/paginate.interface';
import { Response } from 'src/app/models/response.models';
import { ApiService } from '../../services/api.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss'],
})
export class MainTableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'gender'];
  dataSource = new MatTableDataSource<any>();
  private _subscription$: Subscription = new Subscription();

  constructor(private _apiService: ApiService) {}

  ngOnInit(): void {
    this.getListCharacters();
  }

  ngOnDestroy(): void {
    this._subscription$.unsubscribe();
  }

  getListCharacters(eventPaginate: Paginate = {}) {
    const paginate = Object.assign(
      {
        length: 0,
        pageIndex: 0,
        pageSize: 20,
        previousPageIndex: 0,
      },
      eventPaginate
    );
    this._subscription$ = this._apiService
      .getCharacters(paginate.pageIndex + 1)
      .subscribe((resp: Response ) => {
        let list = [];
        this.dataSource = new MatTableDataSource();
        list.push(...resp.results);
        this.dataSource.data = list;
        this.dataSource = new MatTableDataSource(list);
      });
  }
}
