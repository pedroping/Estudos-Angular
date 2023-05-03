import { Directive, ElementRef, HostBinding, Input, OnInit, Optional, Renderer2 } from '@angular/core';
import { AbstractControl, ControlContainer, FormControl, NgControl, Validators } from '@angular/forms';
import { debounceTime, startWith } from 'rxjs';

export const ERRORS: {[key: string]: any} = {
  required: {
    messageFn: () => {
      return "Esse campo é obrigatorio!"
    }
  },
  maxlength: {
    messageFn: (paramns?: string) => {
      return `O tamanho maximo é ${paramns}`
    }
  },
  minlength: {
    messageFn: (paramns?: string) => {
      return `O tamanho minimo é ${paramns} `
    }
  },
  email: {
    messageFn: () => {
      return `Email invalido!`
    }
  },
  max: {
    messageFn: (paramns: string) => {
      return `O valor maximo é ${paramns}`
    }
  },
  min: {
    messageFn: (paramns: string) => {
      return `O valor minimo é ${paramns}`
    }
  },
  not_allowed_characters: {
    messageFn: (paramns: string) => {
      return `Caracter ${paramns} invalido!`
    }
  }
};

@Directive({
  selector: '[FormError]',
})

export class FormErrorDirective implements OnInit {
  @Input() formcontrol?: FormControl;
  @Input() formcontrolName?: string;
  @HostBinding('innerHTML') innerHTML?: string;

  form = new FormControl('', [
    Validators.required,
    Validators.maxLength(10),
    Validators.minLength(1),
    Validators.email,
    Validators.max(1000),
    Validators.min(1000),
  ])

  constructor(
    @Optional() private controlContainer: ControlContainer,
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    if(this.controlContainer && this.formcontrolName){
      const Control = this.controlContainer?.control?.get(this.formcontrolName)
      if(!Control) return
      Control.valueChanges.subscribe(() => this.validatForm(Control))
      return
    }
    this.formcontrol!.valueChanges.pipe(startWith(this.formcontrol?.value)).subscribe(() => this.validatForm(this.formcontrol!))
  }

  validatForm(Control: AbstractControl | FormControl){
    this.setInnerHTML('')
    Control.markAsTouched()
    Control.markAsDirty()
    Object.keys(ERRORS).forEach(key => {
      if(Control.hasError(key)){
        if(key == 'maxlength' || key == 'minlength') return this.setInnerHTML(`<small>${ERRORS[key].messageFn(Control.errors![key].requiredLength)}</small>`)  
        if(key == 'max')  return this.setInnerHTML(`<small>${ERRORS[key].messageFn(Control.errors![key].max)}</small>`)  
        if(key == 'min')  return this.setInnerHTML(`<small>${ERRORS[key].messageFn(Control.errors![key].min)}</small>`) 
        if(key == 'not_allowed_characters') return this.setInnerHTML(`<small>${ERRORS[key].messageFn(Control.errors![key][0])}</small>`) 
        this.setInnerHTML(`<small>${ERRORS[key].messageFn()}</small>`)  
      }
    })
  } 

  private setInnerHTML(html: string): void {
    this.innerHTML = html;
  }
}
