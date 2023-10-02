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
    title: 'Le Château ambulant ',
    duration: 119,
    budget: 26462588 ,
    link: 'https://www.imdb.com/title/tt0347149/?ref_=nv_sr_srsg_3_tt_8_nm_0_q_le%2520chateau'
  },

];

// Read all the films

  router.get('/', (req, res) => {
    const minimumFilmDuration = req?.query?.['minimum-duration']
      ? Number(req.query['minimum-duration']): undefined;
    
    console.log(minimumFilmDuration);
    console.log(typeof minimumFilmDuration);


    if (minimumFilmDuration === undefined) return res.json(FILMS);
  
    if (typeof minimumFilmDuration !== 'number' || minimumFilmDuration <= 0)
      return res.json('Wrong minimum duration'); 
  
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

  //npx express-generator --no-view basic

  console.log('POST /films');
 
  // SI Y'A RIEN DANS LE CONTENU ENVOIE ERROR LIGHT 
  if (!title || !duration || !budget || !link) return res.sendStatus(400); // error code '400 Bad request'

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



module.exports = router;
