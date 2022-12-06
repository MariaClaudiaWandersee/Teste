import React, {useState, useEffect} from "react";
import './App.css';
import Axios from "axios";
import Card from "./components/cards/cards";

function App() {
  const [values,SetValues] = useState();
  const [listGames, setListGames] = useState();
  console.log(listGames);

  const handlechangeValues = value =>{
    SetValues((prevValue) => ({
        ...prevValue,
        [value.target.name]: value.target.value,
    }));
  };

  //para registrar dados após clicar no botão
  const handleClickButton = () =>{
    Axios.post("http://localhost:3001/register", {
      name: values.name,
      cost: values.cost,
      category: values.category,
    }).then((response)=>{
      console.log(response)
    });
  };

  useEffect(() =>{
    Axios.get("http://localhost:3001/getCards").then((response)=> {
      //sempre que o getCards for renderizado, então mostrará a listagem dos dados salvos no db.
      setListGames(response.data);
    });
  },[]);

  return (
    <div className="app--container">
      <div className="register--container">
        <h1 className="register--title">Scrim Shop</h1>
        <input type="text" name="name" placeholder="Nome" className="register--input" onChange={handlechangeValues}
        />
        <input type="text" name="const" placeholder="Preço" className="register--input"
        onChange={handlechangeValues}
        />
        <input type="text" name="category" placeholder="Categoria" className="register--input"
        onChange={handlechangeValues}
        />
        <button className="register--button"
          onClick={() => handleClickButton()}>Cadastrar
        </button>
      </div>
      { typeof listGames !== "undefined" && 
        listGames.map((value) => {
          return (
            <Card
              key={value.id}
              listCard={listGames}
              setListCard={setListGames}
              id={value.id}
              name={value.name}
              cost={value.cost}
              category={value.category}>
            </Card>
          );
        })}
    </div>
  );
}

export default App;
