import { ADD_CITY, ADD_COUNTRY, ADD_CITIES } from "./action";

export const reducer = (store, action) => {
    console.log(action)
   switch (action.type) {
      case ADD_CITY:
         return {
            ...store,
            cities: [...store.cities, ...action.payload],
         };
         case ADD_CITIES:
             return {
                 ...store, cities: [...action.payload]
             }
      default:
         return { ...store };
   }
};


