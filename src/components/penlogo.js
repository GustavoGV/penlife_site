import React from 'react';
import logopen from './images/PENlogo.png';
import './penlogo.css'

console.log(logopen);

function LogoPEN() {
  return <img 
  height="auto"
  width="30%"
  src={logopen} 
  alt="LogoPEN" />;
}

export default LogoPEN;