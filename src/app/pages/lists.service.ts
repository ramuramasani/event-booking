import { Injectable } from '@angular/core';
import { List } from "./list.model";
import { Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({ providedIn: 'root' })

export class ListsService {
  private lists: List[] = [];
  private listsUpdated = new Subject<List[]>();
  moviesInfo;
  constructor(private httpClient: HttpClient) {
    // this.moviesInfo = [
    //   { id: 1, image: "https://www.bing.com/th?id=AMMS_fc13b208146d1cf0d5db18c8b8701898&w=120&h=180&c=7&rs=1&qlt=80&cdv=1&pid=16.1", availableSeats: 20, },
    //   { id: 2, image: "https://www.bing.com/th?id=AMMS_0a74d610eeb3b65a61a8ebceb9f78bda&w=120&h=180&c=7&rs=1&qlt=80&cdv=1&pid=16.1", availableSeats: 20, },
    //   { id: 3, image: "https://www.bing.com/th?id=AMMS_4e1941352f1b50e71c6931c2688e8c17&w=113&h=170&c=7&rs=1&qlt=80&pcl=f9f9f9&cdv=1&pid=16.1", availableSeats: 20, },
    //   { id: 4, image: "https://i.pinimg.com/originals/19/b3/b4/19b3b4eec1be9f8966c9a343bdfdeee0.jpg", availableSeats: 20, },
    //   { id: 5, image: "https://www.bing.com/th?id=AMMS_6344bf6c93279d1e8e2796593d0c1fa5&w=120&h=180&c=7&rs=1&qlt=80&cdv=1&pid=16.1", availableSeats: 20, },
    //   { id: 6, image: "https://www.bing.com/th?id=AMMS_8151192eef92608c9869c1628ed9c122&w=120&h=180&c=7&rs=1&qlt=80&cdv=1&pid=16.1", availableSeats: 20, },
    //   { id: 7, image: "https://th.bing.com/th/id/OIP.8wcqL-Y5p5mkxAzihmMssQHaLk?w=115&h=180&c=7&o=5&pid=1.7", availableSeats: 20, },
    //   { id: 8, image: "https://th.bing.com/th/id/OIP.kjLm40rB8O5MPV1-GQtxSgHaJQ?w=129&h=180&c=7&o=5&pid=1.7", availableSeats: 20, }
    // ];
  }

  serverUrl = "http://localhost:3000/";

  getLists() {
    this.httpClient.get<{ message: string, lists: any }>('http://localhost:3000/lists')
      .pipe(map((listData) => {
        return listData.lists.map(list => {
          return {
            id: list._id,
            name: list.name,
            email: list.email,
            phone: list.phone,
            seats: list.seats,
            attendee: list.attendee
          }
        })
      }))
      .subscribe((transformedLists) => {
        this.lists = transformedLists;
        this.listsUpdated.next([...this.lists]);
      });
  }

  getListUpdateListener() {
    return this.listsUpdated.asObservable();
  }

  addList( name: string, email: string, phone: string, seats: string, attendee: string) {
    const list: List = { id: null, name: name, email: email, phone: phone, seats: seats, attendee: attendee };
    this.httpClient.post<{ message: string }>('http://localhost:3000/lists', list)
      .subscribe((responseDate) => {
        console.log(responseDate.message);
        this.lists.push(list);
        this.listsUpdated.next([...this.lists]);
      });
  }

  // Static

  bookSeats(formData) {
    let noOfSeats = formData.Seats;
    let id = formData.id;

    return this.httpClient.post(this.serverUrl+"book/", formData);

    // this.moviesInfo.forEach(element => {
    //   if (id == element.id) {
    //     element.availableSeats = element.availableSeats - parseInt(noOfSeats);
    //   }
    // });

  }

  getMovieInfo(id) {
    // let data;
    // this.moviesInfo.forEach(element => {
    //   if (id == element.id) {
    //     data = element
    //   }
    // });
    // return data;

    return this.httpClient.get(this.serverUrl+"data/"+id);

  }

  getAllMovies(){
    return this.httpClient.get(this.serverUrl+"data/");
  }
}
