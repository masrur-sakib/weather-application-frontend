import { Link } from 'react-router-dom';

const Header = ({ link }) => {
  return (
    <div className='p-4 flex justify-between items-center'>
      {/* Logo */}
      <div className='font-bold text-xl text-black hover-pointer ml-10'>
        <Link to='/'>Env AI</Link>
      </div>
      {link === 'flood-link' ? (
        <div className='flex justify-end items-center gap-4'>
          {location.pathname === '/prediction-details' ? null : (
            <Link
              className='flex justify-center items-center text-black rounded-full w-[150px] py-1 bg-white text-sm cursor-pointer'
              to='/flood-prediction'
            >
              Flood Prediction
            </Link>
          )}
        </div>
      ) : (
        <div className='flex justify-end items-center gap-4'>
          {location.pathname === '/prediction-details' ? null : (
            <Link
              className='flex justify-center items-center text-black rounded-full w-[180px] py-1 bg-white text-sm cursor-pointer'
              to='/'
            >
              Temperature Prediction
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
