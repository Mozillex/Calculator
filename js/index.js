// jshint esversion: 6

const get = function (id) {
	return document.getElementById(id);
};

let equation = [];
let entry = [];
let result = 0;
let decimal = null;

const operatorKeys = document.getElementsByClassName("key operator");
const numKeys = document.getElementsByClassName("key number");
let output = get("output");
let formula = get("formula");

function clearIt(what) {
	if (what === "all") {
		equation = [];
		output.textContent = 0;
		formula.textContent = "I'm counting on you";
		result = 0;
	}
	if (what === "entry") {
		output.textContent = formula.length === 0 ? 0 : result;
		formula.textContent = equation.length === 0 ? "waiting..." : equation;
	}
	entry = [];
	decimal = undefined;
}

//set up the number keys (including decimal)

for (let i in numKeys) {
	numKeys[i].onclick = function () {
		if (this.value === "." && decimal === true) {
			return;
		}

		if (this.value === "." && decimal === null) {
			if (entry.length === 0) entry.push(0);
			decimal = true;
		}

		if (this.value === 0 && equation.length === 0) return;
		if (this.value === 0 && entry.length === 0) return;
		if (this.value === "." && entry.length === 0) entry.push(0);

		entry.push(this.value);
		output.textContent = entry.join("").slice(0, 10);
		formula.textContent = (equation.join(" ") + " " + entry.join("")).slice(0, 60);
	};
}
// set up the operator (+ - / *) keys

for (let i in operatorKeys) {
	operatorKeys[i].onclick = function () {
		if (entry.length - 1 === ".") {
			entry.pop(); //if the last entry was a '.' get rid of it
		}
		if (entry.length > 0) {
			equation.push(Number(entry.join("")));
		} else if (entry.length === 0) {
			if (equation.length % 2 === 0) equation.pop();
			else if (equation.length < 2)
				// determines if prev. entry was another operator, and if so, replaces it with this operator
				return;
		}

		equation.push(this.value);
		formula.textContent = equation.join(" ").slice(0, 60);
		entry = [];
		decimal = null;
	};
}

//set up the '=' key

function equals() {
	let lastEntry = equation[equation.length - 1];
	let isAnOperator = /[+-/*]/;

	if (entry.length === 0 && isAnOperator.test(lastEntry) === true) {
		equation.pop();
	}
	if (entry.length - 1 === ".") {
		entry.pop();
	} else if (equation.length < 2) {
		equation.push(entry.join(""));
		output.textContent = "error";
		formula.textContent = equation.join(" "); //show user the faulty formula

		equation = [];
		entry = [];
		result = 0;
		decimal = null;
		return;
	}
	if (entry.length === 1) equation.push(Number(entry));
	if (entry.length > 1) equation.push(Number(entry.join("")));

	let final = equation.join(" ").toString();
	result = eval(final);

	output.textContent = result.toString().slice(0, 10);
	formula.textContent = (equation.join(" ") + " = " + result)
		.toString()
		.slice(0, 50);
	equation = [];
	entry = [];
	decimal = null;
	result = 0;
}
