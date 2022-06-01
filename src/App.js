import logo from './logo.svg';
import './App.css';
import React, { Component, PureComponent } from 'react'
import { Form, Input, InputNumber, Radio, Modal, Cascader ,Tree} from 'antd'
import axios from 'axios'

// class UserTree extends PureComponent {
//   formRef = React.createRef()


//   render() {
//     const { item,
//       treePro,
//       onExpand,
//       onCheck, 
//       onSelect,
//       } = this.props

    

//     return (
//         <Tree
//           checkable
//           onExpand={onExpand}
//           expandedKeys={treePro.expandedKeys}
//           autoExpandParent={treePro.autoExpandParent}
//           onCheck={onCheck}
//           checkedKeys={treePro.checkedTitlesTmp}
//           onSelect={onSelect}
//           selectedKeys={treePro.selectedTitlesTmp}
//           treeData={item}
//         />
//     )
//   }
// }


// export default UserTree;

class App extends Component {
  constructor() {
    super()
    this.state={}
  
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const AUTH_TOKEN = 'Token 3e9ed2e0fa70a1a5cb6f34eb7a30ebde208ecd8f';

    axios.defaults.baseURL = 'https://voyages3-api.crc.rice.edu'; //'http://127.0.0.1:8000'
    axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    // axios.defaults.headers.post['Content-Type'] = 'text/plain';

    axios.post('/voyage/', {
      })
      .then(function (response) {
        console.log(response.data);

        var arr = response.data.map((n) => {
          return n.id
        });
        console.log(arr)
      })
      .catch(function (error) {
        console.log(error);
      });


    // fetch('https://voyages3-api.crc.rice.edu/voyage/', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': AUTH_TOKEN,
    //     // 'content-type': 'application/json'
    //     // 'Access-Control-Allow-Headers': 'Authorization',
        
    //   },
    //   mode: 'cors'

    // }).then(res => res.json()).then(res=>{
    //   console.log(res)
    //   });
  }



  render() {
    return (
      <div className='button_container'>
        <button className='button' onClick={this.handleClick}>Click Me</button>
      </div>
    )
  }

}

export default App;


