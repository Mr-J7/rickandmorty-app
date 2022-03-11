import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../services/api.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss'],
})
export class MainTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'gender'];
  dataSource = new MatTableDataSource<any>();

  constructor(private _apiService: ApiService) {}

  ngOnInit(): void {
    this.getListCharacters();
  }

  getListCharacters(event: any = {}) {
    const paginate = Object.assign({
      length: 0,
      pageIndex: 0,
      pageSize: 20,
      previousPageIndex: 0,
    }, event) 
    this._apiService.getCharacters(paginate.pageIndex + 1).subscribe((resp: any) => {
      let list = [];
      this.dataSource = new MatTableDataSource();
      list.push(...resp.results);
      this.dataSource.data = list;
      this.dataSource = new MatTableDataSource(list);
    });
  }

}
