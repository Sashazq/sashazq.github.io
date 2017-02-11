import React from 'react';

class CheckBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: props.status
        }
    }

    handleChange(e) {
        let value = e.target.checked;
        this.setState({'status': value});
        this.props.onClick(e, this.props.iD, this.props.foodId, value);
    }

    render() {
        return (
            <input type="checkbox" checked={this.state.status}
                   onChange={this.handleChange.bind(this)}/>
        )
    }
}

class List extends React.Component {
    constructor(props) {
        super(props);
    }

    randomKey() {
        return Math.floor(Math.random() * 10000000);
    }

    handleClick(e, id, foodId, status) {
        let pets = this.props.data.pets.map((el) => {
            let tmp = el;
            if (el.id == id) {
                tmp = el;
                if (tmp.hasOwnProperty('foods')) {
                    tmp.foods[foodId] = status;
                }
            }
            return tmp;
        });
        this.props.checkBoxClick(pets, 'pets');
    }

    render() {
        return (
            <tbody>
            {this.props.data.pets.map((el) => {
                return (
                    <tr key={el.id}>
                        {
                            this.props.data.foods.map((pet, i) => <td key={this.randomKey()}>
                                {i > 0 ?
                                    <CheckBox onClick={this.handleClick.bind(this)} status={el.foods[pet.id]} iD={el.id}
                                              foodId={pet.id}/> : el.name}</td>)
                        }
                    </tr>
                );
            })
            }
            </tbody>
        )
    }
}

class Table extends React.Component {
    render() {
        return (
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        {this.props.data.foods.map((el) => <th key={el.id}>{el.name}</th>)}
                    </tr>
                    </thead>
                    <List checkBoxClick={this.props.checkBoxClick} data={this.props.data}/>
                </table>
            </div>
        )
    }
}

export default Table;