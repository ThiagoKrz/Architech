import { CursosService } from './../../cursos.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Curso } from 'src/app/Curso';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
})
export class CursosComponent implements OnInit {
  formulario: any;
  tituloFormulario: string;
  cursos: Curso[];
  tituloCurso: string;
  cursoId: number;

  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;

  modalRef: BsModalRef;

  constructor(private cursosService: CursosService,
    private modalService: BsModalService) {}

  ngOnInit(): void {
    this.cursosService.PegarTodos().subscribe((resultado) => {
      this.cursos = resultado;
    });
  }

  ExibirFormularioCadastro(): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.tituloFormulario = 'Novo Curso';
    this.formulario = new FormGroup({
      titulo: new FormControl(null),
      descricao: new FormControl(null),
      categoria: new FormControl(null),
      url: new FormControl(null),
    });
  }
  sortCursoPorCategoria() {
    this.cursos.sort((a, b) => a.categoria.localeCompare(b.categoria));
  }


  ExibirFormularioAtualizacao(cursoId): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

    this.cursosService.PegarPeloId(cursoId).subscribe((resultado) => {
      this.tituloFormulario = `Atualizar ${resultado.titulo}`;

      this.formulario = new FormGroup({
        cursoId: new FormControl(resultado.cursoId),
        titulo: new FormControl(resultado.titulo),
        descricao: new FormControl(resultado.descricao),
        categoria: new FormControl(resultado.categoria),
        url: new FormControl(resultado.url),
      });
    });
  }

  EnviarFormulario(): void {
    const curso: Curso = this.formulario.value;

    if (curso.cursoId > 0) {
      this.cursosService.AtualizarCurso(curso).subscribe((resultado) => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        alert('Curso atualizado com sucesso');
        this.cursosService.PegarTodos().subscribe((registros) => {
          this.cursos = registros;
        });
      });
    } else {
      this.cursosService.SalvarCurso(curso).subscribe((resultado) => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        alert('Curso inserido com sucesso');
        this.cursosService.PegarTodos().subscribe((registros) => {
          this.cursos = registros;
        });
      });
    }
  }

  Voltar(): void {
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

  ExibirConfirmacaoExclusao(cursoId, tituloCurso, conteudoModal: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(conteudoModal);
    this.cursoId = cursoId;
    this.tituloCurso = tituloCurso;
  }

  ExcluirCurso(cursoId){
    this.cursosService.ExcluirCurso(cursoId).subscribe(resultado => {
      this.modalRef.hide();
      alert('Curso excluído com sucesso');
      this.cursosService.PegarTodos().subscribe(registros => {
        this.cursos = registros;
      });
    });
  }
}
