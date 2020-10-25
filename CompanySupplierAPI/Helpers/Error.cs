using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompanySupplierAPI.Helpers
{
    public class Error
    {
        public Errors errors { get; set; }

        public Error()
        {
            this.errors = new Errors();
        }
    }

}   
