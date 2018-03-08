import { Component, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../services/cliservice.service'

@Component({
    selector: 'fetchcliente',
    templateUrl: './fetchcliente.component.html'
})

export class FetchClienteComponent {
    public clienteList: ClienteData[];

    constructor(public http: Http, private _router: Router, private _clienteService: ClienteService) {
        this.getClientes();
    }

    getClientes() {
        this._clienteService.getClientes().subscribe(
            data => this.clienteList = data
        )
    }

    delete(clienteId) {
        debugger;
        var ans = confirm("Deseja realmente excluir o registro com identificação: " + clienteId + "?");
        if (ans) {
            this._clienteService.deleteCliente(clienteId).subscribe((data) => {
                this.getClientes();
            }, error => console.error(error)) 
        }
    }
}

interface ClienteData {
    clienteId: number;
    nome: string;
    sobrenome: string;
    dataNascimento: string;
    idade: string;
    profissao: string;
}