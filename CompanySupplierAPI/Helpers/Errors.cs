using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompanySupplierAPI.Helpers
{
    public class Errors
    {
        public string DataNascimento { get; set; }

        public Errors()
        {
            this.DataNascimento = "Não é permitido cadastro de fornecedor menor de idade em empresa do PR";
        }
    }
}
