import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Results } from '../../models/response.models';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss'],
})
export class ListDetailComponent implements OnInit, OnDestroy {
  character!: Partial<Results>;
  id!: string;
  private _subscription$: Subscription = new Subscription();

  constructor(
    private _apiService: ApiService,
    private _activatedRoute: ActivatedRoute,
    private _route: Router
  ) {}

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.paramMap.get('id') || '';
    if (this.id) {
      this.getCharacter();
    }
  }

  ngOnDestroy(): void {
    this._subscription$.unsubscribe();
  }

  getCharacter() {
    this._subscription$ = this._apiService
      .getSingleCharacter(this.id)
      .subscribe((character: Partial<Results>) => {
        this.character = character;
      }, ()=>{
          this._route.navigate([''])
      });
  }
}
