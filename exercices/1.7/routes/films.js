var express = require('express');
var router = express.Router();

const FILMS = [
  {
    id: 1,
    title: 'Princesse Mononoké',
    duration: 134,
    budget: 23747278,
    link: 'https://www.imdb.com/title/tt0119698/?ref_=vp_vi_tt_p'
  },
  {
    id: 2,
    title: 'Mon voisin Totoro',
    duration: 86,
    budget: 19199927 ,
    link: 'https://www.imdb.com/title/tt0096283/?ref_=fn_al_tt_1'
  },
  {
    id: 3,
    title: 'Le Château ambulant',
    duration: 119,
    budget: 26462588 ,
    link: 'https://www.imdb.com/title/tt0347149/?ref_=nv_sr_srsg_3_tt_8_nm_0_q_le%2520chateau'
  },

];

// Read all the films, TAKES CARE OF THE DURATION 

  router.get('/', (req, res) => {
    const minimumFilmDuration = req?.query?.['minimum-duration']
      ? Number(req.query['minimum-duration']): undefined;
    
    console.log(minimumFilmDuration);
    console.log(typeof minimumFilmDuration);

    //SI IL N'Y PAS DE DURATION ET LE PARAMETRE FOUNIT NE CORRESPOND PAS A CE QU'ON VEUT ON ENVOIE UN ERREUR DE PARAMETRE 
    const wrongType = typeof minimumFilmDuration !== 'number';
    const invalidDurationProvided = minimumFilmDuration <= 0;

    if(wrongType || invalidDurationProvided) return res.sendStatus(400) // ERROR 400 BAD REQUEST => ECHEC DE LA VALIDATION DES PARAMETRES RECUS

    if (minimumFilmDuration === undefined) return res.json(FILMS);
  
    if (typeof minimumFilmDuration !== 'number' || minimumFilmDuration <= 0) return res.json('Wrong minimum duration'); 
  
    const filmsReachingMinimumDuration = FILMS.filter( (film) => film.duration >= minimumFilmDuration
    );
    return res.json(filmsReachingMinimumDuration);
  });


// Create a film to be added to the menu.
router.post('/', (req, res) => {

  //VERIFIE LES CONTENUS DES ELEMENTS DU FILM 

  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;
  console.log('POST /films');

  // SI Y'A RIEN DANS LE CONTENU ENVOIE ERROR LIGHT (SOUCI AU NIVEAU DES PARAMETRES FOURNIS)

  if (!title || !duration || !budget || !link) return res.sendStatus(400); // error code '400 Bad request'

  //SI LE TITRE DU FILM QU'ON SOUHAITE INSERER EXISTE DEJA ENVOIE ERROR CONFILCT 409 VU QUE CA EXISTE DEJA

  var doesExist = false; 
  for (let i = 0; i < FILMS.length; i++) {
      if (FILMS[i].title.toLowerCase() === title.toLowerCase()) {
          doesExist = true; // FILM EXISTE
          break; 
      }
  }
  if (doesExist) return res.sendStatus(409); // DEUX FILMS DU MEME TITRE ONT ETE RENCONTRES

  // AUGEMENTE LA VALEUR DE CHAQUE ID A CHAQUE AJOUT 

  const lastItemIndex = FILMS?.length !== 0 ? FILMS.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? FILMS[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  //AJOUT DU FILM AVEC SES ELEMENTS

  const newFilm = {
    id: nextId,
    title: title,
    duration: duration,
    budget: budget,
    link: link
  };

  // PUSH DANS L'ARRAY 
  
  FILMS.push(newFilm);

  res.json(newFilm);
});


// Read the film identified by an id in the FILMS
router.get('/:id', (req, res) => {
  console.log(`GET /films/${req.params.id}`);

  const indexOfFilmFound = FILMS.findIndex((FILM) => FILM.id == req.params.id);

  if (indexOfFilmFound < 0) return res.sendStatus(404);


  res.json(FILMS[indexOfFilmFound]);
});


// DELETE A FILM FROM FILMS BASED ON ITS ID

router.delete('/:id', (req, res) => {
    console.log(`DELETE /films/${req.params.id}`);
  
    const foundIndex = FILMS.findIndex(film => film.id == req.params.id);
  
    if (foundIndex < 0) return res.sendStatus(404);
  
    const filmsRemovedFromFilms = FILMS.splice(foundIndex, 1);
    const filmRemoved = filmsRemovedFromFilms[0];
  
    res.json(filmRemoved);
  });

  // UPDATE WITH PATCH A FILM BASED ON ITS ID AND NEW VALUES FOR ITS PARAMETERS 

router.patch('/:id', (req, res) => {
    console.log(`PATCH /films/${req.params.id}`);
  
    const title = req?.body?.title;
    const duration = req?.body?.duration;
    const budget = req?.body?.budget;
    const link = req?.body?.link;
  
    console.log('POST /films');
  
    if ((!title && !duration && !budget && !link ) || title?.length === 0 || duration?.length === 0 || budget?.length === 0 || link?.length === 0 ) return res.sendStatus(400);
  
    const foundIndex = FILMS.findIndex(film => film.id == req.params.id);
  
    if (foundIndex < 0) return res.sendStatus(404);
  
    const updatedFilm = {...FILMS[foundIndex], ...req.body};
  
    FILMS[foundIndex] = updatedFilm;
  
    res.json(updatedFilm);
  });


 // UPDTAE THE ENTIRE RESOURCE, AND IF IT DOESN'T EXIST CAN CREATE IT

 router.put('/:id', function (req, res) {
  const title = req?.body?.title;
  const link = req?.body?.link;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;

  console.log('PUT /films');
  
    if (!title || !duration || !budget || !link || title.length === 0 || duration.length === 0 || budget.length === 0 || link.length === 0) {
        return res.sendStatus(400);
    }
  
    const foundIndex = FILMS.findIndex(film => film.id == req.params.id);
  
    if (foundIndex >= 0) {
        // REPLACE THE ENTIRE EXISTANT RESOURCE
        FILMS[foundIndex] = { ...FILMS[foundIndex], ...req.body };
        res.json(FILMS[foundIndex]);
    } else {
        // CREATE A NEW RESOURCE IF THE ID DOES'NT EXIST 
        const newFilm = { id: req.params.id, ...req.body };
        FILMS.push(newFilm);

    }
});





  
  



module.exports = router;
