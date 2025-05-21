import { Directive, ElementRef, HostListener, Provider, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// register our direction with Angular as an ng value provider
// this will allow us to use the directive in our template
// and bind to the value of the input
const DATE_VALUE_PROVIDER: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateValueAccessorDirective),
  // there are multiple providers registered as ng value provider accessors
  multi: true,
}

@Directive({
  selector: 'input([type=date])[formControlName], input([type=date])[formControl], input([type=date])[ngModel]',
  providers: [DATE_VALUE_PROVIDER],
})
export class DateValueAccessorDirective implements ControlValueAccessor {

  constructor(private element: ElementRef) { }

  @HostListener('input', ['$event.target.valueAsDate'])
  private onChange!: Function;

  registerOnChange(fn: Function ) {
    this.onChange = (valueAsDate: Date) => { fn(valueAsDate)}
  }
   @HostListener('blur')
  private onTouched!: Function;

  registerOnTouched(fn: Function) {
    // this is called when the input is blurred
    this.onTouched = fn;
  }

  writeValue(newValue: any) {
    //yyyy-mm-dd
    if(newValue instanceof Date) { 
      // toISOString create a date time string that looks like yyyy-mm-ddT00:00:00.000Z
      this.element.nativeElement.value = newValue.toISOString().split('T')[0]; 
    }
    
  }

}
