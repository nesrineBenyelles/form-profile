import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import './ProfileAvocat.css';
const LawyerProfile = () => {
  const [avocat, setAvocat] = useState(null);

  useEffect(() => {
    const code_barrau = window.location.pathname.split('/')[2];
    // Effectuez une requête GET pour récupérer les données du profil de l'avocat
    axios.get(`http://localhost:8081/ProfileAvocat/${code_barrau}`) // Remplacez ":code_barrau" par la valeur réelle du code_barrau de l'avocat
      .then(response => {
        const data = response.data;
        console.log(data);

        setAvocat(data);
      })
      .catch(error => {
        console.log("err axios.get");
        console.error(error);
      });
  }, []);

  if (!avocat) {
    // Affichez un message de chargement ou une animation pendant le chargement des données
    return <div>Loading...</div>;
  }

  return (
    <div className='profile-container'>
      <div className='name-section'>
       <img src={'http://localhost:8081/'+avocat.chemin_image.replace(/\\/g, '/')} className='pdp' alt='Profile' />

        <h1>{avocat.nom_av} {avocat.prenom_av}</h1>
      </div>
      <div className='information'>
      <section className='info-container'>
        <h1 id="Info">Informations :</h1>
        <p className='additional-info'><b>Ville:</b> {avocat.wilaya}</p>
        <p className='additional-info'><b>Contact:</b> {avocat.num_tel_av}</p>
        <p className='additional-info'><b>Email:</b> {avocat.email}</p>
        <p className='additional-info'><b>Spécialité:</b> {avocat.spécialité}</p>
        <p className='additional-info'><b>Son site web:</b> {avocat.siteweb}</p>
        <p className='additional-info'><b>Type:</b> {avocat.type}</p>
        </section>
        <p className='profile-description'><h1>Description:</h1> {avocat.description}</p>
      </div>
    </div>
  );
};

export default LawyerProfile;
