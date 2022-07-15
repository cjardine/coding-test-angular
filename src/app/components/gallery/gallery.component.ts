import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {IQuote} from '../../services/quote.service';
import {IImageView} from '../../services/image-service.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  @Input() images$!: Observable<IImageView[]>;
  @Input() quotes$!: Observable<IQuote[]>;
  constructor() { }

  ngOnInit(): void {
  }

}
