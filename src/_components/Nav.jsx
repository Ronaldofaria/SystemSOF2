import React, { useState, useEffect } from 'react';
import { NavLink, Route } from 'react-router-dom';

import { Role } from '@/_helpers';
import { accountService } from '@/_services';

import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

function Nav() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const subscription = accountService.user.subscribe(x => setUser(x));
        return subscription.unsubscribe;
    }, []);

    // only show nav when logged in
    if (!user) return null;

    return (
        <div>
             <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="navbar-nav">
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <NavLink exact to="/" className="nav-item nav-link">Home</NavLink>
                    <NavLink to="/profile" className="nav-item nav-link">Profile</NavLink>
                    {user.role === Role.Admin &&
                        <NavLink to="/admin" className="nav-item nav-link">Admin</NavLink>
                    }
                    <NavLink to="/indexFavorecido" className="nav-item nav-link">Favorecido</NavLink>
                    <NavDropdown title="Despesas" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/indexNad">Autorização</NavDropdown.Item>
                        <NavDropdown.Item href="/indexNdc">Descentralização</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown className="text-white" title="Cadastro" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/indexTableCode/tipoeventos/Evento da Nad">Evento Nad</NavDropdown.Item>
                        <NavDropdown.Item href="/indexTableCode/eventondcs/Evento da Ndc">Evento Ndc</NavDropdown.Item>
                        <NavDropdown.Item href="/indexTableCode/fonterecursos/Fonte de Recurso">Fonte Recurso</NavDropdown.Item>
                        <NavDropdown.Item href="/indexTableCode/naturezadespesas/Natureza de Despesa">Natureza de Despesa</NavDropdown.Item>
                        <NavDropdown.Item href="/indexTableCode/progtrabalhos/Programa de Trabalho">Programa de Trabalho</NavDropdown.Item>
                        <NavDropdown.Item href="/indexTableCode/tipolicitacoes/Tipo de Licitação">Tipo de Licitação</NavDropdown.Item>
                        <NavDropdown.Item href="/indexTableCode/tipocreditos/Tipo de Crédito">Tipo de Credito</NavDropdown.Item>
                        <NavDropdown.Item href="/indexTableCode/tipoempenhos/Tipo de Empenho">Tipo de Evento</NavDropdown.Item>
                        <NavDropdown.Item href="/indexTableCode/unidgestoras/Unidade Gestora">Unidade Gestora</NavDropdown.Item>
                        <NavDropdown.Item href="/indexTableCode/unidorcamentarias/Unidade Orçamentária">Unidade Orçamentaria</NavDropdown.Item>
                    </NavDropdown>
                    </Navbar.Collapse>
                    <a onClick={accountService.logout} className="nav-item nav-link">Logout</a>
                </div>
            </nav>

            <Route path="/admin" component={AdminNav} />
            
        </div>
    );
}

function AdminNav({ match }) {
    const { path } = match;

    return (
        <nav className="admin-nav navbar navbar-expand navbar-light">
            <div className="navbar-nav">
                <NavLink to={`${path}/users`} className="nav-item nav-link">Users</NavLink>
            </div>
        </nav>
    );
}

export { Nav }; 