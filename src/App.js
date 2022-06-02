import logo from './logo.svg';
import './App.css';
import React, { Component, PureComponent, useState } from 'react'
import { Form, Input, InputNumber, Radio, Modal, Cascader ,Tree} from 'antd'
import axios from 'axios'
import Plot from 'react-plotly.js';

const option_url = '/voyage/' + '?hierarchical=false'


// var plot_field = []
// var plot_value = []



function App () {
  
  const [plot_field, setarrx] = useState([])
  const [plot_value, setarry] = useState([])

  function handleClick() {

    const AUTH_TOKEN = 'Token 0bfda2118118484d52aeec86812269aadeb37c67';

    axios.defaults.baseURL = 'https://voyages3-api.crc.rice.edu'; //'http://127.0.0.1:8000'
    axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
    // axios.defaults.headers.post['Content-Type'] = 'application/json';
    // axios.defaults.headers.post['Content-Type'] = 'text/plain';


    var group_by = 'voyage_itinerary__imp_principal_place_of_slave_purchase__geo_location__name'
    var value = "voyage_slaves_numbers__imp_total_num_slaves_disembarked"

    var data = new FormData();
    data.append('hierarchical', 'False');

    data.append('groupby_fields', group_by)
    data.append('value_field_tuple', value)
    data.append('value_field_tuple','sum')
    data.append('cachename','voyage_export')

    axios.post('/voyage/groupby', data=data)
      .then(function (response) {

        setarrx(Object.keys(response.data[value]))
        setarry(Object.values(response.data[value]))
        // var arr = response.data[value].map((n) => {
        //   return n
        // });
        console.log(plot_value)
        
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




    return (
      <div>
        <div className='button_container'>
          <button className='button' onClick={handleClick}>Click Me</button>
        </div>
        <div>
          <Plot
            data={[
              {
                x: plot_field,
                y: plot_value,
                type: 'bar',
                mode: 'lines+markers',
                marker: {color: 'red'},
              },
              {type: 'bar'},
            ]}
            layout={ {width: 1000, height: 500, title: 'A Fancy Plot'} }
          />
        </div>
      </div>
      
      
    )
  

}

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

export default App;


