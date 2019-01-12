import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MyTvComponent } from "./my-tv/my-tv.component";
import { TopTvComponent } from "./top-tv/top-tv.component";
import { PopularTvComponent } from "./popular-tv/popular-tv.component";

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'my-tv',
                component: MyTvComponent
            },
            {
                path: 'top-tv',
                component: TopTvComponent
            },
            {
                path: 'popular-tv',
                component: PopularTvComponent
            },
            {
                path: '',
                redirectTo: 'my-tv',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContentRoutingModule { }