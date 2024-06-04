using System.Collections.Generic;
using System.Threading.Tasks;
using CRUDAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRUDAPI.Controllers {
    [ApiController]
    [Route ("api/[controller]")]
    public class CursosController : ControllerBase {
        private readonly Contexto _contexto;

        public CursosController (Contexto contexto) {
            _contexto = contexto;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Curso>>> PegarTodosAsync () {
            return await _contexto.Cursos.ToListAsync ();
        }

        [HttpGet ("{cursoId}")]
        public async Task<ActionResult<Curso>> PegarCursoPeloIdAsync (int cursoId) {
            Curso curso = await _contexto.Cursos.FindAsync (cursoId);

            if (curso == null)
                return NotFound ();

            return curso;
        }

        [HttpPost]
        public async Task<ActionResult<Curso>> SalvarCursoAsync (Curso curso) {
            await _contexto.Cursos.AddAsync (curso);
            await _contexto.SaveChangesAsync ();

            return Ok ();
        }

        [HttpPut]
        public async Task<ActionResult> AtualizarCursoAsync (Curso curso) {
            _contexto.Cursos.Update (curso);
            await _contexto.SaveChangesAsync ();

            return Ok ();
        }

        [HttpDelete ("{cursoId}")]
        public async Task<ActionResult> ExcluirCursoAsync (int cursoId) {
            Curso curso = await _contexto.Cursos.FindAsync (cursoId);
            if (curso == null)
                return NotFound ();

            _contexto.Remove (curso);
            await _contexto.SaveChangesAsync ();
            return Ok ();
        }

    }
}