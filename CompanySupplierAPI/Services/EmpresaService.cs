using AutoMapper;
using CompanySupplierAPI.Data;
using CompanySupplierAPI.Models;
using CompanySupplierAPI.Models.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompanySupplierAPI.Services
{
    public class EmpresaService
    {
        private CompanySupplierContext _context;

        public EmpresaService(CompanySupplierContext context)
        {
            _context = context;
        }

        public void Add(Empresa entity)
        {
            _context.Empresas.Add(entity);
        }

        public void Delete(Empresa entity)
        {
            _context.Empresas.Remove(entity);
        }

        public bool EmpresaExists(string CNPJ)
        {
            return _context.Empresas.Any(e => e.CNPJ == CNPJ);
        }

        public async Task<bool> SaveChangesAsync()
        {
            // Only returns success if at least one row was changed
            return (await _context.SaveChangesAsync() > 0);
        }

        public async Task<Empresa> GetEmpresaByIdAsync(int empresaId)
        {
            IQueryable<Empresa> query = _context.Empresas;
            query = query.Where(e => e.EmpresaId == empresaId).Include(e => e.Fornecedors);
            return await query.FirstOrDefaultAsync();
        }

        public async Task<Empresa[]> GetAllEmpresasAsync()
        {
            IQueryable<Empresa> query = _context.Empresas;
            query = query.OrderBy(e => e.NomeFantasia).Include(e => e.Fornecedors).ThenInclude(f => f.Telefones);
            return await query.ToArrayAsync();
        }

        public async Task<CNPJModel[]> GetEmpresasCNPJByQueryAsync(EmpresaParameters empresaParameters)
        {
            IQueryable<Empresa> query = _context.Empresas;
            query = query.OrderBy(e => e.CNPJ).Where(e => e.CNPJ.Substring(0, empresaParameters.CNPJ.Length) == empresaParameters.CNPJ);
            return await query.Select(e => new CNPJModel { CNPJ = e.CNPJ, EmpresaId = e.EmpresaId, UF = e.UF, NomeFantasia = e.NomeFantasia}).ToArrayAsync();
        }
    }
}
