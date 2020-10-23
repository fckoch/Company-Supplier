import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import CadastroFornecedor from './components/CadastroFornecedor';
import CadastroEmpresa from './components/CadastroEmpresa';
import './custom.css'

export default class App extends Component {
  //static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/cadastro-empresa' component={CadastroEmpresa} />
        <Route path='/cadastro-fornecedor' component={CadastroFornecedor} />
      </Layout>
    );
  }
}
