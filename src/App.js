import logo from './logo.svg';
import './App.css';
import React, { Component, PureComponent, useState } from 'react'
import { Form, Input, InputNumber, Radio, Modal, Cascader ,Tree} from 'antd'
import axios from 'axios'
import Plot from 'react-plotly.js';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const option_url = '/voyage/' + '?hierarchical=false'

const AUTH_TOKEN = 'Token 30da72e68ebc2beeaaf69a15dcfc56844fb7e05d';

axios.defaults.baseURL = 'https://voyages3-api.crc.rice.edu'; //'http://127.0.0.1:8000'
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

function App () {
  
  const [plot_field, setarrx] = useState([])
  const [plot_value, setarry] = useState([])

  // const [option_field, setOption] = useState([])

  const [option_field, setField] = React.useState('');
  const [option_value, setValue] = React.useState('');
  // const [value, setField] = React.useState('');

  const handleChange_X = (event) => {
    setField(event.target.value);
  };
  const handleChange_Y = (event) => {
    setValue(event.target.value);
  };

  var scatter_plot_x_vars=[
    'voyage_dates__imp_arrival_at_port_of_dis_yyyy',
    'voyage_dates__imp_length_home_to_disembark',
    'voyage_dates__length_middle_passage_days',
    'voyage_crew__crew_voyage_outset',
    'voyage_crew__crew_first_landing',
    'voyage_slaves_numbers__imp_total_num_slaves_embarked',
    'voyage_slaves_numbers__imp_total_num_slaves_disembarked'
    ]
  
  var scatter_plot_y_vars=[
    'voyage_slaves_numbers__imp_total_num_slaves_embarked',
    'voyage_slaves_numbers__imp_total_num_slaves_disembarked',
    'voyage_slaves_numbers__percentage_female',
    'voyage_slaves_numbers__percentage_male',
    'voyage_slaves_numbers__percentage_child',
    'voyage_slaves_numbers__percentage_men_among_embarked_slaves',
    'voyage_slaves_numbers__percentage_women_among_embarked_slaves',
    'voyage_slaves_numbers__imp_mortality_ratio',
    'voyage_slaves_numbers__imp_jamaican_cash_price',
    'voyage_slaves_numbers__percentage_boys_among_embarked_slaves',
    'voyage_slaves_numbers__percentage_girls_among_embarked_slaves',
    'voyage_ship__tonnage_mod',
    'voyage_crew__crew_voyage_outset',
    'voyage_crew__crew_first_landing'
  ]

  // axios.options()


  function handleClick() {

    // axios.defaults.headers.post['Content-Type'] = 'application/json';
    // axios.defaults.headers.post['Content-Type'] = 'text/plain';

    var group_by = option_field//'voyage_itinerary__imp_principal_place_of_slave_purchase__geo_location__name'
    var value = option_value//"voyage_slaves_numbers__imp_total_num_slaves_disembarked"

    var data = new FormData();
    data.append('hierarchical', 'False');

    data.append('groupby_fields', group_by)
    data.append('groupby_fields', value)
    data.append('agg_fn','sum')
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
        <div>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">X Field</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={option_field}
                label="Field"
                onChange={handleChange_X}
              >
                {scatter_plot_x_vars.map((option) => (
                  <MenuItem value={option}>
                    {option}
                  </MenuItem>
                ))}
                {/* <MenuItem value={scatter_plot_x_vars}>{scatter_plot_x_vars}</MenuItem> */}

              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Y Field</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={option_value}
                label="Value Field"
                onChange={handleChange_Y}
              >
                {scatter_plot_y_vars.map((option) => (
                  <MenuItem value={option}>
                    {option}
                  </MenuItem>
                ))}
                {/* <MenuItem value={scatter_plot_x_vars}>{scatter_plot_x_vars}</MenuItem> */}

              </Select>
            </FormControl>
          </Box>
        </div>
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


