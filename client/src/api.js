import axios from "axios";




//Autharization access token . for session . 
axios.interceptors.request.use(function (config) {
    const {origin} = new URL(config.url);
    const allowedOrigins = [process.env.REACT_APP_BASE_ENDPOINT];
    const token = localStorage.getItem('access-token');

    if (allowedOrigins.includes(origin)){
        config.headers.authorization = token
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

//----------------------------------------------------------------------------------------------------------------------- 

//We will pull the data with axios and throw it into Products as a function.
export const fetchProductList = async ({ pageParam = 0 }) => {  //infinite query yapmak için buraya parametre olarak pageParam=0 verdik.
    const {data} = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/product?page=${pageParam}`); // sayfaya bir buton koyarak 12 şer olarak tıklanıldığında veri getirecek eğer veri yok ise de bunu belirtecek. ?page=${pageParam} ifadesini url e ekleyip InfıniteQuery de kullancak.

    return data ;
}


//Using Product Detail useParams, we get the product_id information and according to the incoming product id, we want to pull the data according to the url address.
export const fetchProduct = async (product_id) => {
    const {data} = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/product/${product_id}`);

    return data;
}



//Sıgn Up process
export const fetchRegister = async (input)=>{
    const {data} = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/register`,input);

    return data;
}


//session , login and login situation
export const fetchMe = async () => {
    const {data} = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/me`);
    return data;
}



//Logout

export const fetchLogout = async () => {
    const {data} = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/logout`,{
        refresh_token:localStorage.getItem('refresh-token')}
        
    );

    return data;
}


//Sign In 

export const fetchLogin = async (input) => {
    const {data} = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/login`,input);
    return data;
}



//order

export const postOrder = async (input) => {
	const { data } = await axios.post(
		`${process.env.REACT_APP_BASE_ENDPOINT}/order`,
		input
	);
	return data;
};




//admin order
export const fetchOrders = async () => {
	const { data } = await axios.get(
		`${process.env.REACT_APP_BASE_ENDPOINT}/order`
	);
	return data;
};



//order delete

export const deleteProduct = async (product_id) => {
    const {data} = await axios.delete(`${process.env.REACT_APP_BASE_ENDPOINT}/product/${product_id}`);
    return data;
}


//product update

export const updateProduct = async (input,product_id) => {
    const {data} = await axios.put(`${process.env.REACT_APP_BASE_ENDPOINT}/product/${product_id}`,input);
    return data;
}




//add new product

export const postProduct = async (input) => {
	const { data } = await axios.post(
		`${process.env.REACT_APP_BASE_ENDPOINT}/product/`,
		input
	);
	return data;
};



