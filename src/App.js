import React from 'react';
import axios from 'axios';
import Cardc from './components/Cardc';

function App() {
  const [cardItems, setCardItems] = React.useState([]);
  const [count, setCount] = React.useState(1);
  const [isLastScreenFull, setIsLastFull] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`https://swapi.dev/api/starships/?page=1`);
        data.count % 10 === 0 ? setIsLastFull(true) : setIsLastFull(false);
        setCardItems((prev) => [...prev, ...data.results]);
      } catch (error) {
        alert('Ошибка при запросе');
      }
    }
    fetchData();
  }, []);

  const onClickEvent = async (page) => {
    setCount((prev) => prev + page);
    try {
      const { data } = await axios.get(`https://swapi.dev/api/starships/?page=${count + page}`);

      if (data.next === null && !isLastScreenFull) {
        const { data: preLastData } = await axios.get(
          `https://swapi.dev/api/starships/?page=${count}`,
        );
        const lastScreen = [
          ...preLastData.results.slice(data.count % 10, preLastData.results.length),
          ...data.results,
        ];
        setCardItems(lastScreen);
      } else {
        setCardItems(data.results);
      }
    } catch (error) {}
  };

  return (
    <div className="wrapper">
      <div className="App">
        {cardItems.map((el, id) => (
          <Cardc
            key={id}
            name={el.name}
            model={el.model}
            starcl={el.starship_class}
            hydrat={el.hyperdrive_rating}
            pass={el.passengers}
            manf={el.manufacturer}
          />
        ))}
      </div>
      <div className="btns">
        <button className="btn" onClick={() => onClickEvent(-1)}>
          prev
        </button>
        <button className="btn" onClick={() => onClickEvent(1)}>
          next
        </button>
      </div>
    </div>
  );
}

export default App;
