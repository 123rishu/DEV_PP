import speaker from "./speaker.jpg";
import book from "./book.jpg";
import smartphone from "./smartphone.jpg";

const INITIAL_STATE = {
  products: [
    {
      id: 1,
      title: "Smartphone",
      description:
        `This smartphone is not just a sight to behold but also comes equipped with innovative features
               that will keep you productive and entertained. Its Helio G85 Gaming Processor ensures that you stay
                on top of the leaderboard while gaming. Its 16.5 cm (6.5) Mini-drop Fullscreen ensures an immersive
                 experience while gaming, streaming content, and more. `,
      price: 20000,
      image: smartphone,
    },
    {
      id: 2,
      title: "Bluetooth Speaker",
      description:
        `With the Bluetooth speaker, you can enjoy motivational, dance, or instrumental music whenever you want. 
              It ensures an immersive listening experience with its 52 mm full-range driver so that you can stay entertained
               wherever you are. With an IPX7 rating, it ensures water resistance so that you can listen to music by
                the poolside without a worry in the world.`,
      price: 999.0,
      image: speaker,
    },
    {
      id: 3,
      title: "Book",
      description:
        `The land of Meluha is an empire created by Lord Rama, and it is ruled by the Suryavanshis. This empire 
              is powerful and proud, however, the Saraswati river that is their source of water is slowing drying up. 
              On top of that, the empire is at war with the Chandravanshis who have allied with The Nagas, a group of 
              sinister and deformed human beings who have extraordinary martial art skills.`,
      price: 250.0,
      image: book
    },
  ],
  cart: [],
  currentItem: null
}

const shopReducer = (state = INITIAL_STATE, action) => {
  if (action.type == "SET_CURRENT") {
    return {
      ...state,
      currentItem: action.payload,
    }
  }
  else if (action.type == "ADD_TO_CART") {
    if (state.cart.length) {
      let isPresent = false;
      let updatedCart = state.cart.map((curr) => {
        if (curr.id == action.payload.id) {
          isPresent = true;
          return { ...curr, qty: curr.qty + 1 }
        }
        else {
          return curr;
        }
      })

      if (isPresent == false) {
        updatedCart.push({ ...action.payload, qty: 1 });
      }

      return {
        ...state,
        cart: updatedCart,
      }
    }
    else {
      return {
        ...state,
        cart: [{ ...action.payload, qty: 1 }]
      }
    }
  }
  else if (action.type == "REMOVE_FROM_CART") {
    return {
      ...state,
      cart: state.cart.filter((item) => item.id !== action.payload),
    }
  }
  else if(action.type == "ADJUST_QTY"){
    let updatedCart = state.cart.map((currCartObj)=>{
        if(currCartObj.id == action.payload.id){
          return {
            ...currCartObj,
            qty: action.payload.value,
          }
        }
        else{
          return currCartObj;
        }
    })
    return {
      ...state,
      cart: updatedCart,
    }
  }
  else {
    return state;
  }


  // cart length is empty => then add current product to cart

  //cart length is not empty, but our product is not in that, then add our product with qty zero

  //cart length is not empty, and our product is already inside, then only inc its qty by 1
}

export default shopReducer;