import {Component, OnInit} from '@angular/core';
import {ImageServiceService} from './services/image-service.service';
import {QuoteService} from './services/quote.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  quotes$ = this.quoteService.quotesPage$;

  images$ = this.imageService.images$;

  nextImages$ = this.imageService.nextImages$;

  constructor(
    private imageService: ImageServiceService,
    private quoteService: QuoteService,
  ) {
  }

  ngOnInit(): void {
  }

  getImages(): void {
    this.imageService.setPage();
  }
}
