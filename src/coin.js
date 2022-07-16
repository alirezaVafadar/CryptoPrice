import React, {useState} from 'react';
import './Coin.css'
import {Card,Button, Row, Col} from 'react-bootstrap'
import Image from 'react-bootstrap/Image'

function Coin({image, name, symbol, price, volume, priceChange, marketcap}) {
    
    return ( 
        
                <Card bg="dark" className='card'>
                    <Row>
                        <Col  xs={5} md={4}>
                            <Image  className="coin-image" shape="thumbnail" height="80px" width="80px" src={image} alt='crypto-logo'/>
                        </Col>
                        <Col className='coin-col' xs={7} md={8}>
                            <Card.Title className='coin-title'>{name}</Card.Title>
                            <Card.Text className='coin-symbol'>{symbol.toUpperCase()}</Card.Text>
                        </Col>
                    </Row>
                    <Card.Text className='coin-price white'>USD {price}</Card.Text>
                    {priceChange < 0 ? (   
                            <Card.Text className='coin-percent red'>{priceChange.toFixed(2)}%</Card.Text>
                        ) : (<Card.Text className='coin-percent green'>{priceChange.toFixed(2)}%</Card.Text>
                        )}
                    <Card.Body>
                        <Button className='coin-volume white' variant="dark">Volume: ${volume.toLocaleString()}</Button>
                        <Button className='coin-market white' variant="dark">Market Cap: ${marketcap.toLocaleString()}</Button>
                        <Row>
                            <Button  variant="primary">Price History</Button>
                        </Row>
                        
                    </Card.Body>
                </Card>
    )
}

export default Coin;