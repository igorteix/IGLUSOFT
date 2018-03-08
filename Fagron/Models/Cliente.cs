using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fagron.Models
{
    public class Cliente
    {
        public int ClienteId { get; set; }

        public string Nome { get; set; }

        public string Sobrenome { get; set; }

        public DateTime DataNascimento { get; set; }

        public int Idade { get; set; }

        public string Profissao { get; set; }
    }
}
