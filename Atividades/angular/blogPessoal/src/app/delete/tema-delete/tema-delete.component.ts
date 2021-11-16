import { environment } from './../../../environments/environment.prod';
import { Tema } from './../../model/Tema';
import { TemaService } from './../../service/tema.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  tema: Tema = new Tema()
  idTema: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private temaService: TemaService,
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      alert('Seu token expirou, faça o login novamente.')
      this.router.navigate(['/entrar'])
    }

    this.idTema = this.route.snapshot.params['id']
    this.findByIdTema(this.idTema)
  }

  findByIdTema(id: number) {
    this.temaService.getByIdTema(id).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  apagar() {
    this.temaService.deleteTema(this.idTema).subscribe(() => {
      alert('Tema apagado!')
      this.router.navigate(['/tema'])
    })
  }

}
