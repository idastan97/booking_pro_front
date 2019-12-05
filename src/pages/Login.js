import React, {Component} from 'react';
import axios from 'axios';
import config from "../core/config";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errormsg: false
        };
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    login(){
        let self = this;
        axios(config.BACKEND_URL+'/auth/login/', {
            method: "POST",
            data: {
                email: self.state.email,
                password: self.state.password
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                console.log("    ----    ");
                console.log(response.data);
                // localStorage.setItem('token', response.data[0]);
                // localStorage.setItem('userId', response.data[1]);
                // self.props.login(self.state.email.toLowerCase());
                self.props.authorize(response.data.token, self.state.email);
            })
            .catch(function (error) {
                console.log(error);
                self.setState({errormsg: true });
            });

    }

    handleChange(e){
        switch(e.target.name) {
            case("email"):
                this.setState({email: e.target.value});
                break;
            case("password"):
                this.setState({password: e.target.value});
                break;
            default:

        }
    }

    render(){
        return (
            <div>
                <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                    <a className="navbar-brand" ></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        {/*<div className="navbar-nav">*/}
                        {/*    <a className="nav-item nav-link active" href="/">Register <span*/}
                        {/*        className="sr-only">(current)</span></a>*/}
                        {/*</div>*/}

                    </div>
                    <div className="form-inline my-2 my-lg-0">
                        {/*<input className="form-control mr-sm-2" type="search" placeholder="Search"*/}
                        {/*       aria-label="Search"/>*/}
                        <a href="/register"><button className="btn btn-outline-danger my-2 my-sm-0" >Регистрация</button></a>
                    </div>
                </nav>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4 offset-md-4">
                        <div style={{textAlign: "center"}}>
                            <div style={{marginTop: "10px"}}>
                              <h3>Войти</h3>
                            </div>
                            <div className="form-group" style={{textAlign: "center", marginTop: "10px"}}>
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input name="email" type="email" className="form-control" id="exampleInputEmail1"
                                       aria-describedby="emailHelp" placeholder="Enter email"
                                       onChange ={this.handleChange} value={this.state.email}/>

                            </div>
                            <div className="form-group" style={{textAlign: "center"}}>
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input name="password" type="password" className="form-control" id="exampleInputPassword1"
                                       placeholder="Password" onChange ={this.handleChange} value={this.state.password}/>
                            </div>

                            <div className="form-group" hidden = {!this.state.errormsg ? true : false}>
                                <label style={{font: "red 10px"}}>{!this.state.errormsg ? "" : "Ошибка! Повторите ещё раз!"}</label>
                            </div>
                            <button className="btn btn-dark" onClick={this.login}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default Login;
