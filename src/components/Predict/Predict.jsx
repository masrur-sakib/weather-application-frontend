import { useState } from 'react';
import Header from '../Homepage/Header';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

function Predict() {
  const [formData, setFormData] = useState({
    date: null,
    hour: '',
  });
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const year = formData.date.getFullYear();
    const month = formData.date.getMonth() + 1;
    const day = formData.date.getDate();
    // console.log({
    //   year: year,
    //   month: month,
    //   day: day,
    //   hour: formData.hour,
    // });

    fetch('http://127.0.0.1:8000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        year: year,
        month: month,
        day: day,
        hour: formData.hour,
      }),
    })
      .then((response) => response.json())
      .then((data) => setResult(data))
      .catch((error) => {
        console.error(error);
        alert(`Couldn't connect with the Backend Server.`);
      });
  };

  return (
    <div>
      <Header searchBarShow={false} />
      <hr className='border-slate-400' />
      <div className='container pt-16 p-8 bg-blue-200 flex justify-center items-start gap-4'>
        <div>
          <form
            id='prediction-form'
            className='p-8 w-96 min-h-80 bg-blue-100 border border-gray-300 rounded-md'
            onSubmit={handleSubmit}
          >
            <h2 className='mb-4 text-xl text-blue-500 font-semibold text-center'>
              Prediction Request
            </h2>
            {/* Date */}
            <div className='mt-2 sm:col-span-3'>
              <label
                htmlFor='hour'
                className='block text-sm/6 font-medium text-gray-900'
              >
                Select Date
              </label>
              <div className='mt-2'>
                <DatePicker
                  showIcon
                  className='p-4 block w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm/6'
                  dateFormat='dd/MM/yyyy'
                  selected={formData.date}
                  onChange={(date) => {
                    setFormData({
                      ...formData,
                      date: date,
                    });
                  }}
                  icon={
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='1em'
                      height='1em'
                      viewBox='0 0 48 48'
                    >
                      <mask id='ipSApplication0'>
                        <g
                          fill='none'
                          stroke='#fff'
                          strokeLinejoin='round'
                          strokeWidth='4'
                        >
                          <path
                            strokeLinecap='round'
                            d='M40.04 22v20h-32V22'
                          ></path>
                          <path
                            fill='#fff'
                            d='M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z'
                          ></path>
                        </g>
                      </mask>
                      <path
                        fill='currentColor'
                        d='M0 0h48v48H0z'
                        mask='url(#ipSApplication0)'
                      ></path>
                    </svg>
                  }
                  placeholderText='Select a date'
                  required
                />
              </div>
            </div>

            {/* Hour */}
            <div className='mt-2 sm:col-span-3'>
              <label
                htmlFor='hour'
                className='block text-sm/6 font-medium text-gray-900'
              >
                Select Time
              </label>
              <div className='mt-2'>
                <select
                  id='countries'
                  className='p-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm/6'
                  name='hour'
                  value={formData.hour}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      hour: parseInt(e.target.value),
                    });
                  }}
                  required
                >
                  <option value='' disabled>
                    Select a time
                  </option>
                  <option value={0}>12 AM</option>
                  <option value={1}>1 AM</option>
                  <option value={2}>2 AM</option>
                  <option value={3}>3 AM</option>
                  <option value={4}>4 AM</option>
                  <option value={5}>5 AM</option>
                  <option value={6}>6 AM</option>
                  <option value={7}>7 AM</option>
                  <option value={8}>8 AM</option>
                  <option value={9}>9 AM</option>
                  <option value={10}>10 AM</option>
                  <option value={11}>11 AM</option>
                  <option value={12}>12 PM</option>
                  <option value={13}>1 PM</option>
                  <option value={14}>2 PM</option>
                  <option value={15}>3 PM</option>
                  <option value={16}>4 PM</option>
                  <option value={17}>5 PM</option>
                  <option value={18}>6 PM</option>
                  <option value={19}>7 PM</option>
                  <option value={20}>8 PM</option>
                  <option value={21}>9 PM</option>
                  <option value={22}>10 PM</option>
                  <option value={23}>11 PM</option>
                </select>
              </div>
            </div>
            <div className='mt-10'>
              <button
                type='submit'
                className='block w-full rounded-md bg-blue-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {result && (
          <div className='p-8 mb-4 w-96 min-h-80 bg-blue-100 border border-gray-300 rounded-md'>
            <h2 className='mb-4 text-xl text-blue-500 font-semibold text-center'>
              Prediction Result
            </h2>
            <div className='flex justify-center item-center gap-4'>
              <div className='p-2 text-center border border-blue-300'>
                <p className='mb-1 text-md text-black'>Temperature</p>
                <p className='text-xl'>{result?.temperature.toFixed(2)} °C</p>
              </div>
              <div className='p-2 text-center border border-blue-300'>
                <p className='mb-1 text-md text-black'>Precipitation</p>
                <p className='text-xl'>
                  {Math.abs(result?.precipitation).toFixed(2)}
                  {/* {(Math.abs(result?.precipitation) * 100).toFixed(2)}% */}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Predict;
