using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompanySupplierAPI.Models
{
    public class OutputEmprestaListModel
    {
        public int EmpresaId { get; set; }
        public string CNPJ { get; set; }
        public string UF { get; set; }
        public string NomeFantasia { get; set; }
    }
}
