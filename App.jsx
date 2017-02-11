import React from 'react';
import TextBox from './Components/textBox';
import SimpleTable from './Components/simpleTable';
function saveAppState(data, name) {
    localStorage.setItem(name, JSON.stringify(data));
}

function getAppState(name) {
    if (localStorage.getItem(name))
        return JSON.parse(localStorage.getItem(name));
    else
        return petslist;
}

let petslist = [
    ];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pets: getAppState('pets'),
            foods: getAppState('foods')
        };

        this.saveFood = this.saveFood.bind(this);
    }

    /** add new element to table (row or col)
     *
     * @param name
     * @param key - name of state
     */
    addElementToTable(name, key) {
        let tmpList = this.state[key].slice(),
            newElement = {
                name: name,
                id: Math.floor(Math.random() * 1000000)
            };

        tmpList.push(newElement);

        if(key == 'foods')
            this.saveFood(newElement.id);

        if(key == 'pets'){
            newElement.foods = {};
            this.state.foods.map((food)=>{
                newElement.foods[food.id] = false;
                return true;
            })
        }

        this.setState({[key]:tmpList});
        saveAppState(tmpList, key);
    }

    saveFood(foodId) {
        this.state.pets.map((pet) => {
            pet.foods[foodId] = false;
        })
    }

    saveState(data, key){
        // console.log(data);
      this.setState({[key]:data});
      saveAppState(data,key);
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <SimpleTable data={this.state} checkBoxClick={this.saveState.bind(this)}/>
                    <TextBox
                        name="pets" //key
                        titleText="Новый питомец..."
                        myClickEvent={this.addElementToTable.bind(this)}
                    />
                    <TextBox
                        name="foods" //key
                        titleText="Новая еда..."
                        myClickEvent={this.addElementToTable.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

export default App;