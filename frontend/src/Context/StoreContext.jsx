import { createContext,  useEffect,  useState } from "react";
/*import { food_list } from "../assets/assets";*/
import axios from "axios";


export const storeContext = createContext(null);


const StoreContextProvider = (props) => {
    const [token,setToken] = useState("");
    const [cartItems, setCartItems] = useState({});
    const [food_list,setFoodList] = useState([]);
    const url = "https://mern-food-del-web-page-3.onrender.com";
    

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token){
            await axios.post(url + "/api/cart/add",{itemId},{headers : {token}})
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token){
            await axios.post(url + "/api/cart/remove",{itemId},{headers : {token}})
        }

    }

    const getTotalCartAmount =  () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {


                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price*cartItems[item];
            }
        }
        
        //console.log(totalAmount);
        return totalAmount;
    }

    const fetchFoodList = async ()=>{
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data)
    }

    const localCartData = async(token)=>{
        const response = await axios.post(url + "/api/cart/get",{},{headers : {token}})
        setCartItems(response.data.cartData)
    }

    useEffect(()=>{
        
        async function loadData(){
            await fetchFoodList();
        
        if (localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
            await localCartData(localStorage.getItem("token"))
        }
    }
        loadData();
    },[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    return (
        <storeContext.Provider value={contextValue}>
            {props.children}
        </storeContext.Provider>
    )
}

export default StoreContextProvider
