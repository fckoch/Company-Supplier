import React, { Component } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import EmpresaService from '../services/empresaService.js';
import FornecedorService from '../services/fornecedorService.js';
import { Form, Button, Alert, Col, Row, Table} from 'react-bootstrap';
import fornecedorService from '../services/fornecedorService.js';
import { MdPhone } from "react-icons/md";
import { IconContext } from "react-icons";

class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      options: [],
      isLoading: false,
      cnpjEmpresa: '',
      cnpjEmpresaIsInvalid:'',
      cnpjEmpresaErrorMessage: '',
      empresaId: '',
      ufEmpresa: '',
      nomeFantasiaEmpresa: '',
      fornecedores: [],
      popOverShow: false,
    }
  }

  onEmpresaSelection = (empresa) => {
    if (JSON.stringify(empresa) !== '[]') {
      const data = empresa[0];
      this.setState({
        cnpjEmpresa: data.cnpj,
        empresaId: data.empresaId,
        ufEmpresa: data.uf,
        nomeFantasiaEmpresa: data.nomeFantasia  
      });
      this.fetchFornecedores(data.empresaId);
    }
  }

  fetchFornecedores = (empresaId) => {
    FornecedorService.getFornecedoresOrderedByQuery(empresaId, 'Nome')
    .then(response => 
      this.setState({
        fornecedores: response.data
      }));
  }

  handleSearch = (query) => {
    this.setState({
      isLoading: true
    });
    EmpresaService.getEmpresasByCNPJQuery(query)
    .then(response => {
      const options = response.data.map((i) => ({
        empresaId: i.empresaId,
        cnpj: i.cnpj,
        uf: i.uf,
        nomeFantasia: i.nomeFantasia
      }))
      this.setState({
        options: options,
        isLoading: false
      })
    })
  }

  getFornecedoresFiltered = (query) => {
    FornecedorService.getFornecedoresOrderedByQuery(this.state.empresaId, query)
    .then(response => {
      this.setState({
        fornecedores: response.data
      })
    })
  }

  renderTelefones = (telefones) => {
    var telefonelist = [];
    for (var obj of telefones) {
      for (const [key, value] of Object.entries(obj)) {
        if (key === 'numero') 
        telefonelist.push(value);
      }
    }
    return (
      telefonelist.map((numero, index) => {
        return (
          <li style={{padding: '5px', display:'inline'}}>{numero}</li>
        )
      })
    )
  }

  transformData = (data) => {
    let year = data.slice(0,4);
    let month = data.slice(5,7);
    let day = data.slice(8,10);
    let hour = data.slice(11,13);
    let minute = data.slice(14,16);

    return (`${day}/${month}/${year} ${hour}:${minute}`)
  }

  render () {

    const filterBy = () => true;

    return (
      <div className="wrapper-3">
        <div className="wrapper-selecionar-empresa">
          <h2 style={{textAlign: "center", paddingTop: "50px"}}>Listagem de fornecedores por empresa</h2>
          <Form>
            <Form.Group>
              <Form.Label>Selecione CNPJ da empresa</Form.Label>
              <AsyncTypeahead
                filterBy={filterBy}
                id="async-search"
                isLoading={this.state.isLoading}
                labelKey="cnpj"
                minLength={3}
                onSearch={this.handleSearch}
                options={this.state.options}
                placeholder="Pesquise por um CNPJ..."
                emptyLabel="Nenhum CNPJ encontrado"
                searchText="Pesquisando..."
                onInputChange={this.onChangeCNPJEmpresa}
                onChange={this.onEmpresaSelection}
              />
            </Form.Group>
            <h5 style={{paddingTop: "10px"}}>Dados da empresa selecionada</h5>
            <Form.Row>
              <Col>
                <Form.Label>Nome Fantasia</Form.Label>
                <Form.Control type="text" value={this.state.nomeFantasiaEmpresa} readOnly />
              </Col>
              <Col>
                <Form.Label>UF</Form.Label> 
                <Form.Control type="text" value={this.state.ufEmpresa} readOnly />
              </Col>
            </Form.Row>
          </Form>
        </div>
        <div style={{paddingTop: "30px"}}className="wrapper-tabela-fornecedores">
          <Table>
            <thead>
              <tr>
                <th style={{cursor: 'pointer'}} onClick={() => {this.getFornecedoresFiltered('Nome')}}>Nome</th>
                <th style={{cursor: 'pointer'}}onClick={() => {this.getFornecedoresFiltered('CPFCNPJ')}}>CPF/CNPJ</th>
                <th style={{cursor: 'pointer'}}onClick={() => {this.getFornecedoresFiltered('DataCadastro')}}>Data de cadastro</th>
                <th style={{textAlign: 'center'}}>Contato</th>
              </tr>
            </thead>
            <tbody>
              {this.state.fornecedores.map((fornecedor, index) => {
                const { nome, cpfcnpj, dataCadastro, telefones} = fornecedor
                var popOverShow = false;
                return (
                  <tr key={index}>
                    <td>{nome}</td>
                    <td>{cpfcnpj}</td>
                    <td>{this.transformData(dataCadastro)}</td>
                    <td style={{textAlign: 'center'}}>
                      <div style={{justifyContent: 'center'}}>
                        {this.renderTelefones(telefones)}
                      </div>
                    </td>
                    {/*<td>
                      <IconContext.Provider value={{ size: "1.2em", color: "black" }}>
                        <div style={{textAlign: 'center'}}>
                          <MdPhone onClick={() => {
                            console.log(popOverShow)
                          }}
                          />
                        </div>
                      </IconContext.Provider>
                    </td>*/}
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default Home;