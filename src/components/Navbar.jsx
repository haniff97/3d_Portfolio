import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { navLinks } from '../constants';
import { logo, menu, close } from '../assets';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Set active based on current location
    const currentPath = location.pathname;
    const currentNav = navLinks.find(nav => nav.path === currentPath);
    if (currentNav) {
      setActive(currentNav.title);
    }
  }, [location]);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${styles.paddingX} w-full flex items-center py-2 fixed top-0 z-20 transition-all duration-300 ${
        scrolled ? 'bg-dark-grey/95 backdrop-blur-sm shadow-lg' : 'bg-dark-grey'
      }`}
    >
      <div className="relative w-full flex items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className='flex items-center gap-2 group'
          onClick={() => {
            setActive('');
            window.scrollTo(0, 0);
          }}
        >
          <motion.img 
            src={logo} 
            alt="logo" 
            className='w-9 h-9 object-contain group-hover:scale-110 transition-transform duration-300' 
          />
          <motion.p 
            className='text-white text-[21px] cursor-pointer group-hover:text-[#5e84ff] transition-colors duration-300'
            whileHover={{ scale: 1.05 }}
          >
            Haniff 
          </motion.p>
        </Link>
        
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden sm:flex">
          <ul className="list-none flex flex-row gap-10">
            {navLinks.map((nav, index) => (
              <motion.li
                key={nav.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative ${
                  active === nav.title ? 'text-white' : 'text-secondary'
                } hover:text-white text-[18px] font-medium cursor-pointer transition-colors duration-300`}
                onClick={() => setActive(nav.title)}
              >
                <Link to={nav.path}>{nav.title}</Link>
                {active === nav.title && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#5e84ff]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.li>
            ))}
          </ul>
        </div>
        
        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <motion.img
            src={toggle ? close : menu}
            alt="menu"
            className='w-[28px] h-[28px] object-contain cursor-pointer'
            onClick={() => setToggle(!toggle)}
            whileTap={{ scale: 0.95 }}
          />
          <motion.div 
            className={`${!toggle ? 'hidden' : 'flex'} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl navbar-mobile-menu`}
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={toggle ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="list-none flex flex-col gap-4">
              {navLinks.map((nav, index) => (
                <motion.li
                  key={nav.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={toggle ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`${
                    active === nav.title ? 'text-white' : 'text-secondary'
                  } hover:text-white text-[18px] font-medium cursor-pointer transition-colors duration-300`}
                  onClick={() => {
                    setActive(nav.title);
                    setToggle(false);
                  }}
                >
                  <Link to={nav.path}>{nav.title}</Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
