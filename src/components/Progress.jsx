import React from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';
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

const Progress = ({ setShowProgress, showProgress }) => {
  const User = useSelector((state) => state.user.User);

  const dates = User.progress.map(data => data.date);
  const points = User.progress.map(data => data.point);
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
          tooltipFormat: 'yyyy/MM/dd',
          displayFormats: {
            day: 'yyyy/MM/dd'
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

  if (!showProgress) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 z-50 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-[90%] max-w-3xl relative">
        <button
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-red-600 text-white font-bold"
          onClick={() => setShowProgress(false)}
        >
          X
        </button>
        <h2 className="text-2xl font-semibold text-center mb-4">Progress</h2>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Progress;
