import React, {Component} from 'react';
import NavigationBar from "./NavigationBar";
import axios from "axios";
import config from "../core/config";
import Timeline from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment';


const groups = [{ id: 1, title: 'group 1' }, { id: 2, title: 'group 2' }];

const items = [
    {
        id: 1,
        group: 1,
        title: 'item 1',
        start_time: moment(),
        end_time: moment().add(1, 'hour')
    },
    {
        id: 2,
        group: 2,
        title: 'item 2',
        start_time: moment().add(-0.5, 'hour'),
        end_time: moment().add(0.5, 'hour')
    },
    {
        id: 3,
        group: 1,
        title: 'item 3',
        start_time: moment().add(2, 'hour'),
        end_time: moment().add(3, 'hour')
    }
];

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: null,
            groups: null
        };
        this.redistribute = this.redistribute.bind(this);
        this.get_data = this.get_data.bind(this);
    }

    redistribute(){
        axios(config.BACKEND_URL+'/audit/distribute/', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'token ' + localStorage.getItem('token'),
            }
        })
            .then(function (response) {
                console.log(response.data);
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    get_data(){
        let self = this;
        axios(config.BACKEND_URL+'/audit/get_reservations/', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'token ' + localStorage.getItem('token'),
            }
        })
            .then(function (response) {
                console.log(response.data);
                // localStorage.setItem('email', response.data[0]);
                // localStorage.setItem('userId', response.data[1]);
                // self.login(response.data[0].toLowerCase());
                // let new_items = [];
                for (let i=0; i<response.data.items.length; i++){
                    let item = response.data.items[i];
                    item.start_time = new moment(item.start_time);
                    item.end_time = new moment(item.end_time);
                    item.canMove = false;
                    item.canResize = false;
                    item.canChangeGroup = false;
                }
                self.setState({items: response.data.items, groups: response.data.groups});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        this.get_data();
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
                        <div className="navbar-nav">
                            <a className="nav-item nav-link active" href="/addAuditory">Добавить аудиторию <span
                                className="sr-only">(current)</span></a>
                            <a className="nav-item nav-link active" href="/addRequest">Добавить запрос <span
                                className="sr-only">(current)</span></a>
                        </div>

                    </div>
                    <form className="form-inline my-2 my-lg-0">
                        {/*<input className="form-control mr-sm-2" type="search" placeholder="Search"*/}
                        {/*       aria-label="Search"/>*/}
                        <button className="btn btn-outline-danger my-2 my-sm-0" type="submit" onClick={this.props.logout}>Выйти</button>
                    </form>
                </nav>
            <div className="container-fluid">
                    {/*<NavigationBar gstate={this.props.gstate}/>*/}

                    <div className="row">
                        <h1>Home</h1>
                    </div>
                    <div>
                        {
                            this.state.groups ? <Timeline
                                groups={this.state.groups}
                                items={this.state.items}
                                defaultTimeStart={moment().add(-12, 'hour')}
                                defaultTimeEnd={moment().add(12, 'hour')}
                            /> : <div/>
                        }
                    </div>
                    <div className="container" style={{margin: "10px"}}>
                        <div className="row">
                            <button type="submit" className="btn btn-dark" onClick={this.redistribute}>Redistribute</button>
                        </div>
                    </div>

            </div>
            </div>
        );
    }
}

export default Home;
