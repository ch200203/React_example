import React, { Component } from 'react';

class FooterComponent extends Component {
    constructor(pros){
        super(pros)
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <footer className="footer">
                    <span className="text-muted">Strated 2021</span>
                </footer>
            </div>
        );
    }
}

export default FooterComponent;