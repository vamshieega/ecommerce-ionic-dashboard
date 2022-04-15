import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'highlightSearch'
})
export class HighlightSearchPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        const splitArg = args.split(' ');
        if (!args) {
            return value;
        }
        const re = new RegExp(splitArg.join('|'), 'gi');
        return value.replace(re, "<b>$&</b>");
    }

}
