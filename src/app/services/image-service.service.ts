import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, combineLatest, Observable, of} from 'rxjs';
import {mergeMap, switchMap} from 'rxjs/operators';
import {IQuote, QuoteService} from './quote.service';

export interface IResponseImage {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}


export interface IImageView {
  url: URL;
  alt: string;
  link: URL;
  quote: IQuote;
}


@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {
  private quotes$: IQuote[] = [];
  #currentPage: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  #currentPageObservable: Observable<number> = this.#currentPage.asObservable();
  #nextPage: BehaviorSubject<number> = new BehaviorSubject<number>(2);
  #nextPageObservable: Observable<number> = this.#nextPage.asObservable();
  #imagesPerPage = 6;

  images$: Observable<IImageView[]> = combineLatest([this.#currentPageObservable, this.quoteService.quotesPage$])
    .pipe(
    switchMap(([page, quotes]) => {
      if (!quotes.length) { return of([]); }
      return this.http.get<IResponseImage[]>(this.fetchUrl(page));
    }),
    mergeMap((images: IResponseImage[]): Observable<IImageView[]> => {
      return of(images.map(this.generateImage.bind(this))
      );
    }),
  );

  nextImages$: Observable<IImageView[]> = combineLatest([this.#nextPageObservable, this.quoteService.quotesPage$])
    .pipe(
    switchMap(([page, quotes]) => {
      if (!quotes.length) { return of([]); }
      return this.http.get<IResponseImage[]>(this.fetchUrl(page));
    }),
    mergeMap((images: IResponseImage[]): Observable<IImageView[]> => {
      return of(images.map(this.generateImage.bind(this))
      );
    }),
  );

  generateImage(image: IResponseImage, index: number): IImageView {
    const quote = this.quotes$[index];
    return {
      url: new URL(`https://picsum.photos/id/${image.id}/600/600`),
      alt: image.author,
      link: new URL(image.url),
      quote
    };
  }


  fetchUrl(page: number): string {
    return `https://picsum.photos/v2/list?page=${page}&limit=${this.#imagesPerPage}`;
  }

  constructor(
    private http: HttpClient,
    private quoteService: QuoteService
  ) {
    this.quoteService.quotesPage$
      .subscribe(quotes => {
        console.log(`quotes`, quotes);
        this.quotes$ = quotes;
      });

    combineLatest([this.#currentPageObservable, this.quoteService.quotes$])
          .subscribe(([page, quotes]) => {
            if (!quotes.length) { return; }
            this.quoteService.setQuotesPage([page, this.#imagesPerPage]);
          });
  }

  setPage(page?: number | undefined): void {
    if (page === undefined) {
      const currentPage = this.#currentPage.value + 1;
      const nextPage = this.#nextPage.value + 1;
      this.#currentPage.next(currentPage);
      this.#nextPage.next(nextPage);
      return;
    }
    this.#currentPage.next(page);
    this.#nextPage.next(page + 1);
    return;
  }

}
