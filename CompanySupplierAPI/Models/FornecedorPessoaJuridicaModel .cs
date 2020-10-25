using CompanySupplierAPI.Helpers;
using CompanySupplierAPI.Models.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CompanySupplierAPI.Models
{
    public class FornecedorPessoaJuridicaModel
    {
        [Required(ErrorMessage = "Necessário incluir o nome do fornecedor")]
        [RegularExpression(@"^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$", ErrorMessage = "Nome inválido, apenas letras são permitidas")]
        public string Nome { get; set; }
        [Required(ErrorMessage = "Necessário incluir o CNPJ do fornecedor")]
        [ValidCNPJ(ErrorMessage = "CNPJ inválido")]
        public string CPFCNPJ { get; set; }
        [Required]
        public DateTime DataCadastro{ get; set; }
        [Required]
        public virtual ICollection<TelefoneModel> Telefones { get; set; }

        public FornecedorPessoaJuridicaModel()
        {
            this.DataCadastro = DateTime.Now;
        }
    }
}
