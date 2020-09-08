var fs = require('fs');
const path = require('path');

class DataFrame {
	data;
	csvPath;
	isTranspose;
	headers;

	constructor(data, csvPath, headers, isTranspose) {
		this.data = data;
		this.csvPath = csvPath;
		this.isTranspose = isTranspose;
		this.headers = headers;
	}

	read_csv() {
		var data = String(
			fs.readFileSync(
				path.resolve(__dirname, String('./datasets/' + this.csvPath))
			)
		).split('\n');

		const headers = data[0].split(',');

		const dataset = [];

		for (var elemIndex = 0; elemIndex < data.length; elemIndex++) {
			let element = data[elemIndex];
			element = String(element).split(',').map(Number);
			dataset.push(element);
		}

		this.headers = headers;
		this.data = dataset.slice(1, dataset.length);
	}

	transpose() {}

	drop() {}
}

var data = new DataFrame();
data.csvPath = 'satGPA.csv';
data.read_csv();
console.log(data.data);
