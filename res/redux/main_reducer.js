export const SET_USER = "SET_USER";
export const SET_TOKEN = "SET_TOKEN";

export const reducer = (state ={

    username:"",
    token:"",      
  
  }, action) =>{
  
    const {payload} = action;
    switch(action.type){
  
      case SET_USER:
  
        return {...state, username:payload.username};        
  
      case SET_TOKEN:
        return {...state, token:payload.token};              
  
    }
  
  
  }
  