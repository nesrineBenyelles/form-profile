import React, { useState } from 'react';
import NavCompte from './NavCompte';
import axios from 'axios';

const Formulaire = () => {
  
  const [name, setName] = useState('');
  const [prenom, setPrenom] = useState('');
  //const [adressecabinet, setAdresseC] = useState('');
  const [telephone, setTelephone] = useState('');
  const [siteweb, setSiteWeb] = useState('');
  const [description, setDescription] = useState('');
  const [typee,setTypee]=useState('');
  const [wilaya,setWilaya]=useState('Adrar');
  const [pdp,setPdp]=useState('');
  const [specialite,setSpecialite]=useState('');


  const handlePdpChange=(event)=>{
    setPdp(event.target.files[0]);
    console.log(pdp);
  }

  const [nationalChecked,setNationalChecked]=useState(false);
  const [internationalChecked,setInternationalChecked]=useState(false);
  const handelType=(event)=>{
    const value=event.target.value;
    if(value==='national'){
      setTypee(value);
      setNationalChecked(true);
      setInternationalChecked(false);
    }
    else if(value==='international'){
      setTypee(value);
      setInternationalChecked(true);
      setNationalChecked(false);
    }
console.log(typee);
  }
  const options = [
    { value: '1', name: 'Adrar' },
    { value: '2', name: 'Chlef' },
    { value: '3', name: 'Laghouat' },
    { value: '4', name: 'Oum El Bouaghi' },
    { value: '5', name: 'Batna' },
    { value: '6', name: 'Béjaïa' },
    { value: '7', name: 'Biskra' },
    { value: '8', name: 'Béchar' },
    { value: '9', name: 'Blida' },
    { value: '10', name: 'Bouira' },
    { value: '11', name: 'Tamanrasset' },
    { value: '12', name: 'Tébessa' },
    { value: '13', name: 'Tlemcen' },
    { value: '14', name: 'Tiaret' },
    { value: '15', name: 'Tizi Ouzou' },
    { value: '16', name: 'Alger' },
    { value: '17', name: 'Djelfa' },
    { value: '18', name: 'Jijel' },
    { value: '19', name: 'Sétif' },
    { value: '20', name: 'Saïda' },
    { value: '21', name: 'Skikda' },
    { value: '22', name: 'Sidi Bel Abbès' },
    { value: '23', name: 'Annaba' },
    { value: '24', name: 'Guelma' },
    { value: '25', name: 'Constantine' },
    { value: '26', name: 'Médéa' },
    { value: '27', name: 'Mostaganem' },
    { value: '28', name: 'M\'Sila' },
    { value: '29', name: 'Mascara' },
    { value: '30', name: 'Ouargla' },
    { value: '31', name: 'Oran' },
    { value: '32', name: 'El Bayadh' },
    { value: '33', name: 'Illizi' },
    { value: '34', name: 'Bordj Bou Arreridj' },
    { value: '35', name: 'Boumerdès' },
    { value: '36', name: 'El Tarf' },
    { value: '37', name: 'Tindouf' },
    { value: '38', name: 'Tissemsilt' },
    { value: '39', name: 'El Oued' },
    { value: '40', name: 'Khenchela' },
    { value: '41', name: 'Souk Ahras' },
    { value: '42', name: 'Tipaza' },
    { value: '43', name: 'Mila' },
    { value: '44', name: 'Aïn Defla' },
    { value: '45', name: 'Naâma' },
    { value: '46', name: 'Aïn Témouchent' },
    { value: '47', name: 'Ghardaïa' },
    { value: '48', name: 'Relizane' },
    { value: '49', name: 'El M\'ghair' },
    { value: '50', name: 'El Menia' },
    { value: '51', name: 'Ouled Djellal' },
    { value: '52', name: 'Bordj Baji Mokhtar' },
    { value: '53', name: 'Béni Abbès' },
    { value: '54', name: 'Timimoun' },
    { value: '55', name: 'Touggourt' },
    { value: '56', name: 'Djanet' },
    { value: '57', name: 'In Salah' },
    { value: '58', name: 'In Guezzam' }
  ];
  const handleWilaya=(event)=>{
    const selectedValue=event.target.value;
    setWilaya(selectedValue);
    console.log(wilaya);
  }
  const handleSpecialiteChange = (e) => {
    setSpecialite(e.target.value);
  };

  const handleSubmit = (event) => {
  event.preventDefault();
  const code_barrau="44444444";
  const formData = {
    name: name,
    prenom: prenom,
    telephone: telephone,
    type:typee,
    specialite:specialite,
    wilaya: wilaya,
    siteweb:siteweb,
    description:description,
    image:pdp
  };
console.log(name);
axios.post(`http://localhost:8081/Formulaire/${code_barrau}`, formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})
  .then(response => {
    console.log(response.data);
    window.location.href = `/ProfileAvocat/${code_barrau}`;

  })
  .catch(error => console.error(error));}


  return (
    <div className='formAvocat'>
        <NavCompte/>
    <form onSubmit={handleSubmit} encType='multipart/form-data'>
      <label>
        Nom:</label>
        <input type="text" value={name} onChange={e => {setName(e.target.value);}} />
      
      <label>
        Prénom:</label>
        <input type="text" value={prenom} onChange={e => setPrenom(e.target.value)} />
      
      {/*<label>
      Adresse de votre cabinet:</label>
        <input type="text" value={adressecabinet} onChange={e => setAdresseC(e.target.value)} />
  */}
      
      <label>
       Ville:</label>
        <select onChange={handleWilaya}>
      {options.map((option) => (
        <option key={option.value} value={option.name} >{option.value} : {option.name}</option>
      ))}
      </select>
      <label>
      Téléphone:</label>
        <input type="text" value={telephone} onChange={e => setTelephone(e.target.value)} />
      
     <label>
     <div>
        <label htmlFor="specialty">Spécialité :</label>
        <select id="specialty" value={specialite} onChange={handleSpecialiteChange}>
          <option value="">Sélectionner une spécialité</option>
          <option value="droit de famille">Droit de famille</option>
          <option value="droit pénal">Droit pénal</option>
          <option value="droit des affaires">Droit des affaires</option>
          <option value="droit de la propriété intellectuelle">Droit de la propriété intellectuelle</option>
          <option value="droit immobilier">Droit immobilier</option>
          {/* Ajoutez d'autres options selon les spécialités disponibles */}
        </select>
      </div>

      Site web:</label>
        <input type="text" value={siteweb} onChange={e => setSiteWeb(e.target.value)} />

          <label >Type:</label>
            <input className='checkbox-type' type='checkbox' value='national' name='type' checked={nationalChecked} onChange={handelType}/><p style={{display: 'inline-block', marginLeft: '5px'}}>National</p>
          <input className='checkbox-type' type='checkbox' value='international' name='type' checked={internationalChecked} onChange={handelType}/><p style={{display: 'inline-block', marginLeft: '5px'}}>International</p> 

       <label>
      Description:</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} />

        <div className="image-upload">
        <label >Importer une photo</label>
          <input type="file" name='image' onChange={handlePdpChange} />
    </div>
      <button type="submit">Envoyer</button>

     </form></div>


  );
};
export default Formulaire;