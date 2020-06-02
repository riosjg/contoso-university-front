import React, {useState, useEffect} from 'react'

const UserContext = React.createContext()

const UserProvider = (props) => {
    const [loggedUser, setLoggedUser] = useState({})
    useEffect(() => {
    (async () => {
        let response = {};
        let res = await fetch(`https://localhost:44340/api/students/${props.id}`)
        response = await res.json();
        setLoggedUser(response);
    })()
  }, [props.id]) //Empty array as a second parameter prevents fetching an infinite amount of times because of the re-rendering of useEffect() 

  return (
<>
    {
    Object.keys(loggedUser).length < 1 ? null : 
      <UserContext.Provider value={{
          loggedUser
      }}>
          {props.children}
      </UserContext.Provider>
    }
</>
  )
}

export { UserProvider, UserContext }
