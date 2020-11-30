import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appAnimateDropdown]'
})
export class AnimateDropdownDirective implements OnInit {

  private _icon;
  private dropped = false;
  private _cardContent;
  constructor(private _el: ElementRef) { 
  }

  ngOnInit(): void {
    this._cardContent = this._el.nativeElement.querySelector('ion-card-content');
    this._icon = this._el.nativeElement.querySelector('ion-card-header > ion-item > ion-icon');

    this._icon.addEventListener('click',this.bindIconDropDownAnimation.bind(this))
  }

  private bindIconDropDownAnimation() {
    if(!this.dropped) {
      this._cardContent.animate([{maxHeight:0},{maxHeight:'500px'}],
      {
        duration: 500,
        fill: 'forwards',
        easing: 'ease-out'
      })
      this._icon.animate([{},{transform:'rotate(90deg)'}],{
        duration:300,
        fill:'forwards',
        easing:'linear'
      })
      this.dropped = !this.dropped;
    } else {
      this._cardContent.animate([{},{maxHeight:0}],
      {
        duration: 500,
        fill: 'forwards',
        easing: 'ease-out'
      })
      this._icon.animate([{},{transform:'rotate(0)'}],{
        duration:300,
        fill:'forwards',
        easing:'linear'
      })
      this.dropped = !this.dropped;
    }
      
        
  }
}
