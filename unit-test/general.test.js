const httpMocks = require('node-mocks-http');
const userServices = require("../api/services/users/userServices")
const userController = require("../api/controllers/users/userController")
const coinGeckoService = require("../api/services/coin_gecko/coinGeckoService")
const coinGeckoController = require("../api/controllers/coin_gecko/coinGeckoController")
const cryptoCurrencyUserService = require("../api/services/cryptoCurrencyUser/cryptoCurrencyUserService")
const cryptoCurrencyUserController = require("../api/controllers/cryptoCurrencyUser/cryptoCurrencyUserController")

const mockUserControllerLoginResponse = {
    result: true,
    message: 'You have logged in successfully',
    status: true,
    data: {
        token: false,
        userId: 1,
        email: 'john@gmail.com',
        firstname: 'john',
        lastname: 'doe'
    }
}

test('login', async () => {
    // mock
    const response = httpMocks.createResponse();
    const request = httpMocks.createRequest({
        method: 'POST',
        body: {
            email: "aiyash@gmail.com", password: "aiyash123"
        }
    });

    const mockUserLoginResults = jest.fn(async () => {
        return { result: mockUserControllerLoginResponse }
    })

    const mockUserLoign = jest.spyOn(userController, 'login')
    mockUserLoign.mockImplementation(mockUserLoginResults)
    await userServices.login(request, response);
    expect(mockUserLoginResults).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toEqual(200);
    expect(response._isEndCalled()).toBeTruthy();
});

const mockUserControllerRegisterResponse = {
    result: true,
    message: 'Registered Successfully',
    status: true,
    data: {
        userId: 19,
        email: 'john@gmail.com',
        firstname: 'john',
        lastname: 'doe'
    }
}

test('register', async () => {
    // mock
    const response = httpMocks.createResponse();
    const request = httpMocks.createRequest({
        method: 'POST',
        body: {
            "email": "john@gmail.com",
            "password": "john123",
            "firstname": "john",
            "lastname": "doe"
        }
    });

    const mockUserRegisterResults = jest.fn(async () => {
        return { result: mockUserControllerRegisterResponse }
    })

    const mockUserRegister = jest.spyOn(userController, 'register')
    mockUserRegister.mockImplementation(mockUserRegisterResults)
    await userServices.register(request, response);
    expect(mockUserRegisterResults).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toEqual(200);
    expect(response._isEndCalled()).toBeTruthy();
});

const mockUserControllerUpdateResponse = {
    result: true,
    message: 'Updated Successfully',
    status: true,
    data: {
        userId: 19,
        email: 'john@gmail.com',
        firstname: 'john',
        lastname: 'doe'
    }
}

test('update', async () => {
    // mock
    const response = httpMocks.createResponse();
    const request = httpMocks.createRequest({
        method: 'PUT',
        params: { id: 19 },
        body: {
            "email": "john@gmail.com",
            "password": "john123",
            "firstname": "john",
            "lastname": "doe"
        }
    });

    const mockUserUpdateResults = jest.fn(async () => {
        return { result: mockUserControllerUpdateResponse }
    })

    const mockUserUpdate = jest.spyOn(userController, 'update')
    mockUserUpdate.mockImplementation(mockUserUpdateResults)
    await userServices.update(request, response);
    expect(mockUserUpdateResults).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toEqual(200);
    expect(response._isEndCalled()).toBeTruthy();
});

const mockUserControllerDeleteResponse = { result: true, message: 'Deleted Successfully', status: true }

test('delete', async () => {
    // mock
    const response = httpMocks.createResponse();
    const request = httpMocks.createRequest({
        method: 'DELETE',
        params: { id: 35 },
    });

    const mockUserDeleteResults = jest.fn(async () => {
        return { result: mockUserControllerDeleteResponse }
    })

    const mockUserDelete = jest.spyOn(userController, 'delete')
    mockUserDelete.mockImplementation(mockUserDeleteResults)
    await userServices.deleteUser(request, response);
    expect(mockUserDeleteResults).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toEqual(200);
    expect(response._isEndCalled()).toBeTruthy();
});

const mockcoinGeckoControlleGetCoinsResponse = {
    "message": "Success",
    "status": true,
    "data": {
        "result": true,
        "message": "Success",
        "status": true,
        "data": [
            {
                "id": "bitcoin",
                "symbol": "btc",
                "name": "Bitcoin",
                "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
                "current_price": 44235,
                "market_cap": 865826882369,
                "market_cap_rank": 1,
                "fully_diluted_valuation": 928039513710,
                "total_volume": 13383367555,
                "high_24h": 44489,
                "low_24h": 43751,
                "price_change_24h": 376.64,
                "price_change_percentage_24h": 0.85877,
                "market_cap_change_24h": 6420886946,
                "market_cap_change_percentage_24h": 0.74713,
                "circulating_supply": 19592231,
                "total_supply": 21000000,
                "max_supply": 21000000,
                "ath": 69045,
                "ath_change_percentage": -35.74676,
                "ath_date": "2021-11-10T14:24:11.849Z",
                "atl": 67.81,
                "atl_change_percentage": 65324.20371,
                "atl_date": "2013-07-06T00:00:00.000Z",
                "roi": null,
                "last_updated": "2024-01-07T15:35:16.568Z"
            },
        ]
    }
}

test('getCoinGecko', async () => {
    // mock
    const response = httpMocks.createResponse();
    const request = httpMocks.createRequest({
        method: 'GET'
    });

    const mockCoinGeckoResults = jest.fn(async () => {
        return { result: mockcoinGeckoControlleGetCoinsResponse }
    })

    const mockGetCoinGecko = jest.spyOn(coinGeckoController, 'getCoins')
    mockGetCoinGecko.mockImplementation(mockCoinGeckoResults)
    await coinGeckoService.getAll(request, response);
    expect(mockCoinGeckoResults).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toEqual(200);
});

const mockcryptoCurrencyUserControllerCreateResponse = {
    result: true,
    message: 'Crypto currencies added',
    status: true,
}

test('cryptoCurrencyUserCreate', async () => {
    // mock
    const response = httpMocks.createResponse();
    const request = httpMocks.createRequest({
        method: 'POST',
        body: {
            currencies: "['bitcoin', 'ethereum', 'ripple', 'usd-coin', 'dogecoin', 'tron']"
        }
    });

    const mockCryptoUserControllerResults = jest.fn(async () => {
        return { result: mockcryptoCurrencyUserControllerCreateResponse }
    })

    const mockCryptoUserCreate = jest.spyOn(cryptoCurrencyUserController, 'create')
    mockCryptoUserCreate.mockImplementation(mockCryptoUserControllerResults)
    await cryptoCurrencyUserService.create(request, response);
    expect(mockCryptoUserControllerResults).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toEqual(200);
    expect(response._isEndCalled()).toBeTruthy();
});

const mockcryptoCurrencyUserControllerUpdateResponse = {
    result: true,
    message: 'Crypto currencies updated',
    status: true,
}

test('cryptoCurrencyUserUpdate', async () => {
    // mock
    const response = httpMocks.createResponse();
    const request = httpMocks.createRequest({
        method: 'PUT',
        params: {
            id: 2,
        }, // user id
        body: {
            currencies: "['bitcoin', 'ethereum', 'ripple', 'usd-coin', 'dogecoin', 'tron']"
        }
    });

    const mockCryptoUserControllerResults = jest.fn(async () => {
        return { result: mockcryptoCurrencyUserControllerUpdateResponse }
    })

    const mockCryptoUserUpdate = jest.spyOn(cryptoCurrencyUserController, 'update')
    mockCryptoUserUpdate.mockImplementation(mockCryptoUserControllerResults)
    await cryptoCurrencyUserService.update(request, response);
    expect(mockCryptoUserControllerResults).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toEqual(200);
    expect(response._isEndCalled()).toBeTruthy();
});

const mockcryptoCurrencyUserControllerDeleteResponse = {
    result: true,
    message: 'Crypto currencies Deleted',
    status: true,
}

test('cryptoCurrencyUserDelete', async () => {
    // mock
    const response = httpMocks.createResponse();
    const request = httpMocks.createRequest({
        method: 'DELETE',
        params: {
            id: 2,
        }, // crypto_currency_users id
    });

    const mockCryptoUserControllerResults = jest.fn(async () => {
        return { result: mockcryptoCurrencyUserControllerDeleteResponse }
    })

    const mockCryptoUserDelete = jest.spyOn(cryptoCurrencyUserController, 'delete')
    mockCryptoUserDelete.mockImplementation(mockCryptoUserControllerResults)
    await cryptoCurrencyUserService.delete(request, response);
    expect(mockCryptoUserControllerResults).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toEqual(200);
    expect(response._isEndCalled()).toBeTruthy();
});