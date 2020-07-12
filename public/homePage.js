'use strict'
// Выход из личного кабинета
const logoutButton = new LogoutButton;
logoutButton.action = () => ApiConnector.logout(() => location.reload());

// Получение информации о пользователе
ApiConnector.current(showCurrentUser);
function showCurrentUser(data) {
	if (data.success === true) {
		ProfileWidget.showProfile(data.data);
	};
};

// Получение текущих курсов валюты
const ratesBoard = new RatesBoard;

function getExchangeRate() {
	ApiConnector.getStocks(exchangeRate);
	function exchangeRate(data) {
		if (data.success === true) {
			ratesBoard.clearTable();
			ratesBoard.fillTable(data.data);
		};
	};
};
setInterval(getExchangeRate(), 60000);

// Операции с деньгами
const moneyManager = new MoneyManager;

// Пополнение баланса
moneyManager.addMoneyCallback = (data) => ApiConnector.addMoney(data, addingMoney);
function addingMoney (data) {
	if (data.success === true) {
		ProfileWidget.showProfile(data.data);
		moneyManager.setMessage(0, 'Сумма успешно добавлена на ваш счет');
	} else {
		moneyManager.setMessage(1, 'Введите сумму и выберите валюту');
	};
};

// Конвертирование валюты
moneyManager.conversionMoneyCallback = (data) => ApiConnector.convertMoney(data, convertingMoney);
function convertingMoney(data) {
	if (data.success === true) {
		ProfileWidget.showProfile(data.data);
		moneyManager.setMessage(0, 'Сумма успешно конвертирована');
	} else {
		moneyManager.setMessage(1, 'Для конвертации валют введите сумму и выберите валюты, на вашем счету должно быть достаточно средств');
	};
};

// Перевод валюты
moneyManager.sendMoneyCallback = (data) => ApiConnector.transferMoney(data, transferringMoney);
function transferringMoney(data) {
	if (data.success === true) {
		ProfileWidget.showProfile(data.data);
		moneyManager.setMessage(0, 'Деньги успешно переведены');
	} else {
		moneyManager.setMessage(1, 'Для перевода денег выберете получателя,введите сумму и выберите валюту, на вашем счету должно быть достаточно средств');
	};
};

// Работа с избранным
const favoritesWidget = new FavoritesWidget;
function getFavorite() {
	ApiConnector.getFavorites(gettingFavorites);
	function gettingFavorites(data) {
		if (data.success === true) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(data.data);
			moneyManager.updateUsersList(data.data);
		};
	};
};
getFavorite();

// Добавления пользователя в список избранных
favoritesWidget.addUserCallback = (data) => ApiConnector.addUserToFavorites(data, addingFavorite);
function addingFavorite(data) {
	if (data.success === true) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(data.data);
		moneyManager.updateUsersList(data.data);
		favoritesWidget.setMessage(0, 'Пользователь успешно добавлен в избранные');
	} else {
		favoritesWidget.setMessage(1, 'Введите имя пользователя и его Id, чтобы добавить его в избранные');
	};
};

// Удаление пользователя из избранного
favoritesWidget.removeUserCallback = (data) => ApiConnector.removeUserFromFavorites(data, deleteFavorite);
function deleteFavorite(data) {
	if (data.success === true) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(data.data);
		moneyManager.updateUsersList(data.data);
		favoritesWidget.setMessage(0, 'Пользователь успешно удален из избранных');
	};
};

