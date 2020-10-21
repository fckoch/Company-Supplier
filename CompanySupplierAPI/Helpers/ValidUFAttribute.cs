using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CompanySupplierAPI.Helpers
{
    public class ValidUFAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            string UF = value.ToString();
            string[] UFs = { "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO" };
            return Array.Exists(UFs, uf => uf == UF);
        }
    }
}
