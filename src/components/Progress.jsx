import React, { useEffect, useRef,useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns'; 
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const Progress = ({setShowProgress,showProgress}) => {
 
  const dates = [
    "2024-12-01", "2024-12-02", "2024-12-03", "2024-12-04",
    "2024-12-05", "2024-12-06", "2024-12-07", "2024-12-08"
  ];
  const points = [5, 6, 7, 9, 6, 8, 10, 12];
  const dateObjects = dates.map(date => new Date(date));
  const data = {
    labels: dateObjects,
    datasets: [
      {
        label: 'Points',
        data: points,
        borderColor: 'blue',
        fill: false,
        tension: 0.1,
        borderWidth: 2
      }
    ]
  };
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        mode: 'nearest',
        intersect: false,
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'll',
          displayFormats: {
            day: 'yyyy-MM-dd' 
          }
        },
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Points'
        }
      }
    }
  };

  const chartRef = useRef(null);
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.chartInstance.destroy();
      }
    };
  }, []);

  return (
    <>
      { 1 ? 
    <div className="container mx-auto p-4 absolute mt-20 bg-white">
        <button className='float-right h-10 w-10 rounded-full bg-red-600' onClick={()=>setShowProgress(false)}>X</button>
      <h2 className="text-2xl font-semibold text-center mb-4">Progress</h2>
      <div className="bg-white shadow-lg rounded-lg p-4">
        <Line ref={chartRef} data={data} options={options} />
      </div>
    
    </div>: null

      }
    </>
    
  );
};

export default Progress
