import { useState } from 'react';
import Header from '../Homepage/Header';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

function FloodPrediction() {
  const [formData, setFormData] = useState({
    station_name: 'Dhaka',
    date: null,
  });
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const year = formData.date.getFullYear();
    const month = formData.date.getMonth() + 1;
    // console.log({
    //   year: year,
    //   month: month,
    //   formData: formData,
    // });

    fetch('http://127.0.0.1:8000/predict_flood', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        year: year,
        month: month,
        station_name: formData.station_name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setResult(data);
      })
      .catch((error) => {
        console.error(error);
        alert(`Couldn't connect with the Backend Server.`);
      });
  };

  return (
    <div>
      <Header link='temperature-link' />
      <hr className='border-slate-400' />
      <div className='container pt-16 p-8 bg-blue-200 flex justify-center items-start gap-4'>
        <div>
          <form
            id='prediction-form'
            className='p-8 w-96 min-h-80 bg-blue-100 border border-gray-300 rounded-md'
            onSubmit={handleSubmit}
          >
            <h2 className='mb-4 text-xl text-blue-500 font-semibold text-center'>
              Flood Prediction Request
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
                Select City
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
                      station_name: e.target.value,
                    });
                  }}
                  required
                >
                  <option value='' disabled>
                    Select City
                  </option>
                  <option value='Dhaka'>Dhaka</option>
                  <option value='Sylhet'>Sylhet</option>
                  <option value='Barisal'>Barisal</option>
                  <option value='Comilla'>Comilla</option>
                  <option value='Rajshahi'>Rajshahi</option>
                  <option value='Chittagong'>Khulna</option>
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
              Flood Prediction Result
            </h2>
            <div className=''>
              <div className='p-2 text-center border border-blue-300'>
                <p className='mb-1 text-md text-black'>
                  Flood: {result.flood}{' '}
                </p>
              </div>
              <div className='mt-6'>
                <p>Value 1: There is possibility of flood</p>
                <p>Value 0: There is no possibility of flood</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FloodPrediction;
