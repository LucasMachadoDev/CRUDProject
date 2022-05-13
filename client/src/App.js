import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import Card from './components/Cards';
import './App.css';

function App() {
  const [values, setValues] = useState();
  const [listGames, setListGames] = useState([]);
  
  const handleAddValues = value => {
    setValues(prevValue => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  }

  const handleRegisterGame = () => {
    Axios.post("http://localhost:5000/register", {
      name: values.name,
      cost: values.cost,
      category: values.category,
    }).then(() => {
      Axios.post("http://localhost:5000/search", {
        name: values.name,
        cost: values.cost,
        category: values.category,
      })
      .then((response) => {
        setListGames([
          ...listGames,
          {
            id: response.data[0].id,
            name: values.name,
            cost: values.cost,
            category: values.category,
          },
        ]);
      });
    });
  };

  useEffect(() => {
    Axios.get('http://localhost:5000/getCards')
    .then(response => {
      setListGames(response.data);
    });
  }, []);
  

  return (
    <div className="App-container">
      <div className="Register">
        <h1>Serim Shop</h1>
        <input 
          type="text" 
          name="name" 
          placeholder='Nome' 
          className='Register-input'
          onChange={handleAddValues}
          value={values.name}
        />
        <input 
          type="text" 
          name="cost" 
          placeholder='Preço' 
          className='Register-input'
          onChange={handleAddValues}
          value={values.cost}
        />
        <input 
          type="text" 
          name="category" 
          placeholder='Categoria' 
          className='Register-input'
          onChange={handleAddValues}
          value={values.category}
        />
        <button className='Register-button' onClick={() => handleRegisterGame()}>Cadastrar</button>
      </div>
      <div className='Card-wrapper'>
        { typeof listGames !== "undefined" &&
          listGames.map((value) => {
            return (
              <Card 
                key={value.id} 
                listGames={listGames} 
                setListGames={setListGames}
                id={value.id}
                name={value.name}
                cost={value.cost}
                category={value.category}
              ></Card>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
