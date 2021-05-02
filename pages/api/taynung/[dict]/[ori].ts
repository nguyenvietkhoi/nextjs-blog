import { NextApiRequest, NextApiResponse } from 'next' ;
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3')
const {open} = require('sqlite')

async function openDB (){
    return open({
        filename : './database/taynungdict.db',
        driver: sqlite3.Database
    })
}

export default async function getByOri(req: NextApiRequest, res: NextApiResponse) {
    const db = await openDB();
	var sql;
	var dict = req.query.dict;
	var cont = req.query.ori;
	if (dict == "1")
		sql = 'SELECT * FROM taynung WHERE ori = \'' + cont + '\'' ;
	else
		sql = 'SELECT * FROM taynung WHERE viet LIKE \'% ' + cont + ' %\' OR viet LIKE \'' + cont + ' %\' OR viet LIKE \'% ' + cont + '\' OR viet = \'' + cont + '\'' ;

	const rows = await db.all(sql);

	var gloss = [];
rows.forEach(function(word){
	var newgloss = {
		nom: (word.nom!=null) ? word.nom : "",
		ori: (word.ori!=null) ? word.ori : "",
		ety: (word.ety!=null) ? word.ety : "",
		viet: (word.viet!=null) ? word.viet : "",
		meanings : []
	};
	var means = word.meaning.split("—");
	means.forEach(function(mean){
		var explaination = mean.split("⇨");
		var examples = [];
		if (explaination.length > 1) {
			for (var i=1; i<explaination.length; i++) {
				var example = explaination[i].split(":");
				examples.push({oriEg: example[0], vietEg: example[1]});
			}
		}
		newgloss.meanings.push({mean: explaination[0], examples: examples});
	});
	gloss.push(newgloss);
});	
	res.status(200).json(gloss);	
}
