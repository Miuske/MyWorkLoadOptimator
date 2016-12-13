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
		$('.kaikki-kurssit').append('<div class="yksi-kurssi" id="'+kaikkiKurssit[kurssi].id+'"><div class="nimi">'+kaikkiKurssit[kurssi].nimi+'</div><div class="oparit">'+kaikkiKurssit[kurssi].b+'</div><div class="tyotunnit">'+kaikkiKurssit[kurssi].w+'</div><i id="muokkaa-painike" class="fa fa-pencil fa-lg" data-tila="valmis"></i> <i id="poista-painike" class="fa fa-trash-o fa-lg"></i></div>');
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
	
	if(nimi == '' || opt == '' || tunnit == ''){
		alert("Täytä kaikki tarvittavat kentät!");
	}else{
		kaikkiKurssit.push(new kurssi(nimi, opt, tunnit));
		$('#lisaaKurssiForm')[0].reset();
	}
	paivitaLista();
}

function muokkaaKurssia(){
	if($(this).attr("data-tila") == "valmis"){
		$(this).attr("data-tila", "muokkaa");
		var oparitArvo = $(this).siblings('.oparit').text();
		var tyotunnitArvo = $(this).siblings('.tyotunnit').text();
		$(this).siblings('.oparit').html('<input type="number" value="'+oparitArvo+'" />');
		$(this).siblings('.tyotunnit').html('<input type="number" value="'+tyotunnitArvo+'" />');
		$(this).addClass("fa-check");
		$(this).removeClass("fa-pencil");
	}else{
		var oparitArvo = $(this).siblings('.oparit').find('input').val();
		var tyotunnitArvo = $(this).siblings('.tyotunnit').find('input').val();
		if(oparitArvo == '' || tyotunnitArvo == ''){
			alert("Täytä kaikki tarvittavat kentät!");
		}else{
			$(this).attr("data-tila", "valmis");
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
			$(this).addClass("fa-pencil");
			$(this).removeClass("fa-check");
		}
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