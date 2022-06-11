import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

export interface IResponseImage {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {
  #currentPage: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  #currentPageObservable: Observable<number> = this.#currentPage.asObservable();
  #nextPage: BehaviorSubject<number> = new BehaviorSubject<number>(2);
  #nextPageObservable: Observable<number> = this.#nextPage.asObservable();
  #imagesPerPage = 6;

  images$: Observable<IResponseImage[]> = this.#currentPageObservable.pipe(
    switchMap((page) => {
      return this.http.get<IResponseImage[]>(this.fetchUrl);
    })
  );

  nextImages$: Observable<IResponseImage[]> = this.#nextPageObservable.pipe(
    switchMap((page) => {
      return this.http.get<IResponseImage[]>(this.fetchNextUrl);
    })
  );

  get fetchUrl(): string {
    return `https://picsum.photos/v2/list?page=${this.#currentPage.value}&limit=${this.#imagesPerPage}`;
  }

  get fetchNextUrl(): string {
    return `https://picsum.photos/v2/list?page=${this.#nextPage.value}&limit=${this.#imagesPerPage}`;
  }


  constructor(
    private http: HttpClient
  ) {
  }

  setPage(page?: number | undefined): void {
    if (page === undefined) {
      this.#currentPage.next(this.#currentPage.value + 1);
      this.#nextPage.next(this.#nextPage.value + 1);
      return;
    }
    this.#currentPage.next(page);
    this.#nextPage.next(page + 1);
    return;
  }

}
