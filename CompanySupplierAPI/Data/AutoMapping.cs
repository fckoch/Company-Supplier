using AutoMapper;
using CompanySupplierAPI.Models;
using CompanySupplierAPI.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompanySupplierAPI.Data
{
    public class AutoMapping : Profile
    {
        public AutoMapping()
        {
            CreateMap<EmpresaModel, Empresa>()
            .ReverseMap();

            CreateMap<FornecedorModel, Fornecedor>()
            .ReverseMap();

            CreateMap<FornecedorPessoaJuridicaModel, Fornecedor>()
            .ReverseMap();

            CreateMap<FornecedorPessoaFisicaModel, Fornecedor>()
            .ReverseMap();

            CreateMap<TelefoneModel, Telefone>()
            .ReverseMap();
             
        }
    }
}
