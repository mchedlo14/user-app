import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Tooltip } from 'recharts';
import './Chart.css'


const Chart = () => {
    
    const [analyticData,setAnalyticData] = useState([{}])
    const getAnalyticData = async () => {
        const res = await fetch('http://localhost:3000/analytics/users')
        const analyticdata = await res.json()
        setAnalyticData([
            { name: 'Chicago', value: analyticdata.data.Chicago},
            { name: 'New Yourk', value: analyticdata.data['New York']},
            { name: 'San Diego', value: analyticdata.data['San Diego']},
            { name: 'Los Angeles', value: analyticdata.data['Los Angeles']},
        ]
        )
    }

    useEffect(() => {
        getAnalyticData()
    },[])


  return (
    <div className='chart-wrapper'>
        <h3>Pie Chart</h3>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={analyticData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
    </div>
  )
}

export default Chart