import { NgModule } from '@angular/core';
import { ClienteService } from './services/cliservice.service'
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchClienteComponent } from './components/fetchcliente/fetchcliente.component';
import { createcliente } from './components/addcliente/AddCliente.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        FetchClienteComponent,
        createcliente,
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'fetch-cliente', component: FetchClienteComponent },
            { path: 'register-cliente', component: createcliente },
            { path: 'cliente/edit/:clienteId', component: createcliente },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [ClienteService]
})
export class AppModuleShared {
}
