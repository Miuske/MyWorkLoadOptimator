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
<<<<<<< HEAD
		$('.kaikki-kurssit').append('<div class="yksi-kurssi" id="'+kaikkiKurssit[kurssi].id+'"><div>'+kaikkiKurssit[kurssi].nimi+'</div><div class="oparit">'+kaikkiKurssit[kurssi].b+'</div><div class="tyotunnit">'+kaikkiKurssit[kurssi].w+'</div><button type="button" class="muokkaa-painike" data-tila="valmis">Muokkaa</button> <i class="poista-painike fa fa-trash-o fa-lg"></i></div>');
=======
		$('.kaikki-kurssit').append('<div class="yksi-kurssi" id="'+kaikkiKurssit[kurssi].id+'"><div class="nimi">'+kaikkiKurssit[kurssi].nimi+'</div><div class="oparit">'+kaikkiKurssit[kurssi].b+'</div><div class="tyotunnit">'+kaikkiKurssit[kurssi].w+'</div><button type="button" id="muokkaa-painike" data-tila="valmis">Muokkaa</button><button type="button" id="poista-painike">Poista</button></div>');
>>>>>>> origin/master
	}
}

function paivitaOptimi(){
	$('.optimoinnin-tulos').addClass('esilla');
	var annetutTunnit = $('.annettu-tuntimaara').val();
	if(annetutTunnit){
		var tulos = knapsack(kaikkiKurssit, annetutTunnit);
	} else {
		var tulos = knapsack(kaikkiKurssit, 200);
	}

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

function lisaaKurssi(){
	var nimi = $('#lisaakurssi').val();
	var opt = parseInt($('#lisaaopt').val());
	var tunnit = parseInt($('#lisaatunnit').val());
	
<<<<<<< HEAD
	if(uusikurssi == '' || uusiopt == '' || uusitunnit == ''){
		alert("Täytä kaikki tarvittavat kentät!");
	}else{
		kaikkiKurssit.push(new kurssi(uusikurssi, uusiopt, uusitunnit));
		console.log(kaikkiKurssit);
	}
=======
	kaikkiKurssit.push(new kurssi(nimi, opt, tunnit));
>>>>>>> origin/master

	$('#lisaaKurssiForm')[0].reset();
	
	paivitaLista();
}

function muokkaaKurssia(){
	if($(this).attr("data-tila") == "valmis"){
		$(this).attr("data-tila", "muokkaa");
		var oparitArvo = $(this).siblings('.oparit').text();
		var tyotunnitArvo = $(this).siblings('.tyotunnit').text();
		$(this).siblings('.oparit').html('<input type="number" value="'+oparitArvo+'" />');
		$(this).siblings('.tyotunnit').html('<input type="number" value="'+tyotunnitArvo+'" />');
		$(this).text("Valmis");
	} else {
		$(this).attr("data-tila", "valmis");
		var oparitArvo = $(this).siblings('.oparit').find('input').val();
		var tyotunnitArvo = $(this).siblings('.tyotunnit').find('input').val();
		$(this).siblings('.oparit').html(oparitArvo);
		$(this).siblings('.tyotunnit').html(tyotunnitArvo);
		var muokattavaId = $(this).parents('.yksi-kurssi').attr('id');
		for(var i = 0; i < kaikkiKurssit.length; i++){
			if(kaikkiKurssit[i].id == muokattavaId){
				kaikkiKurssit[i].b = parseInt(oparitArvo);
				kaikkiKurssit[i].w = parseInt(tyotunnitArvo);
			}
		}
		for(var kurssit in kaikkiKurssit){
		console.log(kaikkiKurssit[kurssit]);
		}
		$(this).text("Muokkaa");
	}
}

function poistaKurssi(){
	$(this).parents('.yksi-kurssi').remove();
	var poistettavaId = $(this).parents('.yksi-kurssi').attr('id');
	for(var i = 0; i < kaikkiKurssit.length; i++){
		if(kaikkiKurssit[i].id == poistettavaId){
			kaikkiKurssit.splice(i, 1);
		}
	}
}
