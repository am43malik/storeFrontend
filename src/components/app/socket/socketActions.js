export const storeSocket = (socket)=>{
    return{
        type:"STORE_SOCKET",
        payload:socket
    }
}

export const updateSocket =(messages)=>{
    return {
        type:"UPDATE_SOCKET",
        payload:messages
    }
}


export const sendData =(data)=>({
    type:'SEND_DATA',
    payload:data
})
export const setToken =(token)=>({
    type: 'SET_TOKEN',
    payload:token
})

export const clearToken = () => ({
    type: 'CLEAR_TOKEN'
  });