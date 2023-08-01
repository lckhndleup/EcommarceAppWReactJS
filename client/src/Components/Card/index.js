import React from 'react';
import {Box,Image,Button} from "@chakra-ui/react";
import { NavLink } from 'react-router-dom';
import moment from 'moment';

//Context
import {useBasket} from '../../Context/BasketContext';


function Card({item}) {


    const {addToBasket,items} = useBasket() ; //anasayfa da sepete ekleme işlemleri için


    
    const findBasketItem = items.find((basket_item) => basket_item._id === item._id);

    return (
        <Box borderRadius='lg' overflow='hidden' p={3}>  
            <NavLink to={`/product/${item._id}`}>
               
                <Image  src={item.photos[0]} loading='lazy'/>
                <Box p={6}>
                    <Box display={'flex'} alignItems={'baseline'}>
                        {moment(item.createdAt).format('DD/MM/YY')}
                    </Box>
                    <Box mt={1} fontWeight={'semibold'} as='h4' lineHeight='3'>
                        {item.title}
                    </Box>
                    <Box mt={2} >
                        {item.price}
                    </Box>
                </Box>
            </NavLink>
            <Button colorScheme={findBasketItem ? 'pink' : 'green'} variant={'solid'} onClick={() => addToBasket(item,findBasketItem)}> {/* butonun rengini ürün sepette olma durumuna göre değiştircez*/}
                {
                    findBasketItem ? 'Remove From Cart' : 'Add To Cart'
                }
            </Button>
        </Box>
    )
}

export default Card
