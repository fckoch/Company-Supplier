using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompanySupplierAPI.Models.Entities
{
    public class Empresa
    {
        public int EmpresaId { get; set; }
        public string UF { get; set; }
        public string NomeFantasia { get; set; }
        public string CNPJ { get; set; }
        public virtual ICollection<Fornecedor> Fornecedors { get; set; }
    }
}
