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
        [ValidUF(ErrorMessage = "UF inválido")]
        public string UF { get; set; }
        [Required(ErrorMessage = "Nome fantasia inválido")]
        [RegularExpression(@"^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$", ErrorMessage = "Nome fantasia inválido, apenas letras são permitidas")]
        public string NomeFantasia { get; set; }
        [ValidCNPJ(ErrorMessage = "CNPJ inválido")]
        public string CNPJ { get; set; }
        public virtual ICollection<Fornecedor> Fornecedors { get; set; }
    }
}
