import sqlite3 from 'sqlite3';

module.exports = (req, res) => {

	 res.status(200).json({ name: req.query.ori })	

}