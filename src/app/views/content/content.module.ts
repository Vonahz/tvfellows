import { NgModule } from '@angular/core';

import { MyTvComponent } from './my-tv/my-tv.component';
import { TopTvComponent } from './top-tv/top-tv.component';
import { CommonModule } from '@angular/common';
import { ContentRoutingModule } from './content-routing.module';
import { PopularTvComponent } from './popular-tv/popular-tv.component';

@NgModule({
    imports: [CommonModule, ContentRoutingModule],
    exports: [],
    declarations: [MyTvComponent, TopTvComponent, PopularTvComponent],
    providers: []
})
export class ContentModule { }
