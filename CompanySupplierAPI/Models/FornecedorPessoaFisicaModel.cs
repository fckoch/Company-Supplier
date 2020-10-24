using CompanySupplierAPI.Helpers;
using CompanySupplierAPI.Models.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CompanySupplierAPI.Models
{
    public class FornecedorPessoaFisicaModel
    {
        [Required(ErrorMessage = "Necessário incluir o nome do fornecedor")]
        [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "Nome inválido, apenas letras são permitidas")]
        public string Nome { get; set; }
        [Required(ErrorMessage = "Necessário incluir o CPF do fornecedor")]
        [ValidCPF(ErrorMessage = "CPF inválido")]
        public string CPFCNPJ { get; set; }
        [Required]
        public DateTime DataCadastro{ get; set; }
        [Required]
        public virtual ICollection<TelefoneModel> Telefones { get; set; }
        [Required(ErrorMessage = "Necessário incluir o RG do fornecedor")]
        [RegularExpression(@"^[0-9X.-]*$", ErrorMessage = "RG inválido")]
        public string RG { get; set; }
        [Required(ErrorMessage = "Necessário incluir a data de nascimento do fornecedor")]
        public DateTime? DataNascimento { get; set; }

        public FornecedorPessoaFisicaModel()
        {
            this.DataCadastro = DateTime.Now;
        }
    }
}
