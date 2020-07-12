'use strict'
const userForm = new UserForm();
userForm.loginFormCallback = (data) => ApiConnector.login(data, gettingLogin);

function gettingLogin(data) {
	if (data.success === true) {
		location.reload();
	} else {
		userForm.setLoginErrorMessage(data.data);
	};
};

userForm.registerFormCallback = (data) => ApiConnector.register(data, gettingRegister);

function gettingRegister (data) {
	if (data.success === true) {
		location.reload();
	} else {
		userForm.setRegisterErrorMessage(data.data);
	};
};
