import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FetchClienteComponent } from '../fetchcliente/fetchcliente.component';
import { ClienteService } from '../../services/cliservice.service';

@Component({
    selector: 'createcliente',
    templateUrl: './AddCliente.component.html'
})

export class createcliente implements OnInit {
    clienteForm: FormGroup;
    title: string = "Create";
    clienteId: number;
    errorMessage: any;

    constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
        private _clienteService: ClienteService, private _router: Router) {
        if (this._avRoute.snapshot.params["clienteId"]) {
            this.clienteId = this._avRoute.snapshot.params["clienteId"];
        }

        this.clienteForm = this._fb.group({
            clienteId: 0,
            nome: ['', [Validators.required]],
            sobrenome: ['', [Validators.required]],
            dataNascimento: ['', [Validators.required]],
            idade: ['', [Validators.required]],
            profissao: ['', [Validators.required]]
        })
    }

    ngOnInit() {
        if (this.clienteId > 0) {
            this.title = "Edit";
            this._clienteService.getClienteById(this.clienteId)
                .subscribe(resp => this.clienteForm.setValue(resp)
                , error => this.errorMessage = error);
        }
    }

    save() {

        if (!this.clienteForm.valid) {
            return;
        }

        if (this.title == "Create") {
            debugger;
            this._clienteService.saveCliente(this.clienteForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/fetch-cliente']);
                }, error => this.errorMessage = error)
        }
        else if (this.title == "Edit") {
            debugger;
            this._clienteService.updateCliente(this.clienteForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/fetch-cliente']);
                }, error => this.errorMessage = error) 
        }
    }

    cancel() {
        this._router.navigate(['/fetch-cliente']);
    }

    get nome() { return this.clienteForm.get('nome'); }
    get sobrenome() { return this.clienteForm.get('sobrenome'); }
    get dataNascimento() { return this.clienteForm.get('dataNascimento'); }
    get idade() { return this.clienteForm.get('idade'); }
    get profissao() { return this.clienteForm.get('profissao'); }
}