require("dotenv").config();

const fs = require("fs");
var request = require("request");
var jar = request.jar();

const loginUrl = "https://my.electrickiwi.co.nz/login";
const hopUrl = "https://my.electrickiwi.co.nz/account/update-hour-of-power";

const hopSettings = {
  "1200": { value: 1, timeStr: "12:00 AM" },
  "1230": { value: 2, timeStr: "12:30 AM" },
  "0100": { value: 3, timeStr: "1:00 AM" },
  "0130": { value: 4, timeStr: "1:30 AM" },
  "0200": { value: 5, timeStr: "2:00 AM" },
  "0230": { value: 6, timeStr: "2:30 AM" },
  "0300": { value: 7, timeStr: "3:00 AM" },
  "0330": { value: 8, timeStr: "3:30 AM" },
  "0400": { value: 9, timeStr: "4:00 AM" },
  "0430": { value: 10, timeStr: "4:30 AM" },
  "0500": { value: 11, timeStr: "5:00 AM" },
  "0530": { value: 12, timeStr: "5:30 AM" },
  "0600": { value: 13, timeStr: "6:00 AM" },
  "0900": { value: 19, timeStr: "9:00 AM" },
  "0930": { value: 20, timeStr: "9:30 AM" },
  "1000": { value: 21, timeStr: "10:00 AM" },
  "1030": { value: 22, timeStr: "10:30 AM" },
  "1100": { value: 23, timeStr: "11:00 AM" },
  "1130": { value: 24, timeStr: "11:30 AM" },
  "1200": { value: 25, timeStr: "12:00 PM" },
  "1230": { value: 26, timeStr: "12:30 PM" },
  "1300": { value: 27, timeStr: "1:00 PM" },
  "1330": { value: 28, timeStr: "1:30 PM" },
  "1400": { value: 29, timeStr: "2:00 PM" },
  "1430": { value: 30, timeStr: "2:30 PM" },
  "1500": { value: 31, timeStr: "3:00 PM" },
  "1530": { value: 32, timeStr: "3:30 PM" },
  "1600": { value: 33, timeStr: "4:00 PM" },
  "2100": { value: 43, timeStr: "9:00 PM" },
  "2130": { value: 44, timeStr: "9:30 PM" },
  "2200": { value: 45, timeStr: "10:00 PM" },
  "2230": { value: 46, timeStr: "10:30 PM" },
  "2300": { value: 47, timeStr: "11:00 PM" },
};

const login = (target) => {
  request.post(
    {
      url: loginUrl,
      form: {
        LoginForm: {
          username: process.env.EMAIL,
          password: process.env.PASSWORD,
        },
      },
      followAllRedirects: true,
      jar,
    },
    function (error, response, body) {
      // fs.writeFileSync("src/res.html", JSON.stringify(response));
      // if (!error && response.statusCode == 200) {
      // }
      if (body.indexOf("You're connected at") !== -1) {
        // console.log("login success");
        doChangeHop(target);
      } else {
        console.log(`Can't login`);
        process.exit(1);
      }
    }
  );
};

const doChangeHop = (target) => {
  request.post(
    {
      url: hopUrl,
      form: {
        KiwikPayment: {
          free_hour_consumption: hopSettings[target].value,
        },
      },
      followAllRedirects: true,
      jar,
    },
    function (error, response, body) {
      // fs.writeFileSync("src/res.html", JSON.stringify(body));
      if (body.indexOf(`<strong>${hopSettings[target].timeStr}`) !== -1) {
        console.log("HOP change success");
      } else {
        console.log(`Can't login`);
        process.exit(1);
      }
    }
  );
};

const changeHop = (target) => {
  login(target);
};

changeHop("1600");
