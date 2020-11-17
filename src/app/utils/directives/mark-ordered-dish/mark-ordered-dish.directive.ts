import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { OrderedDish } from 'src/app/models/orderedDish';

@Directive({
  selector: '[appMarkOrderedDish]'
})
export class MarkOrderedDishDirective implements OnInit{

  @Input('orderedDish')
  private _orderedDish: OrderedDish;

  constructor(private _el: ElementRef,private _renderer: Renderer2) { 
      
  }
  ngOnInit(): void {
    /* console.log(this._orderedDish);
    switch(this._orderedDish.orderDishStatus) {
      case 'inProgress': {
        const parentDiv = this._renderer.createElement('div');
        const newEl = this._renderer.createElement('ion-icon');
        const span = this._renderer.createElement('span');
        this._renderer.setProperty(span,'innerText','W trakcie');
        this._renderer.setAttribute(newEl,'name','timer-outline');
        this._renderer.setAttribute(newEl,'color','warning');

        this._renderer.appendChild(parentDiv,newEl);
        this._renderer.appendChild(parentDiv,span);

        
        this._renderer.appendChild(this._el.nativeElement,parentDiv);
      }break;
      case 'delivered': {
        const newEl = this._renderer.createElement('ion-icon');
        this._renderer.setAttribute(newEl,'name','checkmark-done-outline');
        this._renderer.setAttribute(newEl,'color','light');
        this._renderer.appendChild(this._el.nativeElement,newEl);
      } break;
      case 'ready': {
        const newEl = this._renderer.createElement('ion-icon');
        this._renderer.setAttribute(newEl,'name','alert-outline');
        this._renderer.setAttribute(newEl,'color','success');
        this._renderer.appendChild(this._el.nativeElement,newEl);
      }
    } */
  }

 

}
