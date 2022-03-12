import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainTableComponent } from './pages/main-table/main-table.component';
import { ListDetailComponent } from './pages/list-detail/list-detail.component';

const routes: Routes = [
  { path: "", component: MainTableComponent },
  { path: "details-character/:id", component: ListDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
