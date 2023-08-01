import { useState,createContext,useContext,useEffect } from "react";


const BasketContext = createContext();


//LOCAL STORAGE START
const defaultBasket =JSON.parse(localStorage.getItem('basket')) || [] ; 

//LOCAL STORAGE END

const BasketProvider = ({children}) => {
    const [items, setItems] = useState(defaultBasket);

    

    useEffect(() => {
        localStorage.setItem('basket',JSON.stringify(items)); 
    },[items]) ;/
        
    //LOCALSTORAGE END


    const addToBasket = (data,findBasketItem) => {  //add product to basket :
        //burası sepette yoksa sepete ekleyelim
        if(!findBasketItem){
            return setItems((items) => [data, ...items])
        } 
        //-------------------------------
        //if same product in basket take it off
        const filtered = items.filter((item) => item._id !== findBasketItem._id);
        //-------------------------------

        setItems(filtered);
    };

    //-------------------------------------------------------------------------

    //sepet detay sayfasında ürün kaldırmak için:

    const removeFromBasket = (item_id) => {
        const filtered = items.filter((item) => item._id !== item_id); 


    }
    




    const emptyBasket = () => setItems([]);



    const values = {
        items,
        setItems,
        addToBasket,
        removeFromBasket,
        emptyBasket,
    };

    return <BasketContext.Provider value={values}>
        {children}
    </BasketContext.Provider>
}

const useBasket = () => useContext(BasketContext);
export {
    BasketProvider,
    useBasket,
    
}
