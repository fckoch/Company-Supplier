using CompanySupplierAPI.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompanySupplierAPI.Models
{
    public class OutputFornecedorModel
    {
        public string Nome { get; set; }
        public string CPFCNPJ { get; set; }
        public DateTime DataCadastro { get; set; }
        public virtual ICollection<Telefone> Telefones { get; set; }
    }
}
