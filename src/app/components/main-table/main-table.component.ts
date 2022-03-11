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
  searchName!: string;
  searchGender!: string;
  genders: string[] = ['female', 'male', 'genderless', 'unknown'];
  displayedColumns: string[] = ['id', 'name', 'gender'];
  dataSource = new MatTableDataSource<any>();
  totalItem!: number;
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
    let searchers = this.filtersEvent().join('');
    this._subscription$ = this._apiService
      .getCharacters(paginate.pageIndex + 1, searchers)
      .subscribe(
        (resp: Response) => {
          let list = [];
          this.dataSource = new MatTableDataSource();
          list.push(...resp.results);
          this.dataSource.data = list;
          this.dataSource = new MatTableDataSource(list);
          this.totalItem = resp.info.count;
        },
        () => {
          console.log('no hay nada');
        }
      );
  }

  filtersEvent(): string[] {
    let filtersArray = []
    if (this.searchName) {
      filtersArray.push(`&name=${this.searchName}`);
    }
    if (this.searchGender) {
      filtersArray.push(`&gender=${this.searchGender}`);
    }
    return filtersArray
  }


}
