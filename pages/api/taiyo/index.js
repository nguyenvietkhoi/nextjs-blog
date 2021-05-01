import {taiyo} from "../../../data.js";

export default async (req, res) => {
	res.status(200).json(taiyo);
}