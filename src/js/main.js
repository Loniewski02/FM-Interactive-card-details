const cardName = document.querySelector('#cardholder-name');
const cardNumber = document.querySelector('#card-number');
const mDate = document.querySelector('.mDate');
const yDate = document.querySelector('.yDate');
const cvcNumber = document.querySelector('#cvc');
const allInputs = document.querySelectorAll('input');
const sendBtn = document.querySelector('.details__form-btn');
const closeBtn = document.querySelector('.details__complete-btn');
const completeInfo = document.querySelector('.details__complete');

const pCardName = document.querySelector('.bg__card-front-cardholder');
const pCardNumber = document.querySelector('.bg__card-front-number');
const pCardCvc = document.querySelector('.bg__card-back-cvc');
const spanMonth = document.querySelector('.bg__card-front-month');
const spanYear = document.querySelector('.bg__card-front-year');

const blankInfo = `can't be blank`;
const re = /^\d+$/;

const showError = (input, msg) => {
	const formBox = input.closest('.details__form-box');
	const errorMsg = formBox.querySelector('.error-info');
	formBox.classList.add('error');
	errorMsg.textContent = msg;
};

const clearError = input => {
	const formBox = input.closest('.details__form-box');
	formBox.classList.remove('error');
};

const checkForm = input => {
	input.forEach(el => {
		if (el.value === '') {
			showError(el, blankInfo);
		} else {
			clearError(el);
		}
	});
};

const checkLength = (input, min) => {
	if (input.value.length < min && input.value.length > 0) {
		showError(input, `${input.previousElementSibling.textContent} should consist of at least ${min} characters`);
	} else if (input.value.length === 0) {
		showError(input, blankInfo);
	}
};

const checkCardDate = (input, input2) => {
	if (!input.value === re.test(input.value)) {
		showError(input, `Wrong format, numbers only`);
	} else {
		if (Number(input.value) > 12) {
			showError(input, 'Only 12 months in a year');
		} else if (input.value.length < 1 || input2.value.length < 1) {
			showError(input, blankInfo);
		} else {
			clearError(input);
		}
	}
};

const checkCvc = input => {
	if (!input.value === re.test(input.value)) {
		showError(input, `Wrong format, numbers only`);
	} else {
		checkLength(cvcNumber, 3);
	}
};

const checkCardNumber = input => {
	if (!input.value === re.test(input.value)) {
		showError(input, `Wrong format, numbers only`);
	} else {
		if (input.value.length < 16 && input.value.length > 0) {
			showError(input, `card number should consist of 16 digits`);
		} else if (input.value.length < 1) {
			showError(input, blankInfo);
		} else {
			clearError(input);
		}
	}
};

const checkErrors = () => {
	const formBoxes = document.querySelectorAll('.details__form-box');

	let errorCount = 0;

	formBoxes.forEach(el => {
		if (el.classList.contains('error')) {
			errorCount++;
		}
	});

	if (errorCount === 0) {
		allInputs.forEach(el => {
			el.value = '';
			clearError(el);
			completeInfo.classList.add('visible');
		});
	}
};

const handleCardText = (input, paragraph) => {
	paragraph.textContent = input.value;
};

const handleCardNumber = (input, paragraph) => {
	const cardNumber = input.value;
	let formattedNumber = '';

	for (let i = 0; i < cardNumber.length; i++) {
		if (i % 4 === 0 && i > 0) {
			formattedNumber += ' ';
		}
		formattedNumber += cardNumber[i];
	}

	paragraph.textContent = formattedNumber;
};

sendBtn.addEventListener('click', e => {
	e.preventDefault();
	checkForm(allInputs);
	checkLength(cardName, 3);
	checkCardNumber(cardNumber);
	checkCardDate(mDate, yDate);
	checkCvc(cvcNumber);
	checkErrors();
});

closeBtn.addEventListener('click', () => {
	completeInfo.classList.remove('visible');
});

cardName.addEventListener('keyup', () => {
	handleCardText(cardName, pCardName);
});

cvcNumber.addEventListener('keyup', () => {
	handleCardText(cvcNumber, pCardCvc);
});

cardNumber.addEventListener('keyup', () => {
	handleCardNumber(cardNumber, pCardNumber);
});

mDate.addEventListener('keyup', () => {
	handleCardText(mDate, spanMonth);
});

yDate.addEventListener('keyup', () => {
	handleCardText(yDate, spanYear);
});
