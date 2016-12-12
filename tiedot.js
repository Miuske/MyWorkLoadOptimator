var kaikkiKurssit = [];
var tunnit = 0;
var opintopisteet = 0;
	
function kurssi(kurssinnimi, opintopisteet, tyomaara) {
	this.b = opintopisteet;
	this.w = tyomaara;
	this.nimi = kurssinnimi
}

kaikkiKurssit.push(new kurssi("projekti", 20, 200));
kaikkiKurssit.push(new kurssi("algoritmit", 2, 40));
kaikkiKurssit.push(new kurssi("videot", 5, 20));
kaikkiKurssit.push(new kurssi("keikka", 1, 10));
kaikkiKurssit.push(new kurssi("ohjelmointi", 9, 90));
kaikkiKurssit.push(new kurssi("lopputyö", 17, 100));

var tulos = knapsack(kaikkiKurssit, 200);