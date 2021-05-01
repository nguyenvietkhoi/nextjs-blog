import sqlite3 from 'sqlite3';

module.exports = (req, res) => {
    const db = new sqlite3.Database('./taynungdict.db', (err) => {
      if (err) {
        console.log('Could not connect to database', err)
      } else {
        console.log('Connected to database')
      }
    })
		
	let sql = 'SELECT * FROM taynung WHERE ori = \'' + req.query.ori + '\'' ;

var gloss = [];
db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  

rows.forEach(function(word){
	var newgloss = {
		nom: (word.nom!=null) ? word.nom : "",
		ori: (word.ori!=null) ? word.ori : "",
		ety: (word.ety!=null) ? word.ety : "",
		viet: "chuối",
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
			
			
	res.json(gloss);		
});

db.close();
}