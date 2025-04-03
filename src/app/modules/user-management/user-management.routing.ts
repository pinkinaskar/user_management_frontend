import { Route } from '@angular/router';
import { UserListComponent } from './list/user-list.component';
import { AddUserComponent } from './add/add-user.component';


export const userManagementRoutes: Route[] = [     
            { path: '', component: UserListComponent },
            { path: 'add', component: AddUserComponent },
            { path: 'edit/:id', component: AddUserComponent },
            ];
