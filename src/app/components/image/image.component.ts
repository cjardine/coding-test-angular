import {Component, Input, OnInit} from '@angular/core';
import {IImageView} from '../../services/image-service.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  @Input() image!: IImageView;
  constructor(
  ) { }

  ngOnInit(): void {
  }

}
