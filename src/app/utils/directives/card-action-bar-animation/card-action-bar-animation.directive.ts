import { Directive, ElementRef, HostListener } from '@angular/core';
import { GestureController } from '@ionic/angular';

@Directive({
  selector: '[appCardActionBarAnimation]'
})
export class CardActionBarAnimationDirective {
  private _longPressActive = false;
  private _dropDownActive = false;
  constructor(private _el: ElementRef,
    private _gestureCtrl: GestureController) {

    this.bindLongPress();
  }

  private bindLongPress() {
    const gesture = this._gestureCtrl.create({el: this._el.nativeElement,gestureName: 'long-press',threshold:0,
      onStart: () => {
        this._longPressActive = true;
        this.countPressDuration(0, this._el);},
      onEnd: () => { 
        this._longPressActive = false;}})
    gesture.enable(true);
  }

  private countPressDuration(pressDuration: number, element: ElementRef) {
    setTimeout(() => {
      if (this._longPressActive) {
        pressDuration++;
        if (pressDuration > 3) {
          this._longPressActive = false;
          const lastChild = element.nativeElement.lastChild;
          if (!this._dropDownActive) {
            this._dropDownActive = true;
            lastChild.animate([{ transform: 'translateY(-100%)', height: 0, opacity: 0 },
                { opacity: 0},
                { transform: 'translateY(0)', height: 'initial', opacity: 1 }],
              {duration: 500,fill: 'forwards', easing: 'ease-out'});
            }} else { this.countPressDuration(pressDuration, element);
            }}}, 300);
  }
  @HostListener('click')
  private cardTouched() {
    console.log(this._el);
    const lastChild = this._el.nativeElement.lastChild;
    if (this._dropDownActive) {
      this._dropDownActive = false;
      lastChild.animate(
        [
          { transform: 'translateY(0)', height: 'initial', opacity: 1},
          {
            opacity: 0
          },
          { transform: 'translateY(-100%)', height: '0', opacity: 0 }
        ],
        {
          duration: 500,
          fill: 'forwards',
          easing: 'ease-out'
        });
    }
  }

}
