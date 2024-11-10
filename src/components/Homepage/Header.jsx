import { useContext, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import GContext from '../Contexts/GContext';
const APIKEY = '60fddad1a66b4259a400bd0692258fcf';
import { useLocation } from 'react-router-dom';

const Header = ({ searchBarShow }) => {
  const { setCountry, setLocation, setLongitude, setLatitude, setAqiClk } =
    useContext(GContext);
  const [srcLoc, setSrcLoc] = useState('');
  const location = useLocation();
  const handleSubmit = (event) => {
    event.preventDefault();
    setLocation(srcLoc);

    const url = `https://api.opencagedata.com/geocode/v1/json?q=${srcLoc}&key=${APIKEY}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status.code === 200) {
          setLatitude(data.results[0].geometry.lat);
          setLongitude(data.results[0].geometry.lng);
          setCountry(data.results[0].components.country_code);
        } else {
          alert('Geolocation request failed.');
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className='p-4 flex justify-between items-center'>
      {/* Logo */}
      <div className='font-bold text-xl text-black hover-pointer ml-10'>
        <Link to='/'>Env AI</Link>
      </div>
      {/* Search */}
      {searchBarShow && (
        <form className='h-[40px] w-[30%]' onSubmit={handleSubmit}>
          <div className='h-full w-full px-3 flex justify-start items-center bg-neutral-50 rounded-full text-black text-sm'>
            <BiSearch className='mr-2' />
            <input
              className='h-full w-full rounded-full outline-none bg-neutral-50 text-black'
              type='text'
              id='searchCity'
              placeholder='Search City...'
              value={srcLoc}
              onChange={(e) => setSrcLoc(e.target.value)}
            />
          </div>
        </form>
      )}
      <div className='flex justify-end items-center gap-4'>
        {location.pathname === '/prediction-details' ? null : (
          <Link
            className='flex justify-center items-center text-black rounded-full w-[150px] py-1 bg-white text-sm cursor-pointer'
            onClick={() => setAqiClk(false)}
            to='prediction'
          >
            Prediction Detail
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
