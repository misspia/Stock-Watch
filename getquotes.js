function StockPriceTicker(CNames) {
    var Symbol = "", CompName = "", Price = "", ChnageInPrice = "", PercentChnageInPrice = "";
    var flickerAPI = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22" + CNames + "%22)&env=store://datatables.org/alltableswithkeys";
    var StockTickerHTML = "";

    var StockTickerXML = $.get(flickerAPI, function(xml) {
        $(xml).find("quote").each(function () {
            Symbol = $(this).attr("symbol");
            $(this).find("Name").each(function () {
                CompName = $(this).text();
            });
            $(this).find("StockExchange").each(function () {
                Exchange = $(this).text();
            });
            $(this).find("LastTradePriceOnly").each(function () {
                Price = $(this).text();
            });
            $(this).find("Change").each(function () {
                ChnageInPrice = $(this).text();
            });
            $(this).find("PercentChange").each(function () {
                PercentChnageInPrice = $(this).text();
            });

            var PriceClass = "GreenText", PriceIcon="up_green";
            if(parseFloat(ChnageInPrice) < 0) { PriceClass = "RedText"; PriceIcon="down_red"; }
            StockTickerHTML = StockTickerHTML + "<div class='row'><span class='" + PriceClass + "'>";
            StockTickerHTML = StockTickerHTML + "<div class='six columns company-view'>" + CompName + "<br><span>" + Exchange + ": " + Symbol + "</span></div> ";

            StockTickerHTML = StockTickerHTML + "<div class='six columns allprice-view'><div class='row'><div class='twelve columns price-view'>" + parseFloat(Price).toFixed(2) + " </div></div>";
            StockTickerHTML = StockTickerHTML + "<div class='row'><div class='twelve columns allpchange-view'><span class='" + PriceIcon + "'></span>" + "<span class=pchange-view>" + parseFloat(Math.abs(ChnageInPrice)).toFixed(2) + " (";
            StockTickerHTML = StockTickerHTML + parseFloat( Math.abs(PercentChnageInPrice.split('%')[0])).toFixed(2) + "%)</span></div></div></div></div>";


             $("#watchtable").find('tbody');
            $("tbody").append("<tr><td>"+ Symbol +"</td><td>" + CompName + "</td><td>" + Price + "</td></td><td>" + "<span class='" + PriceIcon + "'></span>" + parseFloat(Math.abs(PercentChnageInPrice.split('%')[0])).toFixed(2) + "%</td></tr>");
        });

        $("#dvStockTicker").html(StockTickerHTML);
        /*$("#dvStockTicker").jStockTicker({interval: 30, speed: 1});*/
    });
}

/*---------------------------------------------------------------------
            Submit Input
-----------------------------------------------------------------------*/
function getQuote(){
  var symbol = $("#symbol").val().toUpperCase();
  if (symbol === "") return;
  StockPriceTicker(symbol);
  //var CNames = "^FTSE,MSFT,MSFT.SW,MSFT.MX,MSFT34.SA,MSFT.BA";
}
$(document).ready(function(){
  var options = {

  url: "companies.json",

  getValue: "Name",

  list: {
    match: {
      enabled: true
    }
  },

  theme: "square"
};

  $("#symbol").easyAutocomplete(options);
});


//http://jsfiddle.net/chufol/Q3z9U/
//http://stackoverflow.com/questions/14795726/getting-data-from-yahoo-finance
//https://play.google.com/store/apps/details?id=com.teletrader.android


//https://jqueryui.com/autocomplete/
