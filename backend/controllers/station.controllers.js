const {Op} = require("sequelize");
const {data} = require("../config/dataProvince");
const {Station} = require("../models");

const getAllProvince = async (req, res) => {
	res.status(201).send(data);
};
const createStation = async (req, res) => {
	const {name, address, province} = req.body;
	console.log("📦 Dữ liệu nhận:", req.body);
	try {
		const newStation = await Station.create({name, address, province});
		res.status(200).send(newStation);
	} catch (error) {
		console.log("Station body:", req.body);
		res.status(500).send(error);
	}
};

const getAllStation = async (req, res) => {
	const {name} = req.query;
	try {
		if (name) {
			const stationList = await Station.findAll({
				where: {
					name: {
						[Op.like]: `%${name}%`,
					},
				},
			});
			res.status(200).send(stationList);
		} else {
			const stationList = await Station.findAll();
			res.status(200).send(stationList);
		}
	} catch (error) {
		res.status(500).send(error);
	}
};

const getDetailStation = async (req, res) => {
	const {id} = req.params;

	try {
		const detailStation = await Station.findOne({
			where: {
				id,
			},
		});
		res.status(200).send(detailStation);
	} catch (error) {
		res.status(500).send(error);
	}
};
const updateStation = async (req, res) => {
	const {id} = req.params;
	const {name, address, province} = req.body;
	try {
		const detailStation = await Station.findOne({
			where: {
				id,
			},
		});
		detailStation.name = name;
		detailStation.address = address;
		detailStation.province = province;
		await detailStation.save();
		res.status(200).send(detailStation);
	} catch (error) {
		res.status(500).send(error);
	}
};
const deleteStation = async (req, res) => {
	const {id} = req.params;
	try {
		await Station.destroy({
			where: {
				id,
			},
		});
		res.status(200).send("Deleted Station Successfully!");
	} catch (error) {
		res.status(500).send(error);
	}
};
module.exports = {
	createStation,
	getAllStation,
	getDetailStation,
	updateStation,
	deleteStation,
	getAllProvince,
};
