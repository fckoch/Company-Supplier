import React, { Component, Fragment} from 'react';
import { Form, Button, Table, Alert, Col, Row} from 'react-bootstrap';
import FornecedorService from '../services/fornecedorService.js';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import Axios from 'axios';

class CadastroFornecedor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      isLoading: false,
      cnpjEmpresa: '',
      empresaId: '',
      ufEmpresa: '',
      nomeFantasiaEmpresa: '',
      nomeFornecedor: '',
      nomeFornecedorIsInvalid: false,
      telefoneInput: '',
      telefoneInputIsInvalid: false,
      telefones: [],
      pessoaFisicaChecked: false,
      pessoaJuridicaChecked: false,
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
    }
  }

  onChangePessoaFisica = () => {
    this.setState({
      pessoaFisicaChecked: true,
      pessoaJuridicaChecked: false,
    })
  }

  onChangePessoaJuridica = () => {
    this.setState({
      pessoaFisicaChecked: false,
      pessoaJuridicaChecked: true,
    })
  }

  onChangeTelefoneInput = (e) => {
    this.setState({
      telefoneInput: e.target.value
    })
  }

  onChangeNomeFornecedor = (e) => {
    this.setState({
      nomeFornecedor: e.target.value
    })
  }

  onChangeCNPJEmpresa = (input) => {
    this.setState({
      cnpjEmpresa: input,
      ufEmpresa: '',
      nomeFantasiaEmpresa: ''
    })
  }

  handleSearch = (query) => {
    this.setState({
      isLoading: true
    })
    Axios.get(`https://localhost:5001/api/empresas/search?cnpj=${query}`)
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

  removerTelefone = (telefone) => {
    const telefones = this.state.telefones;
    const index = telefones.indexOf(telefone);
    if (index > -1) {
      telefones.splice(index, 1);
    }
    this.setState({
      telefones: telefones
    })
  }

  adicionarTelefone = (telefone) => {
    const telefones = this.state.telefones;
    telefones.push(telefone);
    this.setState({
      telefones: telefones,
      telefoneInput: ''
    })
  }

  onSubmit = () => {
    console.log(this.state.nomeFantasiaEmpresa)
  }

  render() {

    const filterBy = () => true;

    return (
      <div className="wrapper-2">
        <div className="wrapper-cadastro-fornecedor">
          <h2 style={{textAlign: "center", paddingTop: "50px"}}>Cadastro Fornecedor</h2>
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
            <h5 style={{paddingTop: "10px"}}>Dados de cadastro do fornecedor</h5>
          </Form>
          <Form.Group controlId="validationCustom01">
            <Form.Label>Nome</Form.Label>
            <Form.Control value={this.state.nomeFornecedor} isInvalid={this.state.nomeFornecedorIsInvalid} onChange={this.onChangeNomeFornecedor} type="text" placeholder="Digite o nome do fornecedor" />
            <Form.Control.Feedback type="invalid">
            {this.state.nomeFantasiaErrorMessage}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Row>
            <Col>
              <Form.Group controlId="validationCustom01">
                <Form.Label>Telefone</Form.Label>
                <Form.Control value={this.state.telefoneInput} isInvalid={this.state.telefoneInputIsInvalid} onChange={this.onChangeTelefoneInput} type="text" placeholder="Adicione o telefone do fornecedor" />
                <Form.Control.Feedback type="invalid">
                {this.state.nomeFantasiaErrorMessage}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs="auto">
              <Button onClick={() => this.adicionarTelefone(this.state.telefoneInput)} style={{marginTop: "31px"}} variant="primary" type="submit">
              Adicionar telefone
              </Button>
            </Col>
          </Form.Row>
          {this.state.telefones.map((item, index) => {
            return (
              <div className="wrapper-telefone" style={{padding: "5px 0px 5px 0px"}}>
                <Form.Row>
                  <Col xs="auto">
                    <Form.Control type="text" value={item} readOnly />
                  </Col>
                  <Col xs="auto">
                    <Button onClick={() => this.removerTelefone(item)} style={{margin: "0px"}} variant="primary" type="submit">
                      Remover
                    </Button>
                  </Col>
                </Form.Row>
              </div>
            )
          })}
          <fieldset>
            <Form.Group as={Row}>
              <Col sm={10}>
                <Form.Label>Selecione o tipo de pessoa</Form.Label>
                <Form.Check
                  type="radio"
                  label="Pessoa jurídica"
                  name="formHorizontalPessoa"
                  id="fformHorizontalPessoaJuridica"
                  onChange={this.onChangePessoaJuridica}
                />
                <Form.Check
                  type="radio"
                  label="Pessoa física"
                  name="formHorizontalPessoa"
                  id="formHorizontalPessoaFisica"
                  onChange={this.onChangePessoaFisica}
                />
              </Col>
            </Form.Group>
          </fieldset>
          {this.state.pessoaJuridicaChecked === true ? 
          <div className="pessoa-juridica">
            <Form.Group controlId="validationCustom02">
              <Form.Label>CNPJ</Form.Label>
              <Form.Control value={this.state.cnpj} isInvalid={this.state.cnpjIsInvalid} onChange={this.onChangeCNPJ} type="text" placeholder="Digite o CNPJ do fornecedor" />
              <Form.Control.Feedback type="invalid">
              {this.state.cnpjErrorMessage}
              </Form.Control.Feedback>
              <Form.Text id="CNPJHelp" muted>
              CNPJ deve conter caracteres separadores (Exemplo: XX.XXX.XXX/XXXX-XX)
              </Form.Text>
            </Form.Group>
          </div>
          :
          ''}
          {this.state.pessoaFisicaChecked === true ?
          <div className="pessoa-fisica">
            <Form.Group controlId="validationCustom02">
              <Form.Label>CPF</Form.Label>
              <Form.Control value={this.state.cnpj} isInvalid={this.state.cnpjIsInvalid} onChange={this.onChangeCNPJ} type="text" placeholder="Digite o CPF do fornecedor" />
              <Form.Control.Feedback type="invalid">
              {this.state.cnpjErrorMessage}
              </Form.Control.Feedback>
              <Form.Text id="CNPJHelp" muted>
              CPF deve conter caracteres separadores (Exemplo: XXX.XXX.XXX-XX)
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="validationCustom02">
              <Form.Label>RG</Form.Label>
              <Form.Control value={this.state.cnpj} isInvalid={this.state.cnpjIsInvalid} onChange={this.onChangeCNPJ} type="text" placeholder="Digite o RG do fornecedor" />
              <Form.Control.Feedback type="invalid">
              {this.state.cnpjErrorMessage}
              </Form.Control.Feedback>
              <Form.Text id="CNPJHelp" muted>
              RG deve conter caracteres separadores (Exemplo: X.XXX.XXX)
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="validationCustom02">
              <Form.Label>Data de nascimento</Form.Label>
              <Form.Control value={this.state.cnpj} isInvalid={this.state.cnpjIsInvalid} onChange={this.onChangeCNPJ} type="text" placeholder="Digite a data de nascimento" />
              <Form.Control.Feedback type="invalid">
              {this.state.cnpjErrorMessage}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          : ''}
        </div>
      </div>
    );
  }
}

export default CadastroFornecedor;
