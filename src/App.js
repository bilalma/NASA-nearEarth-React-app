import './App.css';
import { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useState } from 'react'

function App() {

  const [ earth, setEarth ] = useState([])
  const [ open, setOpen ] = useState(false);
  const [ tableData, setTable ] = useState([]);
  const [ chartData, setChartData ] = useState([]);

  const columns = [
    {
      name: 'Id',
      selector: row => row.id,
      sortable: true
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true
    },
    {
      name: 'Magnitude',
      selector: row => row.absolute_magnitude_h,
      sortable: true,
    },
  ];

  useEffect(() => {
    fetchEarth()
    async function fetchEarth() {
      const apikey = '6IfbtxR1Jp82eK5x4bHJMGJq71XUB5Go0oMIurEP';
      const start_date = '2022-07-06';
      const end_date = '2022-07-12';
      const res = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${start_date}&end_date=${end_date}&api_key=${apikey}`)
      const data = await res.json()

      let objects = data.near_earth_objects;
      let objectArr = [];
      for (const item in objects) {
        objectArr = objectArr.concat(objects[ item ]);
      }
      setTable(objectArr);
      //console.log({ objectArr });

      let chartData = [];
      objectArr.forEach(item => {
        item.close_approach_data.forEach((item2, key) => {

          chartData.push({
            uv: 400,
            pv: item2.miss_distance.astronomical, amt: 2400,
            name: 'astronomical'
          });
          chartData.push({
            uv: item2.miss_distance.kilometers,
            pv: 2400, amt: 2400,
            name: 'kilometers'
          });
          chartData.push({
            uv: item2.miss_distance.lunar,
            pv: 2400, amt: 2400,
            name: 'lunar'
          });
          chartData.push({
            uv: item2.miss_distance.miles,
            pv: 2400, amt: 2400,
            name: 'miles'
          });

        })
        //console.log({ chartData });
        setChartData(chartData);
      });

    }
  }, [])


  return (
    <div className="App">
      <h1>NasaAPI React-app</h1>
      <p>using Asteroids NeoWs (Near Earth Object Web Service)</p>
      <p> Github link to this <a href="https://github.com/bilalma/NASA-nearEarth-React-app" target="_blank">project</a></p>
      <div>
        <input className='input' placeholder='enter your key' type='text'></input>
        <button className='button' onClick={() => setOpen(true)}>SUBMIT</button>
        <button className='button' onClick={() => setOpen(false)}>EXIT</button>
      </div>
      {open === true ?
        <div>
          {/*  Table DATA    */}
          <div className='container'>
            <p style={{ color: 'white' }}><strong>Table showing Asteroids data with sort mechanism </strong></p>
            <DataTable
              columns={columns}
              data={tableData}
            />
          </div>
          {/*  Chart DATA    */}
          <div className='container'>
            {/* <BarChart
              width={500}
              height={300}
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 80,
                bottom: 5,
              }}
              barSize={20}
            >
              <XAxis
                dataKey="name"
                scale="point"
                padding={{ left: 10, right: 10 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="users" fill="#8884d8" background={{ fill: "#eee" }} />
            </BarChart> */}
          </div>
        </div> :
        <h3 style={{ margin: '100px' }}>Enter your key to see Chart and Table data</h3>}
    </div>
  );
}

export default App;
