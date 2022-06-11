import {Component, OnInit} from '@angular/core';
import {ImageServiceService, IResponseImage} from './services/image-service.service';
import {mergeMap, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

interface IImageView {
  url: URL;
  alt: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  images$ = this.imageService.images$
    .pipe(
      mergeMap((images: IResponseImage[]): Observable<IImageView[]> => {
        return of(images.map(image => {
            return {
              url: new URL(`https://picsum.photos/id/${image.id}/600/600`),
              alt: image.author
            };
          })
        );
      }),
    );

  nextImages$ = this.imageService.nextImages$
    .pipe(
      mergeMap((images: IResponseImage[]): Observable<IImageView[]> => {
        return of(images.map(image => {
            return {
              url: new URL(`https://picsum.photos/id/${image.id}/600/600`),
              alt: image.author
            };
          })
        );
      }),
    );

  constructor(
    private imageService: ImageServiceService
  ) {
  }

  ngOnInit(): void {
  }

  getImages(): void {
    this.imageService.setPage();
  }
}
