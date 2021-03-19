import React, { useState } from 'react';

import Logotipo from "../../assets/ClassiWeb.png";

import './styles.css';

export default function Presentation() {
  return (
    <div className="presentation">
      <img src={Logotipo} alt="ClassiWeb" style={{height: '200px', minHeight: '200px'}}/>
      <div className="message">
        <p>Seja bem-vindo ao <em><b>ClassiWeb</b></em></p>
        <p>O <b>maior</b> portal de classificados da internet!</p>
      </div>
    </div>
  );
}