var kaikkiKurssit = [];

function kurssi(kurssinnimi, opintopisteet, tyomaara) {
	this.b = opintopisteet;
	this.w = tyomaara;
	this.nimi = kurssinnimi;
	this.id = kurssinnimi.replace(/\s/g, '');
}

kaikkiKurssit.push(new kurssi("projekti", 20, 200));
kaikkiKurssit.push(new kurssi("algoritmit", 2, 40));
kaikkiKurssit.push(new kurssi("videot", 5, 20));
kaikkiKurssit.push(new kurssi("keikka", 1, 10));
kaikkiKurssit.push(new kurssi("ohjelmointi", 9, 90));
kaikkiKurssit.push(new kurssi("lopputyö", 17, 100));

function paivitaLista(){
	$('.kaikki-kurssit').html("");
	for(var kurssi in kaikkiKurssit){
		$('.kaikki-kurssit').append('<div class="yksi-kurssi" id="'+kaikkiKurssit[kurssi].id+'"><div>'+kaikkiKurssit[kurssi].nimi+'</div><div class="oparit">'+kaikkiKurssit[kurssi].b+'</div><div class="tyotunnit">'+kaikkiKurssit[kurssi].w+'</div><button type="button" class="muokkaa-painike" data-tila="valmis">Muokkaa</button><button type="button" class="poista-painike">Poista</button></div>');
	}
}

function tulostaOptimi(){
	var annetutTunnit = $('.annettu-tuntimaara').val();
	if(annetutTunnit){
		var tulos = knapsack(kaikkiKurssit, annetutTunnit);
	} else {
		var tulos = knapsack(kaikkiKurssit, 200);
	}
	console.log(tulos);
	var tunnitYhteensa = 0;
	$('.lopputulos').html('');
	for(var i = 0; i < tulos['set'].length; i++){
		for(var kyseinenkurssi in kaikkiKurssit){
			if(kaikkiKurssit[kyseinenkurssi].b == tulos['set'][i].b){
				$('.lopputulos').append('<span>'+kaikkiKurssit[kyseinenkurssi].nimi+': </span>');
			}
		}
		$('.lopputulos').append('<span>'+tulos['set'][i].w+' tuntia, '+tulos['set'][i].b+' opintopistettä</span><br/>');
		tunnitYhteensa += tulos['set'][i].w;
	}
	$('.lopputulos').append('<br/><p>Yhteensä: '+tunnitYhteensa+' tuntia, '+tulos.maxValue+' opintopistettä</p>');
}

function lisaaUusiKurssi(){
	var uusikurssi = document.getElementById("lisaakurssi").value;
	var uusiopt = document.getElementById("lisaaopt").value;
	var uusitunnit = document.getElementById("lisaatunnit").value;
	
	console.log("UUDEN KURSSIN NIMI: " + uusikurssi);
	console.log("UUDEN KURSSIN OPT: " + uusiopt);
	console.log("UUDEN KURSSIN TUNNIT: " + uusitunnit);
	
	kaikkiKurssit.push(new kurssi(uusikurssi, uusiopt, uusitunnit));
	console.log(kaikkiKurssit);

	paivitaLista();

}
