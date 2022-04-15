import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightSearchPipe } from '../highlight-search.pipe';
import { SafeHtmlPipe } from '../safe-html.pipe';
import { SafePipe } from '../safe.pipe';

const CUSTOM_PIPE = [
  HighlightSearchPipe,
  SafeHtmlPipe,
  SafePipe
]

@NgModule({
  declarations: [CUSTOM_PIPE],
  imports: [
    CommonModule
  ],
  exports: [CUSTOM_PIPE]
})
export class CustomPipeModule { }
