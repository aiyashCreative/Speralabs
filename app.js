require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());

const allUserRouteModule = require("./api/routes/users");
const allUserRoutes = allUserRouteModule.allUserSideRoute;

const allCryptoCurrencyUserRouteModule = require("./api/routes/cryptoCurrencyUser");
const allCryptoCurrencyUserRoutes = allCryptoCurrencyUserRouteModule.allCryptoCurrencyUserRoute;

const coinGeckoRoute = require("./api/routes/coinGecko/coinGeckoRoutes");

const PORT = process.env.PORT || 3001;

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    })
);

// users
allUserRoutes.map((routeObj) => {
    app.use(`${routeObj.startPath}`, routeObj.file());
});

// users crypto currency
allCryptoCurrencyUserRoutes.map((routeObj) => {
    app.use(`${routeObj.startPath}`, routeObj.file());
});

// Authenticate Database Connection
require("./sequalize/authenticate");


// migration
sequelize.sync().then(() => {
    console.log('tables created successfully!');
    coinGeckoRoute.getCoinGecko()

    setInterval(() => {
        coinGeckoRoute.checkPriceAndUpdate()
    }, 300000) // it would be triggered in every 5 mins
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

app.listen(PORT, () => {
    console.log("Server is up and running at port ---- -", PORT);
});