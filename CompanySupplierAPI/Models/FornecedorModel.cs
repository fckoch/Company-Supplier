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
        [Required]
        [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "Nome inválido, apenas letras são permitidas")]
        public string Nome { get; set; }
        [Required]
        [ValidCPFCNPJ(ErrorMessage = "CPF ou CNPJ inválido")]
        public string CPFCNPJ { get; set; }
        [Required]
        public DateTime DataCadastro{ get; set; }
        [Required]
        [Phone]
        public virtual ICollection<Telefone> Telefones { get; set; }
        [ValidRG(ErrorMessage = "RG inválido")]
        public string RG { get; set; }
        public DateTime DataNascimento { get; set; }
    }
}
