import { useState } from 'react';
import Header from '../Homepage/Header';

function Predict() {
  const [formData, setFormData] = useState({
    year: '',
    month: '',
    day: '',
    hour: '',
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    setResult(data);
  };

  return (
    <div>
      <Header searchBarShow={false} />
      <hr className='border-slate-400' />
      <div className='container p-8 bg-blue-200 flex justify-center items-start gap-4'>
        <div>
          <form
            className='p-8 w-96 min-h-80 bg-blue-100 border border-gray-300 rounded-md'
            onSubmit={handleSubmit}
          >
            <h2 className='mb-4 text-blue-500 font-semibold text-center'>
              Prediction Request
            </h2>
            {/* Year */}
            <div className='mt-2 sm:col-span-3'>
              <label
                htmlFor='year'
                className='block text-sm/6 font-medium text-gray-900'
              >
                Year
              </label>
              <div className='mt-2'>
                <input
                  type='number'
                  name='year'
                  placeholder='Year'
                  id='year'
                  className='p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm/6'
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* Month */}
            <div className='mt-2 sm:col-span-3'>
              <label
                htmlFor='month'
                className='block text-sm/6 font-medium text-gray-900'
              >
                Month
              </label>
              <div className='mt-2'>
                <input
                  type='number'
                  name='month'
                  placeholder='Month'
                  id='month'
                  className='p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm/6'
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* Day */}
            <div className='mt-2 sm:col-span-3'>
              <label
                htmlFor='Day'
                className='block text-sm/6 font-medium text-gray-900'
              >
                Day
              </label>
              <div className='mt-2'>
                <input
                  type='number'
                  name='day'
                  placeholder='Day'
                  id='day'
                  className='p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm/6'
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* Hour */}
            <div className='mt-2 sm:col-span-3'>
              <label
                htmlFor='hour'
                className='block text-sm/6 font-medium text-gray-900'
              >
                Hour
              </label>
              <div className='mt-2'>
                <input
                  type='hour'
                  name='hour'
                  placeholder='Hour'
                  id='day'
                  className='p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm/6'
                  onChange={handleChange}
                />
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
            <h2 className='mb-4 text-blue-500 font-semibold text-center'>
              Prediction Result
            </h2>
            <p>Temperature: {result?.temperature}</p>
            <p>Precipitation: {result?.precipitation}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Predict;
