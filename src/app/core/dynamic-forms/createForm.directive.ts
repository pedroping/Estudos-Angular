import { Directive, Inject, Input, OnInit, ViewContainerRef } from '@angular/core';
import { ComponentFields, DYNAMIC_FORMS, DynamicFormConfig } from './dForms-tokens';

@Directive({
  selector: '[appCreateForm]',
})
export class CreateFormDirective implements OnInit{
  
  @Input() FormConfig!: DynamicFormConfig
  
  constructor(
    @Inject(DYNAMIC_FORMS) private forms: ComponentFields,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    console.log("Teste");
    
    const FormComp = this.viewContainerRef.createComponent(this.forms[this.FormConfig.type])
    FormComp.instance.formConfig = this.FormConfig
  }
}
