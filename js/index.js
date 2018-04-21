const get = function(id) {
	return document.getElementById(id);
};

let equation = [];
let entry = [];
let result = 0;
let decimal = null;
const operatorKeys = document.getElementsByClassName('key operator');
const numKeys = document.getElementsByClassName('key number');
let output = get('output');
let formula = get('formula');

function clearIt(what) {
	if (what === 'all') {
		equation = [];
		output.textContent = 0;
		formula.textContent = '•';
		result = 0;
	}
	if (what === 'entry') {
		output.textContent = formula.length === 0 ? 0 : result;
		formula.textContent = equation.length === 0 ? 'waiting...' : equation;
	}
	entry = [];
	decimal = undefined;
}

//set up the number keys (including decimal)

for (let i in numKeys) {
	//let key = numKeys[i];

	numKeys[i].onclick = function() {
		console.log('key ' + this.value);
		if (this.id === 'decimal' && decimal === true) {
			return;
		}

		if (this.value === '.' && decimal === undefined) {
			decimal = true;
		}

		if (this.value === 0 && equation.length === 0) return;
		if (this.value === 0 && entry.length === 0) return;
		if (this.value === '.' && entry.length === 0) entry.push(0);

		entry.push(this.value);
		output.textContent = entry.join('');
		formula.textContent = equation.join(' ') + ' ' + entry.join('');
	};
}
// set up the operator (+ - / *) keys

for (let i in operatorKeys) {
	//find all the operator keys

	let key = operatorKeys[i];

	operatorKeys[i].onclick = function() {
		// and assign their onclick Fx

		if (entry.length - 1 === '.') {
			//if the last entry was a '.',
			if (this.value === '.')
				return; // and this value is also a '.', just 'return' and do nothing
			else entry.pop(); //get rid of the unneeded '.'
		}
		if (entry.length > 0) {
			equation.push(Number(entry.join('')));
		} else if (entry.length === 0) {
			if (equation.length % 2 === 0) equation.pop();
			else if (equation.length < 2)
				//determines
				//if prev. entry was another operator, and if so, replaces it with this operator
				return;
		}

		equation.push(this.value);
		formula.textContent = equation.join(' ');
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
	if (entry.length - 1 === '.') {
		entry.pop();
	} else if (equation.length < 2) {
		equation.push(entry.join(''));
		output.textContent = 'error';
		formula.textContent = equation.join(' '); //show user the faulty formula
		equation = [];
		entry = [];
		result = 0;
		decimal = null;
		return;
	}
	if (entry.length === 1) equation.push(Number(entry));
	if (entry.length > 1) equation.push(Number(entry.join('')));

	console.log('about to doMath on ' + equation);
	//	result = doMath(equation);

	let final = equation.join(' ');

	result = eval(final);
	//eval(final);
	//return;
	output.textContent = result;
	formula.textContent = equation.join(' ') + ' = ' + result;
	equation = [];
	entry = [];
	decimal = null;
	result = 0;
}

// helper functions

function add(x, y) {
	return x + y;
}

function sub(x, y) {
	return x - y;
}

function mult(x, y) {
	return x * y;
}

function div(x, y) {
	return x / y;
}

// let's do some math with that equation...

function doMath(eq) {
	// const nums = /\d*/g;
	// const ops = /[+-/x]/g;
	// let numArr = [];
	// let opsArr = [];
	// eq.map(x => {
	// 	if (ops.test(x) !== true) numArr.push(x);
	// 	else opsArr.push(x);
	// });
	//
	// function reduce(firstNum, operator, secondNum) {
	// 	let answer;
	// 	if (operator === 'x') answer = mult(firstNum, secondNum);
	// 	if (operator === '/') answer = div(firstNum, secondNum);
	// 	if (operator === '+') answer = add(firstNum, secondNum);
	// 	if (operator === '-') answer = sub(firstNum, secondNum);
	// 	return Math.round(answer * 100) / 100;
	// }
	// result += reduce(numArr[0], opsArr[0], numArr[1]);
	//
	// while (numArr.length > 1) {
	// 	result += reduce(numArr[0], opsArr[0], numArr[1]);
	// 	numArr.shift();
	// 	opsArr.shift();
	// }

	//console.log(numArr);
	//console.log(opsArr);

	let answer = String(equation.join(' ') + ' =');

	console.log(eval(answer));
	//return Math.round(result * 100) / 100;
	//let answer = equation.join(' ') + ' =';
	return eval(answer);
}

// let kw = get('kwLink');
// kw.onclick = function(){
// 	get('keys').style.display = none;
// 	let p = get('player');
// 	p.style.display= block;
// 	//get('kwPlayer').src = "https://www.youtube.com/embed/WvIRsDHFiis?rel=0";
// }
