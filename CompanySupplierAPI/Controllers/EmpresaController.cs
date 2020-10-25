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
    [Route("api/[controller]")]
    public class EmpresasController : ControllerBase
    {
        private readonly EmpresaService _empresaService;
        private readonly IMapper _mapper;

        public EmpresasController(EmpresaService empresaService, IMapper mapper)
        {
            _empresaService = empresaService;
            _mapper = mapper;
        }

        //Get all Empresas
        [HttpGet]
        public async Task<ActionResult<EmpresaModel[]>> GetAllEmpresas()
        {
            try
            {
                var empresas = await _empresaService.GetAllEmpresasAsync();
                return _mapper.Map<EmpresaModel[]>(empresas);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Falha no banco de dados - {ex.ToString()}");
            }
        }

        //Get Empresa by Id
        [HttpGet("{empresaId:int}")]
        public async Task<ActionResult<EmpresaModel>> GetEmpresa (int empresaId)
        {
            try
            {
                var empresa = await _empresaService.GetEmpresaByIdAsync(empresaId);
                return _mapper.Map<EmpresaModel>(empresa);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Falha no banco de dados - {ex.ToString()}");
            }
        }

        //GET Empresa list by query
        [HttpGet("search")]
        public async Task<ActionResult<OutputEmprestaListModel[]>> GetEmpresaListByQuery ([FromQuery] QueryEmpresaParameters empresaParameters)
        {
            try
            {
                var EmpresaList = await _empresaService.GetEmpresasCNPJByQueryAsync(empresaParameters);
                return EmpresaList;
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Falha no banco de dados - {ex.ToString()}");
            }
        }

        //Post
        [HttpPost]
        public async Task<ActionResult<EmpresaModel>> Post(EmpresaModel model)
        {
            try
            {
                var empresa = _mapper.Map<Empresa>(model);
                if (_empresaService.EmpresaExists(empresa.CNPJ))
                    return BadRequest("CNPJ já cadastrado no sistema");

                _empresaService.Add(empresa);

                if (await _empresaService.SaveChangesAsync())
                {
                    return Created($"api/empresas/{empresa.EmpresaId}", _mapper.Map<EmpresaModel>(empresa));
                }
                
                else
                {
                    return BadRequest("Falha ao adicionar uma nova empresa");
                }

            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Falha no banco de dados - {ex.ToString()}");
            }
        }

        //Put
        [HttpPut("{empresaId:int}")]
        public async Task<ActionResult<EmpresaModel>> Put(EmpresaModel model, int empresaId)
        {
            try
            {
                var empresa = await _empresaService.GetEmpresaByIdAsync(empresaId);
                if (empresa == null)
                    return NotFound("Empresa não encontrada");

                _mapper.Map(model, empresa);

                if (await _empresaService.SaveChangesAsync())
                {
                    return _mapper.Map<EmpresaModel>(empresa);
                }
                else
                {
                    return BadRequest("Falha ao atualizar empresa");
                }
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Falha no banco de dados - {ex.ToString()}");
            }
        }

        //Delete
        [HttpDelete("{empresaId:int}")]
        public async Task<ActionResult<EmpresaModel>> Delete(int empresaId)
        {
            try
            {
                var empresa = await _empresaService.GetEmpresaByIdAsync(empresaId);
                if (empresa == null)
                    return NotFound("Empresa nao encontrada");

                _empresaService.Delete(empresa);

                if (await _empresaService.SaveChangesAsync())
                {
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Falha no banco de dados - {ex.ToString()}");
            }

            return BadRequest("Falha ao deletar empresa");
        }
    }
}
