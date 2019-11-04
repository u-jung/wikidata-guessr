//
// Internationalization
//

terms={
	"Make Your Guess":{
		"de":"Wo wurde das Bild aufgenommen?",
		"fr":"Où est-ce que la photo a été prise?"
	},
	"Start new game...":{
		"de":"Neues Spiel beginnen...",
		"fr":"Commencer un nouveau jeux"
	},
	"Congrats!":{
		"de":"Glückwunsch!",
		"fr":"Félicitations!"
	},
	"Your final score was:":{
		"de":"Ihre Punktzahl:",
		"fr":"Votre score final:"
	},
	"Play Again?":{
		"de":"Noch ein Spiel?",
		"fr":"Une nouvelle ronde?"
	},
	"Any item":{
		"de":"irgendetwas",
		"fr":"n'importe quoi"
	},
	"Parliament buildings":{
		"de":"Parlamentsgebäude",
		"fr":"Parlements"
	},
	"Cities":{
		"de":"Städte",
		"fr":"Villes"
	},
	"Roller coasters":{
		"de":"Achterbahnen",
		"fr":"Montanges russes"
	},
	"Libraries":{
		"de":"Bibliotheken",
		"fr":"Bibliothèques"
	},
	"Archives":{
		"de":"Archive",
		"fr":"Archives"
	},
	"Islands":{
		"de":"Inseln",
		"fr":"Îles"
	},
	"Germany":{
		"de":"Deutschland",
		"fr":"Allemagne"
	}
}

function __(term){
	lang=$('#lang').text();
	if (term in terms){
		if (lang in terms[term]){
			return terms[term][lang];
		}
		else{
			return term;
		}
		
	}
	else{
		return term;
	}
}


