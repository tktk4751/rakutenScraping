// const express = require("express");
// const axios = require("axios");
// const osmosis = require("osmosis");
// const { get } = require("https");

// //expressサーバーを起動
// const PORT = 5000;
// const Server = express();

// //スクレイピングアプリを作成

// const URL =
//   "https://www.amazon.co.jp/s?k=javascript&s=date-desc-rank&crid=39SZ6P57LN74X&qid=1676536834&sprefix=Javas%2Caps%2C376&ref=sr_st_date-desc-rank&ds=v1%3Ak05jrPPZ3WWpLf5AWEpMjvErMXYaiWINE6UtKjESgJc";

// //axiosを使用して全てのHTML要素を取得する
// axios(URL).then((response) => {
//   const getAllHTML = response.data;
//   const gah = osmosis(getAllHTML);
//   gah
//     .find(
//       ".a-section.a-spacing-small.puis-padding-left-small.puis-padding-right-small"
//     )
//     .set({
//       title: ".a-size-base-plus.a-color-base.a-text-normal",
//       price: ".a-price-whole",
//     })
//     .data(function (listing) {
//       console.log(listing.title, listing.price);
//     });
// });

// Server.listen(PORT, console.log("サーバーが起動しました"));

const express = require("express");
const axios = require("axios");
const osmosis = require("osmosis");
const { get } = require("https");

//expressサーバーを起動
const PORT = 5000;
const Server = express();

//スクレイピングアプリを作成

const URL =
  "https://search.rakuten.co.jp/search/mall/RUST+%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0/200162/";

const PAGE_LIMIT = 5; // 5ページまでスクレイピングを行う

const getPageUrl = (page) => `${URL}?p=${page}&used=0`;

for (let page = 1; page <= PAGE_LIMIT; page++) {
  const pageUrl = getPageUrl(page);
  //axiosを使用して全てのHTML要素を取得する
  axios(encodeURI(pageUrl)).then((response) => {
    //   const getAllHTML = response.data;
    //   const gah = osmosis(getAllHTML);
    //   gah
    osmosis

      .get(pageUrl)
      .find(".dui-card.searchresultitem")
      .set({
        title: ".title",
        price: ".price--OX_YW",
      })
      .data(function (listing) {
        console.log(listing.title, listing.price);
      })
      .error(console.log);
  });
}

Server.listen(PORT, console.log("サーバーが起動しました"));
