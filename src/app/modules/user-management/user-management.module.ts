import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { userManagementRoutes } from '../user-management/user-management.routing';
import { UserListComponent } from './list/user-list.component';
import { AddUserComponent } from './add/add-user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, DatePipe } from '@angular/common';
import { ComponentsModule } from '@components/components.module';

@NgModule({
    declarations: [
        UserListComponent,
        AddUserComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(userManagementRoutes),
        SharedModule,
        NgbModule,
        ComponentsModule,
    ],
    exports: [],
})

export class UserManagementModule {
}
