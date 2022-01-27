import React from 'react';
import logopen from './images/PENlogo.png';
import './penlogo.css'

console.log(logopen);

function LogoPEN() {
  return <img 
  height="300"
  width="300"
  src={logopen} 
  alt="LogoPEN" />;
}

export default LogoPEN;