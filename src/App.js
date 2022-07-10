import './App.css';
import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import Coin from './coin';
import { Container, Row, Col, Form} from 'react-bootstrap';

function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      await Axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false').then(response => {
        setCoins(response.data);
      }).catch(error => console.log(error));
    };
    fetchData();
    setInterval(() => {
      fetchData();
    }, 300000);
  },[]);

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLocaleLowerCase())  
  )

  return(
    <Container>
      <Row>
        <Col  xs={10} md={6}>
          <h1 className='acronym'>Crypto Price</h1>
          <Form>
          <Form.Group className="mb-3">
            <Form.Control type="search" placeholder="search a currency" onChange={handleChange}/>
          </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row>
        
          {filteredCoins.map(coin => {
          return <Col xs={12} md={4}>
            <Coin key={coin.id}
            name={coin.name} 
            image={coin.image} 
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            volume={coin.total_volume}

          />
          </Col>
          })}
        
      </Row>
    </Container>
  )
}

export default App;