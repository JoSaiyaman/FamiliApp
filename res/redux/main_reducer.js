export const SET_USER = "SET_USER";
export const SET_TOKEN = "SET_TOKEN";
export const SET_FAMILYID = "SET_FAMILYID";

export const reducer = (state ={

    username:"",
    token:"",
    familyid: 0
  
  }, action) =>{
  
    const {payload} = action;
    switch(action.type){
  
      case SET_USER:
  
        return {...state, username:payload.username};        
  
      case SET_TOKEN:
        return {...state, token:payload.token};
      
      case SET_FAMILYID:
        return {...state, familyid:payload.familyid}
  
    }
  
  
  }
  