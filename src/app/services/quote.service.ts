import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export interface IQuote {
  text: string;
  author: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  #quotes: BehaviorSubject<IQuote[]> = new BehaviorSubject<IQuote[]>([]);
  quotes$: Observable<IQuote[]> = this.#quotes.asObservable();
  #quotesPage: BehaviorSubject<IQuote[]> = new BehaviorSubject<IQuote[]>([]);
  quotesPage$: Observable<IQuote[]> = this.#quotesPage.asObservable();

  constructor(
    private http: HttpClient
  ) {
    this.http.get<IQuote[]>('https://type.fit/api/quotes')
      .subscribe(quotes => {
        console.log(`quoteService quotes`, quotes);
        this.#quotes.next(quotes);
      });
  }

  setQuotesPage(pageInfo: [number, number]): void {
    const quotesLength = this.#quotes.value.length;
    const [page, imagesPerPage] = pageInfo;
    const startOffset = (page * imagesPerPage) % quotesLength;
    const endOffset = (page * imagesPerPage + imagesPerPage % quotesLength);
    const allQuotes = this.#quotes.value;
    const pageQuotes = allQuotes.slice(startOffset, endOffset);
    this.#quotesPage.next(pageQuotes);
  }
}
