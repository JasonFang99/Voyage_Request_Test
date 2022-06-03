import logo from './logo.svg';
import './App.css';
import React, { Component, PureComponent, useState, useEffect } from 'react'
// import { Form, Input, InputNumber, Radio, Modal, Cascader ,Tree} from 'antd'
import axios from 'axios'
import Plot from 'react-plotly.js';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FormControlLabel, RadioGroup } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';


const option_url = '/voyage/' + '?hierarchical=false' // labels in dropdowns

const AUTH_TOKEN = 'Token 30da72e68ebc2beeaaf69a15dcfc56844fb7e05d';

axios.defaults.baseURL = 'https://voyages3-api.crc.rice.edu'; //'change to environment setting'
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;


function App () {
  
  const [plot_field, setarrx] = useState([])
  const [plot_value, setarry] = useState([])

  // const [option_field, setField] = React.useState(scatter_plot_x_vars[0]);
  // const [option_value, setValue] = React.useState(scatter_plot_y_vars[1]);

  const [option, setOption] = useState({
    field: scatter_plot_x_vars[0],
    value: scatter_plot_y_vars[1]
  })

  const [aggregation, setAgg] = React.useState('sum');
  const {sum, average} = aggregation;

  const handleChange_agg = (event) => {
    setAgg(event.target.value);
  };

  const handleChange = (event, name) => {
    setOption({
      ...option,
      [name]: event.target.value,
    })
  }
    useEffect(() => {
      var group_by = option.field
      var value = option.value
      var agg = aggregation
  

      var data = new FormData();
      data.append('hierarchical', 'False');
  
      data.append('groupby_fields', option.field)
      data.append('groupby_fields', option.value)
      data.append('agg_fn', aggregation)
      data.append('cachename','voyage_export')
  
      axios.post('/voyage/groupby', data=data)
        .then(function (response) {
  
          setarrx(Object.keys(response.data[value]))
          setarry(Object.values(response.data[value]))
          
        })
        .catch(function (error) {
          console.log(error);
        });

    }, [option.field, option.value, aggregation]);


    return (
      <div>
        <div>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">X Field</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={option.field}
                onChange={(event) => {handleChange(event, "field")}}
                name="field"
              >
                {scatter_plot_x_vars.map((option) => (
                  <MenuItem value={option}>
                    {option}
                  </MenuItem>
                ))}

              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Y Field</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={option.value}
                name="value"
                onChange={(event) => {handleChange(event, "value")}}
              >
                {scatter_plot_y_vars.map((option) => (
                  <MenuItem value={option}>
                    {option}
                  </MenuItem>
                ))}

              </Select>
            </FormControl>
          </Box>
        </div>
        <div>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">Aggregation Function</FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={aggregation}
              onChange={handleChange_agg}
            >
              <FormControlLabel value="sum" control={<Radio />} label="Sum" />
              <FormControlLabel value="mean" control={<Radio />} label="Average" />
            </RadioGroup>
          </FormControl>
        </div>
      
        <div>
          <Plot
            data={[
              {
                x: plot_field,
                y: plot_value,
                type: 'scatter',
                mode: 'lines+markers',
                marker: {color: 'red'},
              },
              {type: 'bar'},
            ]}
            layout={ {width: 1000, height: 500, title: 'Scatter Plot'} }
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
