using CompanySupplierAPI.Helpers;
using CompanySupplierAPI.Models.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CompanySupplierAPI.Models
{
    public class FornecedorModel
    {
        public string Nome { get; set; }
        public string CPFCNPJ { get; set; }
        public DateTime DataCadastro{ get; set; }
        public virtual ICollection<Telefone> Telefones { get; set; }
        public string RG { get; set; }
        public DateTime DataNascimento { get; set; }
    }
}
