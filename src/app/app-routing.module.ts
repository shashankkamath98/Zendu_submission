import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { FormsComponent } from './forms/forms.component';
import { CustomersComponent } from './customers/customers.component';
import { SubmissionsComponent } from './submissions/submissions.component';
import { HistoryComponent } from './history/history.component';
import { ReportsComponent } from './reports/reports.component';
import { WorkflowComponent } from './workflow/workflow.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo:'body',
  //   pathMatch:'full'
  // },

  { 
    path: 'body', 
    component: BodyComponent,
 
  },
  { 
    path: 'forms', 
    component: FormsComponent,
 
  },
  {
    path:'customers',
    component:CustomersComponent
  },

  {
    path:'submissions',
    component:SubmissionsComponent
  },
  {
    path:'history',
    component:HistoryComponent
  },
  { 
    path: 'reports', 
    component: ReportsComponent,
 
  },
  {
    path:'workflow',
    component:WorkflowComponent
  },
  {
    path:'**',
    component:NotfoundComponent

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
