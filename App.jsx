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
        return (name == 'pets' ? [] : [{'name':'Название', 'id':1}]);
}
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pets: getAppState('pets'),
            foods: getAppState('foods')
        };

        this.saveFood = this.saveFood.bind(this);
        this.loadData = this.loadData.bind(this);
        this.saveAppData = this.saveAppData.bind(this)
    }

    loadData() {
        let url = "https://morning-anchorage-48598.herokuapp.com/";
        fetch(url + 'getData').then((response) => response.json()).then((data) => {
            console.log(data);
            this.setState({
                pets:JSON.parse(data[0].pets),
                foods:JSON.parse(data[0].foods)
            });
        })
    }

    saveAppData(e) {
        var sendData = function (url, data) {
            let xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
            xmlhttp.open("POST", url);
            xmlhttp.setRequestHeader("Content-Type", "application/json");
            xmlhttp.send(JSON.stringify(data));
        }
        sendData("https://morning-anchorage-48598.herokuapp.com/saveData",{
            foods:JSON.stringify(this.state.foods),
            pets:JSON.stringify(this.state.pets)
        });

    }
    componentDidMount() {
        this.loadData();
        window.addEventListener('beforeunload', this.saveAppData);

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
                    <button className="btn btn-primary" onClick={this.loadData}>Load</button>
                    <button className="btn btn-primary" onClick={this.saveAppData}>Save</button>

                </div>
            </div>
        );
    }
}

export default App;

/*
 [{"name":"Название","id":1},{"name":"Икака","id":2},{"name":"Shurup","id":3},{"name":"Рыба,моллюски","id":786183},{"name":"Мясо","id":773299},{"name":"Краски","id":893656},{"name":"Вода","id":304408},{"name":"Овощи,фрукты","id":514586},{"name":"Печеньки ,сладости","id":961422},{"name":"Нефть, масло","id":833172},{"name":"Молоко","id":865125},{"name":"Крабсбургер","id":725518}]
 [{"name":"Козюля","id":1,"foods":{"1":false,"2":false,"3":false,"304408":false,"514586":false,"725518":false,"773299":false,"786183":true,"833172":false,"865125":false,"893656":false,"961422":false}},{"name":"Икака","id":2,"foods":{"1":false,"2":false,"3":false,"304408":false,"514586":false,"725518":false,"773299":false,"786183":false,"833172":true,"865125":false,"893656":false,"961422":false}},{"name":"Shurup","id":3,"foods":{"1":false,"2":false,"3":false,"304408":false,"514586":false,"725518":false,"773299":false,"786183":false,"833172":false,"865125":false,"893656":false,"961422":false}},{"name":"Волшебник","id":93988,"foods":{"1":false,"2":false,"3":false,"304408":false,"514586":false,"725518":false,"773299":false,"786183":false,"833172":false,"865125":false,"893656":false,"961422":false}},{"name":"Повар","id":232440,"foods":{"1":false,"2":false,"3":false,"304408":false,"514586":false,"725518":false,"773299":false,"786183":false,"833172":false,"865125":false,"893656":false,"961422":false}},{"name":"Котик  \"тыгдык\"","id":588078,"foods":{"1":false,"2":false,"3":false,"304408":false,"514586":false,"725518":false,"773299":false,"786183":false,"833172":false,"865125":false,"893656":false,"961422":false}},{"name":"Енотик","id":452389,"foods":{"1":false,"2":false,"3":false,"304408":false,"514586":false,"725518":false,"773299":false,"786183":false,"833172":false,"865125":false,"893656":false,"961422":false}},{"name":"Облачко","id":462442,"foods":{"1":false,"2":false,"3":false,"304408":false,"514586":false,"725518":false,"773299":false,"786183":false,"833172":false,"865125":false,"893656":false,"961422":false}},{"name":"Демон (2-3 вида)","id":691100,"foods":{"1":false,"2":false,"3":false,"304408":false,"514586":false,"725518":false,"773299":false,"786183":false,"833172":false,"865125":false,"893656":false,"961422":false}},{"name":"Курица","id":623246,"foods":{"1":false,"2":false,"3":false,"304408":false,"514586":false,"725518":false,"773299":false,"786183":false,"833172":false,"865125":false,"893656":false,"961422":false}},{"name":"Киндер сюрприз","id":810651,"foods":{"1":false,"2":false,"3":false,"304408":false,"514586":false,"725518":false,"773299":false,"786183":false,"833172":false,"865125":false,"893656":false,"961422":false}},{"name":"Бабочка","id":605130,"foods":{"1":false,"2":false,"3":false,"304408":false,"514586":false,"725518":false,"773299":false,"786183":false,"833172":false,"865125":false,"893656":false,"961422":false}},{"name":"Мандрагора","id":705417,"foods":{"1":false,"2":false,"3":false,"304408":false,"514586":false,"725518":false,"773299":false,"786183":false,"833172":false,"865125":false,"893656":false,"961422":false}},{"name":"Лисенок","id":286497,"foods":{"1":false,"2":false,"3":false,"304408":false,"514586":false,"725518":false,"773299":false,"786183":false,"833172":false,"865125":false,"893656":false,"961422":false}},{"name":"Цербер","id":355697,"foods":{"1":false,"2":false,"3":false,"304408":false,"514586":false,"725518":false,"773299":false,"786183":false,"833172":false,"865125":false,"893656":false,"961422":false}}]
 */