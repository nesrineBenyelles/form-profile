import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';



const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,'images');
    },
    filename:(req,file,cb)=>{
      console.log(file);
      cb(null,Date.now()+'-'+path.extname(file.originalname));
      console.log(Date.now());
    }
  });
  const upload=multer({storage:storage}); 

// Obtiens le chemin du fichier actuel
const __filename = fileURLToPath(import.meta.url);
// Obtiens le répertoire parent (dossier courant)
const __dirname = dirname(__filename);
  app.use(express.static(__dirname));
  console.log(__dirname);

app.post('/Formulaire/:code_barrau',upload.single('image'),(req,res)=>{
    const imagePath = req.file.path;
    console.log(imagePath);
    const code_barrau = req.params.code_barrau;
    console.log(code_barrau);
    const sql = `UPDATE avocat SET nom_av = ?, prenom_av = ?,  num_tel_av = ?, type = ?,spécialité=?, code_postale = ?, wilaya = ?, siteweb = ?, description = ? , chemin_image=? WHERE code_barrau = ? `;    
    const values=[
    req.body.name,
    req.body.prenom,
    req.body.telephone,
    req.body.type,
    req.body.specialite,
    req.body.codepostal,
    req.body.wilaya,
    req.body.siteweb,
    req.body.description,
    imagePath,
    code_barrau
  ]; // tab de val qui doivent etre insérer dans avocat

    db.query(sql,values,(err,result)=>{ //query envoi une requete sql a la base de donné
      if(err){
        console.log("err post");
        console.error(err);
      return res.json({Message:" Err in node"});}
      
      console.log("not err post");
      res.redirect(`/ProfileAvocat/${code_barrau}`);

    });
  });


  // Fonction GET pour afficher les informations du profil avocat
app.get('/ProfileAvocat/:code_barrau', (req, res) => {
  const code_barrau = req.params.code_barrau;
  console.log(code_barrau);

  // Requête SQL pour récupérer les informations de l'avocat
  const sql = 'SELECT * FROM avocat WHERE code_barrau = ?';
  db.query(sql, [code_barrau], (err, result) => {
    if (err) {
      console.log("err app.get");
      console.log(err);
      return res.status(500).json({ error: 'Erreur lors de la récupération des informations de l\'avocat' });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: 'Avocat non trouvé' });
    }

    const avocat = result[0];
    console.log("not err app.get");

    res.json(avocat);


  });
});
