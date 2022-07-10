import React from 'react'
import './Coin.css'
import {Card,Button} from 'react-bootstrap'
import Image from 'react-bootstrap/Image'

function Coin({image, name, symbol, price, volume, priceChange, marketcap}) {
    return ( 
        
                <Card bg="primary">
                    <Image shape="thumbnail" height="100px" width="100px" src={image} alt='crypto-logo'/>
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Text>{symbol}</Card.Text>
                        <Card.Text>${price}</Card.Text>
                        <Card.Text>${volume.toLocaleString()}</Card.Text>
                        {priceChange < 0 ? (   
                            <Card.Text className='coin-percent red'>{priceChange.toFixed(2)}%</Card.Text>
                        ) : (<Card.Text className='coin-percent green'>{priceChange.toFixed(2)}%</Card.Text>
                        )}
                        <Card.Text>Market Cap: ${marketcap.toLocaleString()}</Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
    )
}

export default Coin;