const span = document.querySelector('span');

const btn1 = document.querySelector('#myButton');  
let compteur  = 0;

btn1.addEventListener('click', () => {

    btn1.innerText = 'myButton : I have been clicked !';
     console.log('onClickHandlerForBtn1::click');
     compteur+=1;

     if(compteur >= 5 && compteur <= 9) {
        span.innerHTML = "Bravo, bel échauffement !" + compteur;
        console.log("Bravo, bel échauffement !", compteur) }

     if(compteur === 10) {
        span.innerHTML =  "Vous êtes passé maître en l'art du clic !" + compteur
        console.log("Vous êtes passé maître en l'art du clic !", compteur);

     } 
    });
   