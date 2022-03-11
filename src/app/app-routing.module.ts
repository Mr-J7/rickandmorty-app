import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainTableComponent } from './components/main-table/main-table.component';
import { ListDetailComponent } from './components/list-detail/list-detail.component';

const routes: Routes = [
  { path: "", component: MainTableComponent },
  { path: "details-character/:id", component: ListDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
