import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListingComponent } from "./pages/listing/listing.component";
import { BookingComponent } from "./pages/booking/booking.component";

const routes: Routes = [
  {path: '', component: BookingComponent},
  {path: 'Lists', component: BookingComponent},
  {path: 'Booking', component: ListingComponent},
  {path: 'Booking/:id', component: ListingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
