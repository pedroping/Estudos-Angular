import { Directive, ElementRef, HostBinding, Input, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, ControlContainer, FormControl, NgControl, Validators } from '@angular/forms';

export const ERRORS: {[key: string]: any} = {
  required: {
    messageFn: () => {
      return "Esse campo é obrigatorio!"
    }
  },
  maxLength: {
    messageFn: (paramns?: string) => {
      return `O tamanho maximo é ${paramns}`
    }
  },
  minLength: {
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
};

@Directive({
  selector: '[FormError]',
})

export class FormErrorDirective implements OnInit {
  @Input() formcontrol?: FormControl;
  @Input() formControlName?: string;
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
    private controlContainer: ControlContainer,
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    if(this.formControlName){
      const Control = this.controlContainer.control?.get(this.formControlName)
      if(!Control) return
      Control.valueChanges.subscribe(() => this.validatForm(Control))
    }

    this.formcontrol!.valueChanges.subscribe(() => this.validatForm(this.formcontrol!))
  }

  validatForm(Control: AbstractControl | FormControl){
    this.setInnerHTML('')
    Object.keys(ERRORS).forEach(key => {
      if(Control.hasError(key)){
        this.setInnerHTML(`<small>${ERRORS[key].messageFn()}</small>`)  
      }
    })
  } 

  private setInnerHTML(html: string): void {
    this.innerHTML = html;
  }
}
