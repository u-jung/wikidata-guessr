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
	"Any item":{
		"de":"irgendetwas",
		"fr":"n'importe quoi"
	},
	"Parliament buildings":{
		"de":"Parlamentsgebäude",
		"fr":"Parlements"
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


