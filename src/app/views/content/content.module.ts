import { NgModule } from '@angular/core';

import { MyTvComponent } from './my-tv/my-tv.component';
import { TopTvComponent } from './top-tv/top-tv.component';
import { CommonModule } from '@angular/common';
import { ContentRoutingModule } from './content-routing.module';
import { PopularTvComponent } from './popular-tv/popular-tv.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SearchComponent } from './search/search.component';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
    imports: [
        CommonModule,
        ContentRoutingModule,
        InfiniteScrollModule,
        SharedModule
    ],
    declarations: [
        MyTvComponent,
        TopTvComponent,
        PopularTvComponent,
        SearchComponent
    ],
    exports: [],
    providers: []
})
export class ContentModule { }
