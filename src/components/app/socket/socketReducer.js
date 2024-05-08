const initialStateSocket={
    messages:[]
}

const userReducer = (state=initialStateSocket,action)=>{
    switch(action.type){
        case 'STORE_SOCKET':
            return {messages:action.payload}
        case 'UPDATE_SOCKET':
            return {messages:[...state.messages,action.payload]}
        case 'SEND_DATA':
        return{messages:[action.payload]}
        case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload
      };
    case 'CLEAR_TOKEN':
      return {
        ...state,
        token: null
      };
        default:
            return state;
    }
}

export default userReducer;