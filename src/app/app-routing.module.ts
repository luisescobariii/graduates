import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './layout/upload/upload.component';
import { VisualizationComponent } from './layout/visualization/visualization.component';

const routes: Routes = [
    { path: '', redirectTo: 'visualization/1', pathMatch: 'full' },
    { path: 'visualization/:id', component: VisualizationComponent },
    { path: 'admin', component: UploadComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
