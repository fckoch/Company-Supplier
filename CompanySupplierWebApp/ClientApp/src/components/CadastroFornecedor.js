import React, { Component } from 'react';
import { Form, Button, Alert, Col, Row} from 'react-bootstrap';
import EmpresaService from '../services/empresaService.js';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import FornecedorService from '../services/fornecedorService.js';

class CadastroFornecedor extends Component {
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
      nomeFornecedor: '',
      nomeFornecedorIsInvalid: false,
      nomeFornecedorErrorMessage: '',
      telefoneInput: '',
      telefones: [],
      pessoaFisicaChecked: false,
      pessoaJuridicaChecked: false,
      cnpjFornecedor: '',
      cnpjFornecedorIsInvalid: false,
      cnpjFornecedorErrorMessage: '',
      cpfFornecedor: '',
      cpfFornecedorIsInvalid: false,
      cpfFornecedorErrorMessage: '',
      dataNascimentoFornecedor: '',
      dataNascimentoFornecedorIsInvalid: false,
      dataNascimentoFornecedorErrorMessage: '',
      rgFornecedor: '',
      rgFornecedorIsInvalid: false,
      rgFornecedorErrorMessage: '',
      alertMessage: '',
      displayAlert: false,
      alertType: ''
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

  onChangeRGFornecedor = (e) => {
    this.setState({
      rgFornecedor: e.target.value,
      displayAlert: false
    })
  }

  onChangeDataNascimentoFornecedor = (e) => {
    this.setState({
      dataNascimentoFornecedor: e.target.value,
      displayAlert: false
    })
  }

  onChangeCNPJFornecedor = (e) => {
    this.setState({
      cnpjFornecedor: e.target.value,
      displayAlert: false
    })
  }

  onChangeCPFFornecedor = (e) => {
    this.setState({
      cpfFornecedor: e.target.value,
      displayAlert: false
    })
  }

  onChangePessoaFisica = () => {
    this.setState({
      pessoaFisicaChecked: true,
      pessoaJuridicaChecked: false,
      cnpjFornecedor: ''
    })
  }

  onChangePessoaJuridica = () => {
    this.setState({
      pessoaFisicaChecked: false,
      pessoaJuridicaChecked: true,
      cpfFornecedor: '',
      rgFornecedor: '',
      dataNascimentoFornecedor: ''
    })
  }

  onChangeTelefoneInput = (e) => {
    this.setState({
      telefoneInput: e.target.value,
      displayAlert: false
    })
  }

  onChangeNomeFornecedor = (e) => {
    this.setState({
      nomeFornecedor: e.target.value,
      displayAlert: false
    })
  }

  onChangeCNPJEmpresa = (input) => {
    this.setState({
      cnpjEmpresa: input,
      ufEmpresa: '',
      nomeFantasiaEmpresa: '',
      empresaId: '',
      displayAlert: false,
    })
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
    telefones.push({"Numero": telefone});
    this.setState({
      telefones: telefones,
      telefoneInput: ''
    })
  }

  validateEmpresaSelection = () => {
    let isError = false;
    if (this.state.empresaId === '') {
      isError = true
    }
    else {
      isError = false
    }
    return isError;
  }

  onSubmitPessoaJuridica = () => {
    const err = this.validateEmpresaSelection();
    if (!err) {
      FornecedorService.addNewFornecedorPessoaJuridica(this.state.empresaId, this.state.nomeFornecedor, this.state.cnpjFornecedor, this.state.telefones)
      .then(response => {
      if (response.status === 201) 
        this.setState({
          nomeFornecedor: '',
          telefones: [],
          cnpjFornecedor: '',
          alertMessage: 'Fornecedor cadastrado com sucesso',
          displayAlert: true,
          alertType: 'success',
          nomeFornecedorErrorMessage: '',
          nomeFornecedorIsInvalid: false,
          cnpjEmpresaErrorMessage: '',
          cnpjFornecedorIsInvalid: false

        })
      })
      .catch(error => {
        if (error.response.status === 400) {
          if (error.response.data.errors.Nome) {
            this.setState({
              nomeFornecedorErrorMessage: error.response.data.errors.Nome[0],
              nomeFornecedorIsInvalid: true,
            })
          }
          else if (error.response.data.errors.Nome === undefined) {
            this.setState({
              nomeFornecedorErrorMessage: '',
              nomeFornecedorIsInvalid: false,
            })
          }
          if (error.response.data.errors.CPFCNPJ) {
            this.setState({
              cnpjFornecedorErrorMessage: error.response.data.errors.CPFCNPJ[0],
              cnpjFornecedorIsInvalid: true
            })
          }
          else if (error.response.data.errors.CPFCNPJ === undefined) {
            this.setState({
              cnpjFornecedorErrorMessage: '',
              cnpjFornecedorIsInvalid: false
            })
          }
          this.setState({
            alertMessage: 'Falha ao cadastrar o fornecedor',
            displayAlert: true,
            alertType: 'danger',
          })
        }
        else {
          this.setState({
            alertMessage: 'Falha ao cadastrar o fornecedor',
            displayAlert: true,
            alertType: 'danger',
          })
        }
      })
    } else {
      this.setState({
        alertMessage: 'Empresa não foi selecionada',
        displayAlert: true,
        alertType: 'danger',
      })
    }
  }

  onSubmitPessoaFisica = () => {
    const err = this.validateEmpresaSelection();
    if (!err) {
      FornecedorService.addNewFornecedorPessoaFisica(this.state.empresaId, this.state.nomeFornecedor, this.state.cpfFornecedor, this.state.telefones, this.state.rgFornecedor, this.state.dataNascimentoFornecedor)
      .then(response => {
        if (response.status === 201) 
        this.setState({
          nomeFornecedor: '',
          telefones: [],
          cpfFornecedor: '',
          rgFornecedor: '',
          dataNascimentoFornecedor: '',
          alertMessage: 'Fornecedor cadastrado com sucesso',
          displayAlert: true,
          alertType: 'success',
          nomeFornecedorErrorMessage: '',
          nomeFornecedorIsInvalid: false,
          cpfFornecedorErrorMessage: '',
          cpfFornecedorIsInvalid: false,
          rgFornecedorErrorMessage: '',
          rgFornecedorIsInvalid: false,
          dataNascimentoFornecedorErrorMessage: '',
          dataNascimentoFornecedorIsInvalid: false,
        })
      })
      .catch(error => {
        if (error.response.status === 400) {
          if (error.response.data.errors.dataNascimento) {
            this.setState({
              dataNascimentoFornecedorErrorMessage: error.response.data.errors.dataNascimento,
              dataNascimentoFornecedorIsInvalid: true,
            })
          }
          else if (error.response.data.errors.dataNascimento === undefined) {
            this.setState({
              dataNascimentoFornecedorErrorMessage: '',
              dataNascimentoFornecedorIsInvalid: false,
            })
          }
          if (error.response.data.errors.Nome) {
            this.setState({
              nomeFornecedorErrorMessage: error.response.data.errors.Nome[0],
              nomeFornecedorIsInvalid: true,
            })
          }
          else if (error.response.data.errors.Nome === undefined) {
            this.setState({
              nomeFornecedorErrorMessage: '',
              nomeFornecedorIsInvalid: false,
            })
          }
          if (error.response.data.errors.CPFCNPJ) {
            this.setState({
              cpfFornecedorErrorMessage: error.response.data.errors.CPFCNPJ[0],
              cpfFornecedorIsInvalid: true
            })
          }
          else if (error.response.data.errors.CPFCNPJ === undefined) {
            this.setState({
              cpfFornecedorErrorMessage: '',
              cpfFornecedorIsInvalid: false
            })
          }
          if (error.response.data.errors.RG) {
            this.setState({
              rgFornecedorErrorMessage: error.response.data.errors.RG[0],
              rgFornecedorIsInvalid: true
            })
          }
          else if (error.response.data.errors.RG === undefined) {
            this.setState({
              rgFornecedorErrorMessage: '',
              rgFornecedorIsInvalid: false
            })
          } 
          this.setState({
            alertMessage: 'Falha ao cadastrar o fornecedor',
            displayAlert: true,
            alertType: 'danger',
          })
        }
        else {
          this.setState({
            alertMessage: 'Falha ao cadastrar o fornecedor',
            displayAlert: true,
            alertType: 'danger',
          })
        }
      })
    } else {
      this.setState({
        alertMessage: 'Empresa não foi selecionada',
        displayAlert: true,
        alertType: 'danger',
      })
    }
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
          <Form.Group controlId="validationNomeFornecedor">
            <Form.Label>Nome</Form.Label>
            <Form.Control value={this.state.nomeFornecedor} isInvalid={this.state.nomeFornecedorIsInvalid} onChange={this.onChangeNomeFornecedor} type="text" placeholder="Digite o nome do fornecedor" />
            <Form.Control.Feedback type="invalid">
            {this.state.nomeFornecedorErrorMessage}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Row>
            <Col>
              <Form.Group controlId="validationTelefoneFornecedor">
                <Form.Label>Telefone</Form.Label>
                <Form.Control value={this.state.telefoneInput} onChange={this.onChangeTelefoneInput} type="text" placeholder="Adicione o telefone do fornecedor" />
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
              <div key={index} className="wrapper-telefone" style={{padding: "5px 0px 5px 0px"}}>
                <Form.Row>
                  <Col xs="auto">
                    <Form.Control type="text" value={item.Numero} readOnly />
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
            <Form.Group controlId="validationCNPJFornecedor">
              <Form.Label>CNPJ</Form.Label>
              <Form.Control value={this.state.cnpjFornecedor} isInvalid={this.state.cnpjFornecedorIsInvalid} onChange={this.onChangeCNPJFornecedor} type="text" placeholder="Digite o CNPJ do fornecedor" />
              <Form.Control.Feedback type="invalid">
              {this.state.cnpjFornecedorErrorMessage}
              </Form.Control.Feedback>
              <Form.Text id="CNPJHelp" muted>
              CNPJ deve conter caracteres separadores (Exemplo: XX.XXX.XXX/XXXX-XX)
              </Form.Text>
            </Form.Group>
            <div className="text-center">
              <Button onClick={this.onSubmitPessoaJuridica} style={{margin: "10px 0px 30px"}} variant="primary" type="submit">
                Cadastrar
              </Button>
            </div>
          </div>
          :
          ''}
          {this.state.pessoaFisicaChecked === true ?
          <div className="pessoa-fisica">
            <Form.Row>
              <Col>
                <Form.Group controlId="validationCPFFornecedor">
                  <Form.Label>CPF</Form.Label>
                  <Form.Control value={this.state.cpfFornecedor} isInvalid={this.state.cpfFornecedorIsInvalid} onChange={this.onChangeCPFFornecedor} type="text" placeholder="Digite o CPF do fornecedor" />
                  <Form.Control.Feedback type="invalid">
                  {this.state.cpfFornecedorErrorMessage}
                  </Form.Control.Feedback>
                  <Form.Text id="CPFHelp" muted>
                  CPF deve conter caracteres separadores (Exemplo: XXX.XXX.XXX-XX)
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="validationRGFornecedor">
                  <Form.Label>RG</Form.Label>
                  <Form.Control value={this.state.rgFornecedor} isInvalid={this.state.rgFornecedorIsInvalid} onChange={this.onChangeRGFornecedor} type="text" placeholder="Digite o RG do fornecedor" />
                  <Form.Control.Feedback type="invalid">
                  {this.state.rgFornecedorErrorMessage}
                  </Form.Control.Feedback>
                  <Form.Text id="RGHelp" muted>
                  RG deve conter caracteres separadores (Exemplo: X.XXX.XXX)
                  </Form.Text>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Group controlId="validationDataNascimentoFornecedor">
              <Form.Label>Data de nascimento</Form.Label>
              <Form.Control value={this.state.dataNascimentoFornecedor} isInvalid={this.state.dataNascimentoFornecedorIsInvalid} onChange={this.onChangeDataNascimentoFornecedor} type="date" placeholder="Digite a data de nascimento" />
              <Form.Control.Feedback type="invalid">
              {this.state.dataNascimentoFornecedorErrorMessage}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="text-center">
              <Button onClick={this.onSubmitPessoaFisica} style={{margin: "10px 0px 30px"}} variant="primary" type="submit">
                Cadastrar
              </Button>
            </div>
          </div>
          : ''}
          <Alert style={{textAlign:"center"}}show={this.state.displayAlert} variant={this.state.alertType}>
            {this.state.alertMessage}
          </Alert>
        </div>
      </div>
    );
  }
}

export default CadastroFornecedor;