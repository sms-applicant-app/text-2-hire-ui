import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-store-interview',
  templateUrl: './store-interview.page.html',
  styleUrls: ['./store-interview.page.scss'],
})
export class StoreInterviewPage implements OnInit {
  formUrl = 'https://form.typeform.com/to/JEHf3wpl';
  interval;
  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit() {
    this.interval = setInterval(() => {
      const widget = this.renderer.createElement('typeform-widget');
      widget.setAttribute('url', this.formUrl);
      this.renderer.appendChild(this.el.nativeElement, widget);
    }, 5000);
  }

}
