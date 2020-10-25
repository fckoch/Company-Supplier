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
    public class FornecedorService
    {
        private CompanySupplierContext _context;
        private readonly IMapper _mapper;

        public FornecedorService(CompanySupplierContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Fornecedor[]> GetAllFornecedoresByEmpresaAsync(int EmpresaId)
        {
            IQueryable<Fornecedor> query = _context.Fornecedores;
            query = query.Where(f => f.EmpresaId == EmpresaId).Include(f => f.Telefones);
            return await query.ToArrayAsync();
        }

        public async Task<Fornecedor[]> GetFornecedorByIdOrderedByNomeAsync(int EmpresaId)
        {
            IQueryable<Fornecedor> query = _context.Fornecedores;
            query = query.Where(f => f.EmpresaId == EmpresaId).OrderBy(f => f.Nome).Include(f => f.Telefones);
            return await query.ToArrayAsync();
        }

        public async Task<Fornecedor[]> GetFornecedorByIdOrderedByCPFCNPJAsync(int EmpresaId)
        {
            IQueryable<Fornecedor> query = _context.Fornecedores;
            query = query.Where(f => f.EmpresaId == EmpresaId).OrderBy(f => f.CPFCNPJ).Include(f => f.Telefones);
            return await query.ToArrayAsync();
        }

        public async Task<Fornecedor[]> GetFornecedorByIdOrderedByDataCadastroAsync(int EmpresaId)
        {
            IQueryable<Fornecedor> query = _context.Fornecedores;
            query = query.OrderBy(f => f.CPFCNPJ).Where(f => f.EmpresaId == EmpresaId).OrderBy(f => f.DataCadastro).Include(f => f.Telefones);
            return await query.ToArrayAsync();
        }

        public async Task<Fornecedor> GetFornecedorByIdAsync(int FornecedorId)
        {
            IQueryable<Fornecedor> query = _context.Fornecedores;
            query = query.Where(f => f.FornecedorId == FornecedorId).Include(f => f.Telefones);
            return await query.FirstOrDefaultAsync();
        }

        public void Add(Fornecedor entity)
        {
            _context.Fornecedores.Add(entity);
        }

        public void Delete(Fornecedor entity)
        {
            _context.Fornecedores.Remove(entity);
        }

        public async Task<bool> SaveChangesAsync()
        {
            // Only returns success if at least one row was changed
            return (await _context.SaveChangesAsync() > 0);
        }

    }
}
