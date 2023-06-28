import { Directive, Inject, Input, OnInit, ViewContainerRef } from '@angular/core';
import { ComponentFields, DYNAMIC_FORMS, DynamicControl, DynamicFormConfig } from './dForms-tokens';

@Directive({
  selector: '[appCreateForm]',
})
export class CreateFormDirective<T> implements OnInit{
  
  @Input() FormConfig!: T
  
  constructor(
    @Inject(DYNAMIC_FORMS) private forms: ComponentFields<DynamicControl<T>>,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    const FormConfigType = this.FormConfig as T & {
      type: string
    }
    const FormComp = this.viewContainerRef.createComponent(this.forms[FormConfigType.type])
    FormComp.instance.formConfig = this.FormConfig
  }
}
