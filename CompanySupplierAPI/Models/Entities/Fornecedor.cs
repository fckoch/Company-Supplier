using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompanySupplierAPI.Models.Entities
{
    public class Fornecedor
    {
        public int FornecedorId { get; set; }
        public string Nome { get; set; }
        public string CPFCNPJ { get; set; }
        public DateTime DataCadastro { get; set; }
        public virtual ICollection<Telefone> Telefones { get; set; }
        public string RG { get; set; }
        public DateTime? DataNascimento { get; set; }
        public int EmpresaId { get; set; }
    }
}
