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