import logo from './logo.svg';
import './App.css';
import React, { Component, PureComponent } from 'react'
import { Form, Input, InputNumber, Radio, Modal, Cascader ,Tree} from 'antd'
import axios from 'axios'


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
    // axios.defaults.headers.post['Content-Type'] = 'application/json';
    // axios.defaults.headers.post['Content-Type'] = 'text/plain';

    
    
    var data = new FormData();
    data.append('hierarchical', 'False');

    // data.append("voyage_itinerary__imp_principal_region_slave_dis__region","Barbados")
    data.append('groupby_fields','voyage_itinerary__principal_port_of_slave_dis__place')
    data.append('value_field_tuple','voyage_slaves_numbers__imp_total_num_slaves_disembarked')
    data.append('value_field_tuple','sum')
    data.append('cachename','voyage_export')

    // var data = JSON.stringify({
    //   "hierarchical": "False",
    //   "voyage_ship__imputed_nationality__name": "U.S.A"
    // })

    // data.append('voyage_itinerary__imp_principal_region_slave_dis__region', 'Barbados');


    axios.post('/voyage/groupby', data=data)
      .then(function (response) {

        // console.log(response.data);
        // console.log(response.data[0].voyage_itinerary__imp_principal_region_slave_dis__region)

        // var arr = response.data.map((n) => {
        //   return n.voyage_itinerary.imp_port_voyage_begin.region.region
        // });


        function groupBySum(data, key, value) {
          var pair = {}
          for(var j in data){
            if(!pair[data[j][key]]) {
              pair[data[j][key]] = data[j][value]
            }
            else{
              pair[data[j][key]] += data[j][value]
            }
          }
          return pair
        }

        var key = "voyage_ship__imputed_nationality__name"
        var value = "voyage_itinerary__imp_broad_region_voyage_begin__value"
        // console.log(groupBySum(response.data, key, value))

        var data = response.data.replaceAll("NaN", "null")
        console.log(data)
        console.log(JSON.parse(data))
        // console.log(typeof response.data)
        console.log(Object.keys(response.data).length)

        

        // console.log(Object.keys(response.data))
        // for(var k in keys) {
        //   var sum = 0;
        //   for(var r in [...Array(response.data.length).keys()]){
        //     sum += response.data[r][k]
        //   }
        // }

        
      })
      .catch(function (error) {
        console.log(error);
      });





    // fetch('https://voyages3-api.crc.rice.edu/voyage/', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': AUTH_TOKEN,
    //     // 'content-type': 'application/json'
    //   },

    //   data: {
    //     'hierarchical': 'False'
    //   }

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


