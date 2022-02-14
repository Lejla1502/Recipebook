import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective {

  //injecting view contaimer ref- object managed internally by Angular which gives Angular a reference, a pointer, 
  //to the place in the DOM with which it can interact 

  //this automatically gives us access to ref at the place where this directive is used
  constructor(public viewContainerRef:ViewContainerRef) { } 


}
