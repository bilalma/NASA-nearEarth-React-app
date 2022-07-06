import './App.css';
import { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useState } from 'react'

function App() {

  const [ earth, setEarth ] = useState([])
  const [ open, setOpen ] = useState(false);
  const [ tableData, setTable ] = useState([]);
  const [ chartData, setChartData ] = useState([]);
  const [ chartData2, setChartData2 ] = useState({});

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
      //console.log({ chartData });
    }





  }, [])


  return (
    <div className="App">
      <h1>NasaAPI React-app</h1>
      <p>using Asteroids NeoWs (Near Earth Object Web Service)</p>
      <p> Github link to this <a href="https://github.com/bilalma/" target="_blank">project</a></p>
      <div>
        <input className='input' placeholder='enter your key' type='text'></input>
        <button className='button' onClick={() => setOpen(true)}>SUBMIT</button>
        <button className='button' onClick={() => setOpen(false)}>EXIT</button>
      </div>
      {open === true ?
        <div>
          <div className='container'>
            <p style={{ color: 'white' }}><strong>Table showing Asteroids data with sort mechanism </strong></p>
            <DataTable
              columns={columns}
              data={tableData}
            />
          </div>
        </div> :
        <h3 style={{ margin: '100px' }}>Enter your key to see Chart and Table data</h3>}
    </div>
  );
}

export default App;
