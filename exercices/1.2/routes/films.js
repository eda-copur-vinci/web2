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
router.get('/', function (req, res) {
    return res.json(FILMS);
  });

module.exports = router;
