import { NgModule } from '@angular/core';


import { ErrorComponent } from './views/error/error.component';
import { LoadingComponent } from './views/loading/loading.component';


@NgModule({
    imports: [],
    declarations: [
        ErrorComponent,
        LoadingComponent
    ],
    exports: [
        ErrorComponent,
        LoadingComponent
    ],
    providers: [],
})
export class SharedModule { }
