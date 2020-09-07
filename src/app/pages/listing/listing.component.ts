import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { List } from "../list.model";
import { NgForm } from '@angular/forms';

import { ListsService } from "../lists.service";
import { ActivatedRoute, Router } from '@angular/router';

interface Seat {
  value: number;
  viewValue: number;
}

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  enteredName = '';
  enteredEmail = '';
  enteredPhone = '';
  enteredSeats = '';
  enteredAttendee = '';
  editForm: boolean = true;
  movieId: any = null;
  movieInfo;

  constructor(public listsService: ListsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.params.subscribe(
      (params) => {
        if (params['id']) {
          this.movieId = params['id'];
          // this.getMovieDetails(this.movieId);
          this.listsService.getMovieInfo((this.movieId)).subscribe(
            res =>{
                this.movieInfo = res['data'];
                console.log(this.movieInfo);

            },
            err =>{
              console.log(err);
            }
          )
          // subscribe(
          //   data =>{
          //     this.movieInfo = data;
          //   },
          //   err => {
          //     alert(err)
          //   }
          // );
          this.editForm = true;
        }
      })
   }

  seats: Seat[] = [
    { value: 1, viewValue: 1 },
    { value: 2, viewValue: 2 },
    { value: 3, viewValue: 3 },
    { value: 4, viewValue: 4 },
    { value: 5, viewValue: 5 },
    { value: 6, viewValue: 6 },
  ];


  onClick(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.listsService.addList(
      form.value.Name,
      form.value.Email,
      form.value.Phone,
      form.value.Seats,
      form.value.Attendee,
    );
    form.value._id = this.movieInfo.id;
    this.listsService.bookSeats(form.value).subscribe(
      res =>{
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
    form.resetForm();
    this.router.navigate(['Lists']);
  }

  @Output() listCreated = new EventEmitter<List>();

  ngOnInit(): void {

  }
  getMovieDetails(id) {
    console.log(id);
    this.movieInfo = this.listsService.getMovieInfo(parseInt(id));
  }
  bookingCancel(){
    this.router.navigate(['Lists']);
  }
}
