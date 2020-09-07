import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { Router } from '@angular/router';

import { ListsService } from "../lists.service";

import { List } from "../list.model";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit, OnDestroy {

  @Input() lists: List[] = [];
  moviesInfo = [];

  private listsSub: Subscription;

  constructor(public listsService: ListsService, private router: Router ) {

    this.listsService.getAllMovies().
    subscribe(
      res =>{
        this.moviesInfo  =res['data'];
      }
    )
  }

  ngOnInit(): void {
    this.listsService.getLists()
    this.listsSub = this.listsService.getListUpdateListener()
    .subscribe((lists: List[]) => { this.lists = lists;
    console.log(this.lists);

    });
  }
  ngOnDestroy() {
    this.listsSub.unsubscribe();
  }
  bookTickets(item) {
    this.router.navigate(['Booking', item._id]);
  }
}
