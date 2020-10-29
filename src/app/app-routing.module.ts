import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisualizationComponent } from './layout/visualization/visualization.component';

const routes: Routes = [
    { path: 'visualization/:id', component: VisualizationComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
