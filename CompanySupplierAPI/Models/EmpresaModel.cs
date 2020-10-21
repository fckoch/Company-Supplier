using CompanySupplierAPI.Helpers;
using CompanySupplierAPI.Models.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CompanySupplierAPI.Models
{
    public class EmpresaModel
    {
        [Required]
        [ValidUF(ErrorMessage = "UF inválido")]
        public string UF { get; set; }
        [Required]
        [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "Nome inválido, apenas letras são permitidas")]
        public string NomeFantasia { get; set; }
        [Required]
        [ValidCPFCNPJ(ErrorMessage = "CNPJ inválido")]
        public string CNPJ { get; set; }
        [Required]
        public virtual ICollection<Fornecedor> Fornecedors { get; set; }
    }
}
