import React from 'react';
import  Button from './Button';

export default class InputBox extends React.Component {
    constructor() {
        super();
        this.state = {
            "textName": ''
        }
    }

    handleClick() {
        this.props.myClickEvent(this.state.textName, this.props.name);
        this.setState({textName: ''});
    }

    onChangeListener(e) {
        this.setState({textName: e.target.value});
    }

    render() {
        return (
            <div className="input-group">
                <input type="text" className="form-control" value={this.state.textName}
                       onChange={this.onChangeListener.bind(this)}
                       placeholder={this.props.titleText}
                />
                <span className="input-group-btn">
                  <button
                      className="btn btn-default"
                      type="button"
                      onClick={this.handleClick.bind(this)}
                  >Добавить</button>
              </span>
            </div>
        )
    }
}