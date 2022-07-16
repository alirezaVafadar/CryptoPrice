import './App.css';
import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import Coin from './coin';
import { Container, Row, Col, Form, Nav, Navbar} from 'react-bootstrap';
import Modal from './Modal';
import data from "./api";

function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [currency, setCurrency] = useState("USD");
  const [chosenCoin, setChosenCoin] = useState(null);
  const [modal, setModal] = useState(false);
  const [coinData, setCoinData] = useState([]);
  const[id,setId]=useState(null);
  

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

  useEffect(() => {
    if (chosenCoin !== null) {
      data
        .getCoinHistory(chosenCoin, currency)
        .then((result) => {
          setCoinData(result.data);
          setModal(true);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
          } else if (error.request) {
            console.log(error.request);
          } else if (error.message) {
            console.log(error.message);
          }
        });
    }
  }, [chosenCoin, currency]);

  useEffect(() => {
    if (!modal) {
      setChosenCoin(null);
    }
  }, [modal]);


  const handleChange = e => {
    setSearch(e.target.value)
  }

  const handleId=(passedId)=>{
    setId(passedId);
  }

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLocaleLowerCase())  
  )

  return(
    <React.Fragment>
      <Navbar bg="dark" variant="dark">
          <Container>
          <Navbar.Brand href="#home">
            <img
              src="/logo192.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React logo"
            />
          </Navbar.Brand>
            <Nav>
              <Navbar.Brand href="#home">
                <img
                  src="/Github.png"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                />
              </Navbar.Brand>
              <Navbar.Brand href="#home">
                <img
                  src="/linkedin.png"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                />
              </Navbar.Brand>
              <Navbar.Brand href="#home">
                <img
                  src="/website.png"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                />
              </Navbar.Brand>
            </Nav>
          </Container>
        </Navbar>
      <Container>
        <Row className='coin-search'>
          <Col  xs={10} md={6}>
            <h1 className='head'>Crypto Price</h1>
            <Form className='coin-input' >
            <Form.Group className="mb-3">
              <Form.Control  className='coin-input' type="text" placeholder="search a currency" onChange={handleChange}/>
            </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row>
          
            {filteredCoins.map(coin => {
            return <Col xs={12} md={6} lg={4}>
              <Coin
              selectedId={handleId}
              key={coin.id}
              id={coin.id}
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
      {modal && (
        <Modal
          coinHistory={coinData}
          onClose={setModal}
          coinInfo={id === chosenCoin[0]}
        />
      )}
    </React.Fragment>
  )
}

export default App;