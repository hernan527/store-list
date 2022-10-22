import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges,AfterViewInit, OnDestroy {
  img: string = '';

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('img')
  set changeImg(newImg: string) {
    this.img = newImg;
    // console.log('change just img  =>' ,this.img);
    // code
  }
  @Input() alt: string = '';

@Output() loaded = new EventEmitter<string>();
imageDefault = './assets/images/default.png';
// counter = 0;
// counterFn: number | undefined;
constructor() { 
    // before render
    // NO async -- once time
    // console.log('constructor', 'imgvalue =>', this.img);
  }

  ngOnChanges(changes: SimpleChanges) {
    // before - during render
    // changes inputs -- multiples times
    // console.log('ngOnChanges', 'imgValue =>', this.img);
    // console.log('changes', changes);
    // if (changes.) {
    //   // code
    // }
  }

  ngOnInit(): void {
    // before render
    // async - fetch -- once time
    // console.log('ngOnInit', 'imgvalue =>', this.img);
  //   window.setInterval(() => {
  //   this.counter += 1;
  //   console.log('run counter');
  // },1000)
  }

  ngAfterViewInit(){
    // after render
    // handler 
    // console.log('ngAfterViewInit');
}

ngOnDestroy(): void {
  // delete 
  // console.log('ngOnDestroy');
  // window.clearInterval(this.counterFn);
}

imgError()
{
  // console.log('log hijo');
  this.img = this.imageDefault;
}

imgLoaded(){
  // console.log('log hijo');
  this.loaded.emit(this.img);
  }
}
