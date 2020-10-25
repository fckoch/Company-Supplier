using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CompanySupplierAPI.Helpers;
using CompanySupplierAPI.Models;
using CompanySupplierAPI.Models.Entities;
using CompanySupplierAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CompanySupplierAPI.Controllers
{
    [ApiController]
    [Route("api/empresas/{empresaId}/fornecedores")]
    public class FornecedorController : ControllerBase
    {
        private readonly EmpresaService _empresaService;
        private readonly FornecedorService _fornecedorService;
        private readonly IMapper _mapper;
        private readonly Error _error;

        public FornecedorController(EmpresaService empresaService, FornecedorService fornecedorService, IMapper mapper, Error error)
        {
            _empresaService = empresaService;
            _fornecedorService = fornecedorService;
            _mapper = mapper;
            _error = error;
        }

        //Get all Fornecedores from Empresa ordered by
        [HttpGet]
        public async Task<ActionResult<OutputFornecedorModel[]>> GetAllFornecedores ([FromQuery] FornecedorParameters fornecedorParameters, int empresaId)
        {
            try
            {
                var orderBy = fornecedorParameters.OrderBy;
                switch (orderBy)
                {
                    case "Nome":
                        var fornecedoresOrderedByNome = await _fornecedorService.GetFornecedorByIdOrderedByNomeAsync(empresaId);
                        return _mapper.Map<OutputFornecedorModel[]>(fornecedoresOrderedByNome);
                    case "CPFCNPJ":
                        var fornecedoresOrderedByCPFCNPJ = await _fornecedorService.GetFornecedorByIdOrderedByCPFCNPJAsync(empresaId);
                        return _mapper.Map<OutputFornecedorModel[]>(fornecedoresOrderedByCPFCNPJ);
                    case "DataCadastro":
                        var fornecedoresOrderedByDataCadastro = await _fornecedorService.GetFornecedorByIdOrderedByDataCadastroAsync(empresaId);
                        return _mapper.Map<OutputFornecedorModel[]>(fornecedoresOrderedByDataCadastro);
                }

                return BadRequest("Query invalida");

            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Falha no banco de dados - {ex.ToString()}");
            }
        }

        //Get a specific fornecedor from a empresa
        [HttpGet("{fornecedorId:int}")]
        public async Task<ActionResult<FornecedorModel>> GetFornecedor (int fornecedorId)
        {
            try
            {
                var fornecedor = await _fornecedorService.GetFornecedorByIdAsync(fornecedorId);
                if (fornecedor == null)
                    return NotFound("Fornecedor não encontrado");

                return _mapper.Map<FornecedorModel>(fornecedor);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Falha no banco de dados - {ex.ToString()}");
            }
        }

        //Post
        [HttpPost("juridica")]
        public async Task<ActionResult<FornecedorPessoaJuridicaModel>> PostPessoaJuridica (FornecedorPessoaJuridicaModel model, int empresaId)
        {
            try
            {
                var empresa = await _empresaService.GetEmpresaByIdAsync(empresaId);
                var fornecedor = _mapper.Map<Fornecedor>(model);

                empresa.Fornecedors.Add(fornecedor);

                if (await _fornecedorService.SaveChangesAsync())
                {
                    return Created($"api/empresas/{fornecedor.FornecedorId}/fornecedores/{fornecedor.FornecedorId}", _mapper.Map<FornecedorPessoaJuridicaModel>(fornecedor));
                }

                else
                {
                    return BadRequest("Falha ao adicionar um novo fornecedor");
                }
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Falha no banco de dados - {ex.ToString()}");
            }
        }

        //Post
        [HttpPost("fisica")]
        public async Task<ActionResult<FornecedorPessoaFisicaModel>> PostPessoaFisica(FornecedorPessoaFisicaModel model, int empresaId)
        {
            try
            {
                var empresa = await _empresaService.GetEmpresaByIdAsync(empresaId);
                var fornecedor = _mapper.Map<Fornecedor>(model);

                var today = DateTime.Today;
                var idadeFornecedor = today.Year - fornecedor.DataNascimento.Value.Year;
                if (empresa.UF == "PR" && idadeFornecedor < 18)
                {
                    Error erro = new Error();
                    return BadRequest(erro);
                }

                empresa.Fornecedors.Add(fornecedor);

                if (await _fornecedorService.SaveChangesAsync())
                {
                    return Created($"api/empresas/{fornecedor.FornecedorId}/fornecedores/{fornecedor.FornecedorId}", _mapper.Map<FornecedorPessoaFisicaModel>(fornecedor));
                }

                else
                {
                    return BadRequest("Falha ao adicionar um novo fornecedor");
                }
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Falha no banco de dados - {ex.ToString()}");
            }
        }

        //Put
        [HttpPut("{fornecedorId:int}")]
        public async Task<ActionResult<FornecedorModel>> Put (FornecedorModel model, int fornecedorId)
        {
            try
            {
                var fornecedor = await _fornecedorService.GetFornecedorByIdAsync(fornecedorId);
                if (fornecedor == null)
                    return NotFound("Fornecedor não encontrado");

                _mapper.Map(model, fornecedor);

                if (await _fornecedorService.SaveChangesAsync())
                {
                    return _mapper.Map<FornecedorModel>(fornecedor);
                }
                else
                {
                    return BadRequest("Falha ao atualizar fornecedor");
                }
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Falha no banco de dados - {ex.ToString()}");
            }
        }

        //Delete
        [HttpDelete("{fornecedorId:int}")]
        public async Task<ActionResult<FornecedorModel>> Delete (int fornecedorId)
        {
            try
            {
                var fornecedor = await _fornecedorService.GetFornecedorByIdAsync(fornecedorId);
                if (fornecedor == null)
                    return NotFound("Fornecedor não encontrado");

                _fornecedorService.Delete(fornecedor);

                if (await _fornecedorService.SaveChangesAsync())
                {
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Falha no banco de dados - {ex.ToString()}");
            }

            return BadRequest("Falha ao deletar fornecedor");
        }
        
    }
}
