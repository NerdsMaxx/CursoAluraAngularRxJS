import { LivroVolumeInfo } from './../../models/livroVolumeInfo';
import { Item, LivrosResultado } from './../../models/interfaces';
import { LivroService } from './../../service/livro.service';
import { Component, OnDestroy } from '@angular/core';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  EMPTY,
  filter,
  map,
  of,
  Subscription,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { Livro } from 'src/app/models/interfaces';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent {
  campoBusca = new FormControl();
  mensagemErro = '';

  constructor(private service: LivroService) {}

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(300),
    filter((valorDigitado) => valorDigitado.length >= 3),
    distinctUntilChanged(),
    tap(() => console.log('Fluxo inicial: ')),
    switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
    tap(() => console.log('Requisição do servidor: ')),
    map((resultado) => {
      return {
        totalItems: resultado.totalItems,
        livros: resultado.items.map((item) => new LivroVolumeInfo(item)),
      };
    }),
    catchError((erro) => {
      console.log(erro);

      this.mensagemErro = 'Ops ocorreu um erro. Recarregue por favor.';
      return EMPTY;
    })
  );

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map((item) => new LivroVolumeInfo(item));
  }
}
