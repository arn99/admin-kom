  import { ExceptionModalComponent } from './../../components/exception-modal/exception-modal.component';
  import { NgModule } from '@angular/core';
  import { Routes, RouterModule } from '@angular/router';


  const routes: Routes = [
    { path: '', component: ExceptionModalComponent }
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ExceptionModalRoutingModule { }
