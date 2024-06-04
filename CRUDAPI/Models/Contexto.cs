using Microsoft.EntityFrameworkCore;

namespace CRUDAPI.Models
{
    public class Contexto : DbContext
    {
        public DbSet<Curso> Cursos { get; set; }

        public Contexto(DbContextOptions<Contexto> opcoes) : base(opcoes)
        {
            
        }
        
    }
}