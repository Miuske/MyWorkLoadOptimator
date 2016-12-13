var kaikkiKurssit = [];

function kurssi(kurssinnimi, opintopisteet, tyomaara) {
	this.b = opintopisteet;
	this.w = tyomaara;
	this.nimi = kurssinnimi;
	this.id = kurssinnimi.replace(/\s/g, '');
}

kaikkiKurssit.push(new kurssi("Projekti", 20, 200));
kaikkiKurssit.push(new kurssi("Algoritmit", 2, 40));
kaikkiKurssit.push(new kurssi("Videot", 5, 20));
kaikkiKurssit.push(new kurssi("Keikka", 1, 10));
kaikkiKurssit.push(new kurssi("Ohjelmointi", 9, 90));
kaikkiKurssit.push(new kurssi("Lopputyö", 17, 100));

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
		$('.lopputulos').append('<span><b>'+tulos['set'][i].nimi+': </b>'+tulos['set'][i].w+' tuntia, '+tulos['set'][i].b+' opintopistettä</span><br/>');
		tunnitYhteensa += tulos['set'][i].w;
	}
	$('.lopputulos').append('<br/><p class="highlight"><b>Yhteensä: </b>'+tunnitYhteensa+' tuntia, '+tulos.maxValue+' opintopistettä</p>');
}

function lisaaKurssi(){
	$('#lisaaKurssiForm .varoitus').text('');
	$('#lisaaKurssiForm input').removeClass('varoitus');
	var nimi = $('#lisaakurssi').val();
	var opt = parseInt($('#lisaaopt').val());
	var tunnit = parseInt($('#lisaatunnit').val());
		
	if(nimi == '' || isNaN(opt)  || isNaN(tunnit) ){
		$('#lisaaKurssiForm .varoitus').text('Täytä kaikki kentät');
		$('#lisaaKurssiForm input').each(function(){
			if($(this).val() == ''){
				$(this).addClass('varoitus');
			}
		});	
	}else if (opt < 1 || tunnit < 1){
		$('#lisaaKurssiForm .varoitus').text('Arvo ei voi olla alle 1');
		$('#lisaaKurssiForm input[type="number"]').each(function(){
			if($(this).val() < 1){
				$(this).addClass('varoitus');
			}
		});
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
		$(this).siblings('.oparit').html('<input class="form-control muokkaainput" type="number" min="1" value="'+oparitArvo+'" />');
		$(this).siblings('.tyotunnit').html('<input class="form-control muokkaainput" type="number" min="1" value="'+tyotunnitArvo+'" />');
		$(this).addClass("fa-check");
		$(this).removeClass("fa-pencil");
	}else{
		$(this).parents('.yksi-kurssi').find('span').remove();
		$('.yksi-kurssi input').removeClass('varoitus');
		var oparitArvo = $(this).siblings('.oparit').find('input').val();
		var tyotunnitArvo = $(this).siblings('.tyotunnit').find('input').val();
		if(oparitArvo == '' || tyotunnitArvo == ''){
			$(this).parents('.yksi-kurssi').append('<span class="varoitus">Täytä kaikki kentät</span>');
			$('.yksi-kurssi input').each(function(){
				if($(this).val() == ''){
					$(this).addClass('varoitus');
				}
			});			
		}else if(oparitArvo < 1 || tyotunnitArvo < 1){
			$(this).parents('.yksi-kurssi').append('<span class="varoitus">Arvo ei voi olla alle 1</span>');
			$('.yksi-kurssi input[type="number"]').each(function(){
				if($(this).val() < 1){
					$(this).addClass('varoitus');
				}
			});	
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