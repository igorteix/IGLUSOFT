import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ClienteService {
    myAppUrl: string = "";

    constructor(private _http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.myAppUrl = baseUrl;
    }

    getClientes() {
        return this._http.get(this.myAppUrl + 'api/Cliente/Index')
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    getClienteById(id: number) {
        return this._http.get(this.myAppUrl + "api/Cliente/Details/" + id)
            .map((response: Response) => response.json())
            .catch(this.errorHandler)
    }

    saveCliente(cliente) {
        return this._http.post(this.myAppUrl + 'api/Cliente/Create', cliente)
            .map((response: Response) => response.json())
            .catch(this.errorHandler)
    }

    updateCliente(cliente) {
        return this._http.put(this.myAppUrl + 'api/Cliente/Edit', cliente)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    deleteCliente(id) {
        debugger;
        return this._http.delete(this.myAppUrl + "api/Cliente/Delete/" + id)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    calculaIdade(birthday) {
        var d = new Date(),
            ano_atual = d.getFullYear(),
            mes_atual = d.getMonth() + 1,
            dia_atual = d.getDate();

        var b = new Date(),
            ano_aniversario = +birthday.getFullYear(),
            mes_aniversario = +birthday.getMonth(),
            dia_aniversario = +birthday.getDate(),

            quantos_anos = ano_atual - ano_aniversario;

        if (mes_atual < mes_aniversario || mes_atual == mes_aniversario && dia_atual < dia_aniversario) {
            quantos_anos;
        }

        return quantos_anos < 0 ? 0 : quantos_anos;

    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
}