import React, {Component} from 'react';
import NavigationBar from "./NavigationBar";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0
        };
    }

    render(){
        return (
            <div className="container-fluid">
                    <NavigationBar gstate={this.props.gstate}/>
                    <div className="row">
                        <h1>Home</h1>
                    </div>
                    <div className="row">
                        <button type="submit" className="btn btn-primary" onClick={this.props.logout}>Logout</button>
                    </div>
            </div>
        );
    }
}

export default Home;
