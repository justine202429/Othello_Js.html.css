retournee=[];
pointMarin = 2;
pointPirate = 2;

////////////////////////////////////////////////////////////

document.getElementById("boutonJeu").addEventListener("click", function() {
tailleG = document.getElementById("tailleG").value;
});

document.addEventListener('DOMContentLoaded', function() {
  donnees = [{
    values: [pointMarin, pointPirate],
    labels: ['Marin', 'Pirate'],
    type: 'pie',
    marker:{
      colors: ['black', 'white']
  }
  }];

  layout = {
    height: 400,
    width: 500,
    plot_bgcolor: 'rgba(0,0,0,0)',
    paper_bgcolor: 'rgba(0,0,0,0)' 
  };

  Plotly.newPlot('camembert', donnees, layout);

  //Courbes évolution des scores
pirate = {
  x: [0],
  y: [2],
  mode: 'lines',
  name: 'Marin',
  line: {
    color: 'blue' 
  }
};

marin = {
  x: [0],
  y: [0],
  mode: 'lines',
  name: 'Pirate',
  line: {
    color: 'red' 
  }
};

donnees = [pirate, marin];

layout = {
  xaxis: {
    title: 'Numéro du tour'
  },
  yaxis: {
    title: 'Nombre de points'
  },
  plot_bgcolor: 'rgba(0,0,0,0)',
  paper_bgcolor: 'rgba(0,0,0,0)' 
};

Plotly.newPlot('courbes', donnees, layout);
});

////////////////////////////////////////////////////////////

function creerGrille(tailleG) {
  plateau = document.getElementById("plateau");
  plateau.innerHTML = ""; 

  premierecol = document.createElement("div");
  premierecol.classList.add("ligne");
  
  // Première colonne
    //Coin vide colonnes gauche haut
  coinVide = document.createElement("div");
  coinVide.classList.add("enteteC");
  coinVide.textContent = "";
  premierecol.appendChild(coinVide);

  //Affichage de chiffres colonnes gauche 
    plateau.appendChild(premierecol);

  for (i = 1; i <= tailleG; i++) {
    entete = document.createElement("div");
    entete.classList.add("enteteC");
    if (i > 0 && i!= tailleG+1) {
      entete.textContent = i; 
    }
    premierecol.appendChild(entete);
  }
  plateau.appendChild(premierecol);

  //Coin vide colonnes gauche bas
  coinVide = document.createElement("div");
  coinVide.classList.add("enteteC");
  coinVide.textContent = "";
  premierecol.appendChild(coinVide);

plateau.appendChild(premierecol);

  // Lignes
  for (i = 0; i < tailleG; i++) {
    ligne = document.createElement("div");
    ligne.classList.add("ligne");
    

    // Affichage des lettres ligne haut
    premiereLigne = document.createElement("div");
    premiereLigne.classList.add("enteteL");
    premiereLigne.textContent = String.fromCharCode(65 + i); 
    ligne.appendChild(premiereLigne);

    // Création des cases
    for (j = 0; j < tailleG; j++) {
      grille = document.createElement("div");
      grille.classList.add("case");
      ligne.appendChild(grille);
    }
    
    // Affichage des lettres ligne bas
    entete = document.createElement("div");
    entete.classList.add("enteteL2");
    entete.textContent = String.fromCharCode(65 + i); 
    ligne.appendChild(entete);

    plateau.appendChild(ligne);
 
  }

    derCol = document.createElement("div");
    derCol.classList.add("ligne");

    //Coin vide colonnes droite haut
    coinVide = document.createElement("div");
    coinVide.classList.add("enteteC");
    coinVide.textContent = "";
    derCol.appendChild(coinVide);

  //Affichage de chiffres colonne droite 
  for (i = 1; i <= tailleG; i++) {
    entete = document.createElement("div");
    entete.classList.add("enteteC");
    if (i > 0 && i != tailleG+2) {
      entete.textContent = i; 
    }
    derCol.appendChild(entete);
  }
  plateau.appendChild(derCol);

    //Coin vide colonne droite bas
    coinVide = document.createElement("div");
    coinVide.classList.add("enteteC");
    coinVide.textContent = "";
    derCol.appendChild(coinVide);
}
////////////////////////////////////////////////////////////

function initCases() {
  cases = document.getElementsByClassName("case");

  for (i = 0; i < cases.length; i++) {
    X = Math.floor(i / tailleG) +1;
    Y = (i % tailleG) + 1;
       //console.log(X+Y);


    idCase = (X * 10) + Y;

    cases[i].setAttribute("id", idCase);
    cases[i].addEventListener("click", caseClic);
  }
}
////////////////////////////////////////////////////////////

function pionsDepart() {
  plateau = document.getElementById("plateau");

   ligne1 = plateau.children.length / 2 -1;
   ligne2 = ligne1 + 1; 
   col1 = plateau.children[ligne1].children.length / 2 -1;
   col2 = col1 + 1;
   //console.log(col1);
  
  //marin
  plateau.children[ligne1].children[col1].innerHTML = '<div class="pion" type="marin"><img src="marin.png"></div>';
  plateau.children[ligne2].children[col2].innerHTML = '<div class="pion" type="marin"><img src="marin.png"></div>';

  //pirate
  plateau.children[ligne2].children[col1].innerHTML = '<div class="pion" type="pirate"><img src="pirate.png"></div>';
  plateau.children[ligne1].children[col2].innerHTML = '<div class="pion" type="pirate"><img src="pirate.png"></div>';
}

////////////////////////////////////////////////////////////

//Lancement du jeu selon le choix du mode de jeu fait dans le formulaire
//On récupère d'abord les variables utiles : le bouton de départ de jeu, le mode de jeu choisi et le rôle choisi pour le monde "1 joueur"
document.getElementById("boutonJeu").addEventListener("click", function() {
modeJeu = document.querySelector('input[name="modeJeu"]:checked').value;
choixPion = document.querySelector('input[name="role"]:checked').value;

    //Mode deux joueurs
  if (modeJeu == "1") {
    alert("Mode deux joueurs sélectionné !");
    //On remet les points à leur valeur de départ en on les affiche dans le html
    pointMarin = 2;
    pointPirate = 2;
    totalBlanc.innerHTML = "Pirates : " + pointPirate;
    totalNoir.innerHTML = "Marins : " + pointMarin;

    //On crée la grille de jeu selon la taille choisie par l'utilisateur (tailleG)
    creerGrille(tailleG);
    //On place les événèments/id sur chaque case du jeu crée par creerGrille
    initCases();
    //On ajoute les pions du milieu 
    pionsDepart();
    //On recherche pour le premier joueur (marin) les déplacements possibles, et on les affiche
    afficheDeplacement(trouverDeplacement("marin")); 

    //On cache le formulaire et on affiche le plateau de jeu + le camembert des scores et les scores associés
    document.getElementById("score").style.display = "flex";
    document.getElementById("choixJeu").style.display = "none";
    document.getElementById("camembert").style.display = "flex"
    document.getElementById("courbes").style.display = "flex";
    document.getElementById("titres").style.display = "none";
    document.getElementById("boutonJeu").style.display = "none";

    //Mode contre ordinateur
  } else if (modeJeu == "2") {
    alert("Mode un joueur sélectionné !");
        //On remet les points à leur valeur de départ en on les affiche dans le html
    pointMarin = 2;
    pointPirate = 2;
    totalBlanc.innerHTML = "Pirates : " + pointPirate;
    totalNoir.innerHTML = "Marins : " + pointMarin;

    //idem que pour le premier mode de jeu
    creerGrille(tailleG);
    initCases();
    pionsDepart();

        //On cache le formulaire et on affiche le plateau de jeu + le camembert des scores et les scores associés
    document.getElementById("score").style.display = "flex";
    document.getElementById("choixJeu").style.display = "none";
    document.getElementById("titres").style.display = "none";
    document.getElementById("boutonJeu").style.display = "none";
    document.getElementById("camembert").style.display = "flex";
    document.getElementById("courbes").style.display = "flex";


    //si le joueur choisit d'être pirate, l'ordinateur joue en premier on lance la fonction adéquate
    if (choixPion == "pirate"){
      placerMarinAleatoire();
    }
    //si le joueur choisit les marins il joue en premier on calcule et on lui montre les déplacements possibles
    else if (choixPion == "marin"){
      afficheDeplacement(trouverDeplacement("marin"));
      placerPirateAleatoire();
    }    
  } else if (modeJeu == "3") {
    alert("Mode un joueur difficile sélectionné !");
        //On remet les points à leur valeur de départ en on les affiche dans le html
    pointMarin = 2;
    pointPirate = 2;
    totalBlanc.innerHTML = "Pirates : " + pointPirate;
    totalNoir.innerHTML = "Marins : " + pointMarin;

    //idem que pour le premier mode de jeu
    creerGrille(tailleG);
    initCases();
    pionsDepart();

    //On cache le formulaire et on affiche le plateau de jeu + le camembert des scores et les scores associés
    document.getElementById("score").style.display = "flex";
    document.getElementById("choixJeu").style.display = "none";
    document.getElementById("titres").style.display = "none";
    document.getElementById("boutonJeu").style.display = "none";
    document.getElementById("camembert").style.display = "flex";
    document.getElementById("courbes").style.display = "flex";


    //si le joueur choisit d'être pirate, l'ordinateur joue en premier on lance la fonction adéquate
    if (choixPion == "pirate"){
      placerMarinAleatoireStrat();
    }
    //si le joueur choisit les marins il joue en premier on calcule et on lui montre les déplacements possibles, puis on lance la fonction pour que l'ordi joue avec stratégie
    else if (choixPion == "marin"){
      //Le joueur choisit de commencer à jouer, on affiche/calcule les déplacement possibles
      afficheDeplacement(trouverDeplacement("marin"));
      placerPirateAleatoireStrat();
    }    
  }
});


//FONCTION ORDINATEUR - JOUEUR PIRATE
////////////////////////////////////////////////////////////
//On crée un évènement qui gère les clics sur les objets de classe case
function detectionClic1(event) {
    //On spécifie le modeJeu et le typePion pour éviter l'activation de cette fonction à chaque clic dans d'autres situations
  if (modeJeu == "2" && typePion =="pirate" && event.target.classList.contains('case')) {
    //On ajoute à la classe clique à chqaue case
    event.target.classList.add('clique');
  }
}

//On attache l'évènement à la page
document.addEventListener('click', detectionClic1);

//Fonction pour vérifier en fonction d'un intervalle de temps est-ce qu'une case a été cliquée par l'utilisateur pendant l'intervalle spécifié 
function verifClicMarin() {
  //On crée la fonction qui gère l'intervalle 
  intervalleM = setInterval(function() {
      //Si un clic est détecté et que c'est bien le tour du marin, on lance la fonction pour placer un pion de type "marin"
      clicDetecteM = document.querySelector('.case.clique');
    if (clicDetecteM && tour) {
      //On affiche un message pour indiquer au joueur que son mouvement a bien été pris en compte
      alert('Joli coup ! Au tour du marin!')
      placerMarinAleatoire();
      //Après ça on enlève la classe clique de la case cliquee à ce tour
      clicDetecteM.classList.remove('clique');
    }
  }, 100);
}

////////////////////////////////////////////////////////////
// Fonction pour que l'ordi type "marin" joue aléatoirement
function placerMarinAleatoire() {
  //On lance la détection d'un clic
  verifClicMarin();

  depPossibleM=[];

  if (tour) {
    typePion = "marin";
  } else {
    typePion = "pirate";
  }  

  // On va récupérer les déplacements possibles pour un pion de type marin
  depPossibleM = trouverDeplacement(typePion); 

  // On regarde s'il existe au moins un déplacement possible 
  if (depPossibleM.length > 0) {
    // On récupère l'indice du déplacement au hasard choisi dans le tableau rendu par trouverDeplacement
    caseAleatoireM = Math.floor(Math.random() * depPossibleM.length);
    // On récupère le numéro de la case correpondant à l'id récupéré
    casePionM = depPossibleM[caseAleatoireM];
    // On crée un "faux" événement "clic de souris" sur la case choisie aléatoirement
    fauxClicM = new MouseEvent('click');
    // On déclenche l'événement sur la case trouvée plus tôt
    document.getElementById(casePionM).dispatchEvent(fauxClicM);
  } else {
    // Si le marin ne trouve aucune case où il peut jouer
    alert("Aucun déplacement possible pour le marin, au tour de pirates !");
  }
  nouveauCamembert();
  afficheDeplacement(trouverDeplacement("pirate"));

      //Si le tour est encore impossible, on passe la variable impossible à vraie
      if (cpossible.length == 0 && pointMarin+pointMarin !== tailleG*tailleG) {
        impossible = true;
    }
  //On vérifie si la partie est est impossible ou si elle est terminée
  if (!impossible && (pointMarin+pointMarin !== tailleG*tailleG)) {
    finJeu();
  }
}

//FONCTION ORDINATEUR - JOUEUR MARIN
////////////////////////////////////////////////////////////

// Fonction pour gérer les clics sur les objets de classe 'case'
function detectionClic2(event) {
  if (modeJeu == "2" && typePion == "marin" && event.target.classList.contains('case')) {
    // Ajoute la classe 'clique' à chaque case
    event.target.classList.add('clique');
    verifClicPirate();
  }
}

// Attache l'événement de clic à la page
document.addEventListener('click', detectionClic2);

//Fonction pour vérifier par intervalle quand est-ce qu'une case est cliquée par l'utilisateur 
function verifClicPirate() {
  //On crée la fonction 
  intervalleP = setInterval(function() {
      //Si un clic est détecté on lance la fonction pour placer un pion de type "marin"
      clicDetecteP = document.querySelector('.case.clique');
    if (clicDetecteP && !tour) {
      alert('Joli coup ! Au tour du pirate!')
      placerPirateAleatoire();
      //Après ça on enlève la classe clique de la case cliquee à ce tour
      clicDetecteP.classList.remove('clique');
    }
  }, 100);
}

// Variable pour vérifier si c'est le tour du pirate
tourPirate = false;

////////////////////////////////////////////////////////////

// Fonction pour que l'ordi type "marin" joue aléatoirement
function placerPirateAleatoire() {
  //On lance la détection d'un clic
  clearInterval(intervalleP);

  depPossible=[];

  if (tour) {
    typePion = "marin";
  } else {
    typePion = "pirate";
  }  

  // On va récupérer les déplacements possibles pour un pion de type marin
  depPossible = trouverDeplacement(typePion); 

  // On regarde s'il existe au moins un déplacement possible 
  if (depPossible.length > 0) {
    // On récupère l'indice du déplacement au hasard choisi dans le tableau rendu par trouverDeplacement
    caseAleatoire = Math.floor(Math.random() * depPossible.length);
    // On récupère le numéro de la case correpondant à l'id récupéré
    casePion = depPossible[caseAleatoire];
    // On crée un "faux" événement "clic de souris" sur la case choisie aléatoirement
    fauxClic = new MouseEvent('click');
    // On déclenche l'événement sur la case trouvée plus tôt
    document.getElementById(casePion).dispatchEvent(fauxClic);
  } else {
    // Si le marin ne trouve aucune case où il peut jouer
    alert("Aucun déplacement possible pour le marin, au tour de pirates !");
  }
  tourPirate = false;
  nouveauCamembert();
  afficheDeplacement(trouverDeplacement("marin"));

      //Si le tour est encore impossible, on passe la variable impossible à vraie
      if (cpossible.length == 0 && pointMarin+pointMarin !== tailleG*tailleG) {
        impossible = true;
    }
  //On vérifie si la partie est est impossible ou si elle est terminée
  if (!impossible && (pointMarin+pointMarin !== tailleG*tailleG)) {
    finJeu();
  }
}


//FONCTION ORDINATEUR STRATÉGIE - JOUEUR PIRATE
////////////////////////////////////////////////////////////
//On crée un évènement qui gère les clics sur les objets de classe case
function detectionClic3(event) {
  if ( modeJeu == "3" && typePion == "pirate" && event.target.classList.contains('case')) {
    //On ajoute à la classe clique à chqaue case
    event.target.classList.add('clique');
  }
}

//On attache l'évènement à la page
document.addEventListener('click', detectionClic3);

//Fonction pour vérifier par intervalle quand est-ce qu'une case est cliquée par l'utilisateur 
function verifClicMarin2() {
  //On crée la fonction 
  intervalle2 = setInterval(function() {
      //Si un clic est détecté on lance la fonction pour placer un pion de type "marin"
      clicDetecte2 = document.querySelector('.case.clique');
    if (clicDetecte2 && tour) {
      alert('Joli coup ! Au tour du pirate!')
      placerMarinAleatoireStrat();
      //Après ça on enlève la classe clique de la case cliquee à ce tour
      clicDetecte2.classList.remove('clique');
    }
  }, 100);
}
////////////////////////////////////////////////////////////

// Fonction pour que l'ordi type "marin" joue aléatoirement
function placerMarinAleatoireStrat() {
// On lance la détection d'un clic
  verifClicMarin2();

  depPossibleMS = [];
  max = 0; 
  meilleurId = -1; 

  if (tour) {
    typePion = "marin";
  } else {
    typePion = "pirate";
  }

  // On va récupérer les déplacements possibles pour un pion de type marin
  depPossibleMS = trouverDeplacement(typePion);

    // Parcourir tous les déplacements possibles
    for (i = 0; i < depPossibleMS.length; i++) {
      // On utilise la fonction retourPions pour compter le nombre de pions pouvant être retournés
      retourPions(typePion);
      nbPions = retournee.length;
      // On réinitialise la liste des pions retournés
      retournee.length = 0;
  
      if (nbPions >= max) {
        max = nbPions;
        meilleurId = i;
      }
      //console.log(max);

      casePionMS = depPossibleMS[meilleurId];

    // On crée un "faux" événement "clic de souris" sur la case choisie aléatoirement
    fauxClicMS = new MouseEvent('click');
    // On déclenche l'événement sur la case trouvée plus tôt
    document.getElementById(casePionMS).dispatchEvent(fauxClicMS);
    }
    nouveauCamembert();
    afficheDeplacement(trouverDeplacement("pirate"));
          //Si le tour est encore impossible, on passe la variable impossible à vraie
          if (cpossible.length == 0 && pointMarin+pointMarin !== tailleG*tailleG) {
            impossible = true;
        }
      //On vérifie si la partie est est impossible ou si elle est terminée
      if (!impossible && (pointMarin+pointMarin !== tailleG*tailleG)) {
        finJeu();
      }
}   



//FONCTION ORDINATEUR STRATÉGIE - JOUEUR MARIN
////////////////////////////////////////////////////////////
//On crée un évènement qui gère les clics sur les objets de classe case
function detectionClic4(event) {
  if ( modeJeu == "3" && typePion =="marin" && event.target.classList.contains('case')) {
    //On ajoute à la classe clique à chqaue case
    event.target.classList.add('clique');
    verifClicPirate2();
  }
}

//On attache l'évènement à la page
document.addEventListener('click', detectionClic4);

//Fonction pour vérifier par intervalle quand est-ce qu'une case est cliquée par l'utilisateur 
function verifClicPirate2() {
  //On crée la fonction 
  intervalle3 = setInterval(function() {
      //Si un clic est détecté on lance la fonction pour placer un pion de type "marin"
      clicDetecte3 = document.querySelector('.case.clique');
    if (clicDetecte3 && !tour) {
      alert('Joli coup ! Au tour du pirate!')
      placerPirateAleatoireStrat();
      //Après ça on enlève la classe clique de la case cliquee à ce tour
      clicDetecte3.classList.remove('clique');
    }
  }, 100);
}
////////////////////////////////////////////////////////////

// Fonction pour que l'ordi type "pirate" joue aléatoirement
function placerPirateAleatoireStrat() {

// On lance la détection d'un clic
    clearInterval(intervalle3);

  depPossible = [];
  max = 0; 
  meilleurId = -1; 

  if (tour) {
    typePion = "marin";
  } else {
    typePion = "pirate";
  }

  // On va récupérer les déplacements possibles pour un pion de type marin
  depPossible = trouverDeplacement(typePion);

    // Parcourir tous les déplacements possibles
    for (i = 0; i < depPossible.length; i++) {
      // On utilise la fonction retourPions pour compter le nombre de pions pouvant être retournés
      retourPions(typePion);
      nbPions = retournee.length;
      // On réinitialise la liste des pions retournés
      retournee.length = 0;
  
      if (nbPions >= max) {
        max = nbPions;
        meilleurId = i;
      }
      console.log(max);

      casePion = depPossible[meilleurId];

    // On crée un "faux" événement "clic de souris" sur la case choisie aléatoirement
    fauxClic = new MouseEvent('click');
    // On déclenche l'événement sur la case trouvée plus tôt
    document.getElementById(casePion).dispatchEvent(fauxClic);
    }
    tourPirate = false;

    nouveauCamembert();
    afficheDeplacement(trouverDeplacement("marin"));
          //Si le tour est encore impossible, on passe la variable impossible à vraie
          if (cpossible.length == 0 && pointMarin+pointMarin !== tailleG*tailleG) {
            impossible = true;
        }
      //On vérifie si la partie est est impossible ou si elle est terminée
      if (!impossible && (pointMarin+pointMarin !== tailleG*tailleG)) {
        finJeu();
      }
}   

////////////////////////////////////////////////////////////

//Fonction pour gérer le passage au prochain tour
function prochainJoueurOrdi() {
  //On inverse le tour 
  tour = !tour;
  console.log(tour);
}
////////////////////////////////////////////////////////////

//Création d'un pion selon le type en entrée (marin ou pirate)
function creerPion(type){
//On crée un div qui nous permettra d'afficher chaque pion crée dans une case
  pion = document.createElement("div");
  //On lui donne la class="pion"
  pion.setAttribute("class","pion");
  //On crée un attribut "type" qui correpondra au type du pion (marin ou pirate)
  pion.setAttribute("type",type);
  //On crée un img pour y poser l'image du pion
  img = document.createElement("img");

  //On assigne une image au pion crée selon son type spécifié en entrée
  if (type == "marin"){
  img.setAttribute("src","marin.png");
  }
  else if (type == "pirate"){
    img.setAttribute("src", "pirate.png")
  }
  //On ajoute l'image au div crée plus haut en tant qu'enfant de celui-ci
  pion.appendChild(img);

  return pion;
}

//Fonction qui permet de savoir si une case est vide ou non (contient un pion)
function trouverCaseLibre(cases) {
  //On récupère tous les éléments de class="pion", soit tous les pions du plateau
  pions = cases.getElementsByClassName("pion");
  
  //S'il existe un pion on récupère son type et on le retourne sino la case est considéré comme "vide"
  if (pions.length > 0) {
    type = pions[0].getAttribute("type");
    return type;
  } else {
    return "vide";
  }
}
////////////////////////////////////////////////////////////

//Fonction qui parcourt le plateau/grille dans une direction donnée en argument selon la position du dernier pion posé et son type.
function parcourirGrille(derPionPos, typePion, direction) {
//On stocke la position sous forme de chaine de caractères du dernier pion posé
  ligne = parseInt(derPionPos.charAt(0));
  colonne = parseInt(derPionPos.charAt(1));
  
    //On créer un tableau pour stocker les id des cases dont les pions peuvent être changés
  aTourner = [];
    //on récupère le nombre de lignes de la grille
  nbLigne = tailleG;

    //On parcout la grille en modifiant les indices de lignes et de colonnes selon la direction choisie
  while (true) {
    if (direction == "haut") {
      ligne--;
    } else if (direction == "bas") {
      ligne++;
    } else if (direction == "gauche") {
      colonne--;
    } else if (direction == "droite") {
      colonne++;
    } else if (direction == "hautG") {
      ligne--;
      colonne--;
    } else if (direction == "hautD") {
      ligne--;
      colonne++;
    } else if (direction == "basG") {
      ligne++;
      colonne--;
    } else if (direction == "basD") {
      ligne++;
      colonne++;
    }

        //On stocke la position du pion uniquement si il appartient bien à la grille
    if (ligne >= 1 && ligne <= nbLigne && colonne >= 1 && colonne <= nbLigne) {
    CaseIdTxt = ligne.toString() + colonne.toString();
    idCase = document.getElementById(CaseIdTxt);
    type = trouverCaseLibre(idCase);
    }
    else{    
      //Undefined au cas où on trouve bel et bien un pion mais hors de la grille
        return;    }

    //Si le type du pion est le même que celui du dernier pion posé il n'y a rien à retourner donc on s'arrête.
    if (type == typePion) {
      //On parcourt les id des cases à retourner et on les ajoute au tableau des pions à retourner
      for (var i = 0; i < aTourner.length; i++) {
        retournee[retournee.length] = aTourner[i];
      }
      //Si le type du pion est le même que celui du dernier pion posé on ne retourne aucun pion
      return type;
    }

    //Si la case est vide il n'y a rien à retourner, la case sera "vide"
    if (type == "vide") {
    return type;
    }
    //On stockes tous les id des cases à retourner dans le tableau aTourner petit à petit
    aTourner[aTourner.length] = CaseIdTxt;
  }
}
////////////////////////////////////////////////////////////

//Fonction qui permet de savoir les déplacements possibles d'un joueur selon le pion en entrée
function trouverDeplacement(typePion) {
  //On récupère toutes les casess du plateau et on crée un tableau vide pour stocker les id des cases valides plus tard.
  cases = document.getElementsByClassName('case');
  casesOui = [];

  //On parcourt toutes les cases su plateau et on calcule sa ligne et sa colonne 
  for (i = 0; i < cases.length; i++) {
     ligne =tailleG - Math.floor(i / tailleG);
     col = (i % tailleG) + 1;
     
     //On créer un id selon la colonne et la ligne calculée, on le transforme en chaine de caractères
     id = (ligne * 10 + col).toString();
        //console.log(id);

     casebis = document.getElementById(id);
        //console.log(casebis);    
        
    //On créer une variable pour stocker si la case sera valide ou non pour un déplacement
     cvalide = false;
     //On regarde si la case est vide
     if (trouverCaseLibre(casebis) == "vide") {

      //Si oui, on parcourt toute la grille dans toutes les directions et on vérifie si il y a des pions qui peuvent être retournés
     if (parcourirGrille(id, typePion, "haut") != "vide" && retournee.length > 0) {
      //Si oui la case est valide pour le déplacement
        cvalide = true;
     }
     //On remet à 0 pour les prochaines directions 
     retournee.length = 0;

     //On vérifie dans toutes les directions...
     if (parcourirGrille(id, typePion, "bas") != "vide" && retournee.length > 0) {
        cvalide = true;
     }
     retournee.length = 0;

     if (parcourirGrille(id, typePion, "gauche") != "vide" && retournee.length > 0) {
        cvalide = true;
     }
     retournee.length = 0;

     if (parcourirGrille(id, typePion, "droite") != "vide" && retournee.length > 0) {
        cvalide = true;
     }
     retournee.length = 0;

     if (parcourirGrille(id, typePion, "hautG") != "vide" && retournee.length > 0) {
        cvalide = true;
     }
     retournee.length = 0;

     if (parcourirGrille(id, typePion, "hautD") != "vide" && retournee.length > 0) {
        cvalide = true;
     }
     retournee.length = 0;

     if (parcourirGrille(id, typePion, "basG") != "vide" && retournee.length > 0) {
        cvalide = true;
     }
     retournee.length = 0;

     if (parcourirGrille(id, typePion, "basD") != "vide" && retournee.length > 0) {
        cvalide = true;
     }
     retournee.length = 0;

     //Si la case est valide on stocke son id dans un tableau et on le renvoie plus bas avec return.
     if (cvalide) {
        casesOui[casesOui.length] = id;
      } 
    }
  }
  return casesOui;
}
////////////////////////////////////////////////////////////

//Fonction qui cherche et retourne tous les pions à retourner dans toutes les directions selon le dernier pion posé
function trouvePions(derPionPos, typePion) {
  parcourirGrille(derPionPos, typePion, "droite");
  parcourirGrille(derPionPos, typePion, "gauche");
  parcourirGrille(derPionPos, typePion, "haut");
  parcourirGrille(derPionPos, typePion, "bas");
  parcourirGrille(derPionPos, typePion, "hautG");
  parcourirGrille(derPionPos, typePion, "hautD");
  parcourirGrille(derPionPos, typePion, "basG");
  parcourirGrille(derPionPos, typePion, "basD");

  retourPions(typePion);
  retournee.length = 0;
}
////////////////////////////////////////////////////////////

//Fonction qui se déclenche quand on clique sur une case du plateau
function caseClic(clic) {
  //On récupère la case où a eu lieu le clic
  cCliquee = clic.target;

  //Si c'est au tour du marin, le pion prends le type marin et inverse pour pirate
  if (tour) {
    typePion = "marin";
  } else {
    typePion = "pirate";
  }
  //On crée un pion selon le type déterminé plus haut
  pion = creerPion(typePion);

  //On récupère les cases où l'on peut se déplacer
  cpossible = trouverDeplacement(typePion);  
  
  //Ici on va stocker la réponse à "est ce que la case cliquée est valide au déplacement?""
  caseValide = false;
  //Ici on va stocker la "réponse" à "est ce que la case correponds à un déplacement possible?""
  cvalide = false;

  //On parcourt toutes les cases possibles pour se déplacer et on vérifie si elles sont valides ou non
  for (i = 0; i < cpossible.length && !cvalide; i++) {
      if (cpossible[i] == cCliquee.id) {
          cvalide = true;
      }
  }

  for (i = 0; i < cpossible.length && !caseValide; i++) {
    if (cpossible[i] == cCliquee.id) {
      caseValide = true;
    }
  }

  //Si elle n'est pas valide, on affiche une alerte pour le joueur
  if (!caseValide && modeJeu == 2 || !caseValide && modeJeu == 3){
    return;
  }
  else if (!caseValide) {
    alert("Tu veux ta longue-vue ? C'est pas possible ici matelot !");
    return;
  }

  
  //Sinon on ajoute le pion sur la case cliquée
 cCliquee.appendChild(pion);

 //On met àjour les points selon la case crée
 if (typePion == "marin") {
   pointMarin++;
 } else {
   pointPirate++;
 }

 //On retourne les pions
 trouvePions(cCliquee.id,typePion);


 if (modeJeu == 1){
 //On change de joeur
 prochainJoueur();
 }
 else if (modeJeu ==2 || modeJeu ==3){
  prochainJoueurOrdi();
 }
 //On vérifie si la partie est terminée
 finJeu();
 //On met à jour le camembert des scores
 nouveauCamembert();
 nouvelleCourbe();
}
////////////////////////////////////////////////////////////

//Fonction pour gérer le passage au prochain tour
function prochainJoueur() {
  //On inverse le tour 
  tour = !tour;
  //On crée une variable qui permettra de détecter une situation ou un tour sera impossible
   impossible = false;

//On détermine le type du pion selon le tour actuel
if (tour) {
  typePion = "marin";
} else {
  typePion = "pirate";
}

//On va chercher les déplacements possibles selon le type du pion
  cpossible = trouverDeplacement(typePion);
  //On affiche les déplacements possibles
  afficheDeplacement(cpossible);
  
  //Si le tour est impossible, on passe la main à l'autre joueur
  if (cpossible.length == 0 && pointMarin+pointMarin !== tailleG*tailleG) {
    tour = !tour;
    
    //On change à nouveau le type du pion
    if (tour) {
      typePion = "marin";
    } else {
      typePion = "pirate";
    }    
    //On cherche + affiche encore les déplacements possibles selon le pion
    cpossible = trouverDeplacement(typePion);
    afficheDeplacement(cpossible);
    
    //Si le tour est encore impossible, on passe la variable impossible à vraie
    if (cpossible.length == 0 && pointMarin+pointMarin !== tailleG*tailleG) {
      impossible = true;
  }
}
//On vérifie si la partie est est impossible ou si elle est terminée
if (!impossible && (pointMarin+pointMarin !== tailleG*tailleG)) {
  finJeu();
}
}
////////////////////////////////////////////////////////////

//Fonction pour montrer avec un style css différent les cases où il est possible de se déplacer à chaque tour
function afficheDeplacement(casesOui) {
  //On supprime d'abord les anciennces cases mises en évidence car c'est un nouveau tour
  effacerCasesP();

  //On parcourt toutes les cases à mettre en évidence et on récupère leur id
  for (i = 0; i < casesOui.length; i++) {
    caseOuiId = casesOui[i];
    //Si la case existe on y ajoute la classe = caseOui pour pouvoir l'utiliser dans le css
    if (document.getElementById(caseOuiId)) {
      document.getElementById(caseOuiId).className += " casesOui";
    }
  }
}

//Fonction pour effacer les cases inquiquées pour le déplacement
function effacerCasesP() {
  //On récupère toutes les cases ou le déplacement est possible
  casesOui = document.getElementsByClassName("casesOui");

  //On les parcourt en commencant par la fin pour ne pas avoir de problèmes avec les indices en supprimant
  for (i = casesOui.length - 1; i >= 0; i--) {
    //On supprime petit à petit les cases pour ne plus qu'elles aient le style css des cases possibles au prochain tour
    casesOui[i].classList.remove("casesOui");
  }
}


tour = true;
////////////////////////////////////////////////////////////

//Fonction qui retourne les pions
function retourPions(type){
  //On récupère les scores actuels des joueurs
 totalBlanc = document.getElementById("totalBlanc");
 totalNoir = document.getElementById("totalNoir");
    
 //On parcourt le html des cases à retourner avec leur id
  for (i = 0; i < retournee.length; i++) {
    idCase = retournee[i];

     caseBis = document.getElementById(idCase);

     //On supprime tous les enfants de chaque case récupérée (type + img)
    while(caseBis.firstChild){
      caseBis.removeChild(caseBis.firstChild);
    }
    
    //On crée un nouveau pion du même type que le pion posé et on l'ajoute en tant que nouvel enfant de la case
    pion = creerPion(type);
    caseBis.appendChild(pion);

    //Selon chaque pion retourné on met à jour les points
    if (type == "marin") {
      pointMarin++;
      pointPirate--;
    } else {
      pointMarin--;
      pointPirate++;
    }

    //On met à jour le html
    totalBlanc.innerHTML = "Marins : "+pointMarin;
    totalNoir.innerHTML = "Pirates : "+pointPirate;
  }
  //On remet à 0 les cases à retourner
  retournee.length=0;
}
////////////////////////////////////////////////////////////

//Fonction qui déclenche la fin de partie 
function finJeu() {
  //On récupère le html des éléments dont on besoin en fin de partie, soit le message de fin et les deux boutons rejouer et quitter
   messageFin = document.getElementById("messageFin");
   rejouer = document.getElementById("rejouer");
   retourAccueil = document.getElementById("retourAccueil");

   //On détermine le vainqueur selon le nombre de points mais aussi selon si la partie s'est terminée entièrement ou non
  if (pointMarin + pointPirate == tailleG * tailleG) {
      if (pointMarin > pointPirate) {
          messageFin.textContent = "Les marins l'emportent !";
      } else if (pointMarin < pointPirate) {
          messageFin.textContent = "Les pirates l'emportent !";
      } else {
          messageFin.textContent = "Égalité ! Parfois il n'y a pas de vainqueur en mer..";
      }
  } else if (impossible) {
      messageFin.textContent = "La mer a repris ses droits...elle remporte la partie !";
  } else {
      return; 
  }

  //On affiche les boutons pour rejouer/quitter et le message de fin
  rejouer.style.display = "block";
  retourAccueil.style.display = "block";
  document.getElementById("messageFin").style.display = "block";

  //Pour le bouton rejouer on réinitialise la page 
  document.getElementById("rejouer").addEventListener("click", function() {
    location.reload();
});
//Pour le bouton quitter on retourne à la page d'accueuil
document.getElementById("retourAccueil").addEventListener("click", function() {
    window.location.href = 'home.html';
});

}
////////////////////////////////////////////////////////////

//Fonction pour mettr eà jour et afficher l'évolution des scores avec plotly
function nouveauCamembert() {
  //On remplace les anciennes valeurs par le nouveau score
   nouveauScore = [{
    values: [pointMarin, pointPirate],
    //On spécifie les titres des sections 
    labels: ['Marin', 'Pirate'],
    //On choisit la forme de notre "graphique"
    type: 'pie',
    marker:{
      colors: ['black', 'white']
  }
  }];
  layout = {
    height: 400,
    width: 500,
    //Fond transparent (normalement)
    plot_bgcolor: 'rgba(0,0,0,0)',
    paper_bgcolor: 'rgba(0,0,0,0)' 
  };

  //On utilise .react pour modifier le contenu+apparence du camembert et on spécifie l'élement html où il sera positionné
  Plotly.react('camembert', nouveauScore);
}

//On initialise des tableaux pour stocker la future évolution des variables pointMarin et pointPirate
tabMarin = [];
tabPirate = [];
//On crée aussi un tableau qui augmente de 1 à chaque tour pour suivre l'évolution des points selon le nombre de tours
tabX = []

//Fonction pour mettre à jour les courbes
function nouvelleCourbe(){
//On définit d'abord l'axe des x avec des valeurs correpondantes au numéro du tout de 1 au nombre de cases dans la grille pour être certain
if (tabX.length == 0) {
  var fin = tailleG * tailleG;

  for (var i = 1; i <= fin; i++) {
      tabX.push(i);
  }
}

//A chaque appel de la fonction, on ajoute la nouvelle valeur de points dans le tableau correspondant
tabMarin.push(pointMarin);
tabPirate.push(pointPirate);
//TEST
console.log(tabMarin);
console.log(tabPirate);
console.log(tabX);

//Courbes évolution des scores
nouveauMarin = {
  //On ajoute nos tableaux en tant que "variables" qui vont construire la courbe selon ses axes
  x: tabX,
  y: tabMarin,
  //On veut des courbes qui représente le score du "marin"
  mode: 'lines',
  name: 'Marin',
  line: {
    color: 'black' 
  }
};

nouveauPirate = {
  x: tabX,
  y: tabPirate,
  mode: 'lines',
  name: 'Pirate',
  line: {
    color: 'white' 
  }
};

donnes = [nouveauMarin, nouveauPirate];

layout = {
  xaxis: {
    title: 'Numéro du tour'
  },
  yaxis: {
    title: 'Nombre de points'
  },
  plot_bgcolor: 'rgba(0,0,0,0)',
  paper_bgcolor: 'rgba(0,0,0,0)' 
};

Plotly.newPlot('courbes', donnes, layout);
}
