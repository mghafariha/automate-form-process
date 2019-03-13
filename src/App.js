import React from 'react'

import { Provider } from 'react-redux';  
import store from './store'
import Template from './template'
const formName="Edit"
class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
              <Template  />
            </Provider>
        )
    }
}



export default App