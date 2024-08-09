import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';
import iris from '../assets/iris.png';
import heitech from '../assets/heitech.png';

const Info = () => {
  return (
    <div className='min-h-screen flex flex-col justify-between'>
      <motion.p 
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-24 text-secondary text-[13px] max-w-3xl mx-auto lg:ml-10'
      >
        Hi there! I am currently working as a full-stack developer specialising in Java and C#. <br/>
        This project serves as a showcase for my learning journey in React.js and other technologies.<br/> 
        I aim to turn it into a long-term project by continuously updating it with new features and design tweaks.
      </motion.p>
      
      <motion.div 
        variants={textVariant()}
        className='flex justify-between w-full px-10 pt-40 absolute'
      >
        <div className='flex flex-col items-start'>
          <p className='text-[15px]'>Worked at</p>
          <div className='flex items-center'>
            <img src={iris} alt="IRIS logo" style={{ width: '100px', height: '100px', objectFit: 'contain', marginRight: '20px' }} />
            <img src={heitech} alt="Heitech logo" style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
          </div>
        </div>
        <div className='flex flex-col items-end'>
          <p className='mr-[130px] mt-[10px]'>Design</p>
          <div className='text-secondary text-[13px] text-right' style={{ marginTop: '-20px' }}>
            <p>Figma</p>
            <p>Photoshop</p>
          </div>
          <br/>
          <p className='mr-[120px] mt-[10px]'>Programming</p>
          <div className='text-secondary text-[13px] text-right' style={{ marginTop: '-20px' }}>
            <p>HTML / CSS</p>
            <p>Java</p>
            <p>React.js</p>
            <p>three.js</p>
            <p>node.js</p>
            <p>sql</p>
            <p>C#</p>
            <p>C++</p>
            <p>swift</p>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        variants={textVariant()}
        className='w-full flex justify-center items-center mt-40 pt-60 absolute xs:bottom-0 bottom-0'
      >
        <h2 style={{ fontSize: '13.5rem', fontFamily: 'Uncut Sans, sans-serif', color: '#fff' }}>Haniff Hamdan</h2>
      </motion.div>
    </div>
  );
}

export default Info;
