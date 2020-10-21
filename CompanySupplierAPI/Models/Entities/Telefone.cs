using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompanySupplierAPI.Models.Entities
{
    public class Telefone
    {
        public int TelefoneId { get; set; }
        public string Numero { get; set; }
        public int FornecedorId { get; set; }
    }
}
