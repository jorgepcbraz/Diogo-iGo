var PROJECT = PROJECT || {};

PROJECT.MAIN = (function() {
	return {
		sections: ['home', 'postType'],

		previousSection: 'home',

		post: {
			type: 'text',
			title: '',
			file: '',
			description: '',
			localization: '',
		},

		utilizador: {
			nome: 'text',
			BI: '',
			NIF: '',
			n_elemntos: '',
			idade: '',
		},

		info_prop: {
			valor: 'text',
			description: '',
			nome: '',
			estado: '',
			fotos: '',
		},

		init: function() {
			//Botões de change section
			var changeSectionBtns = [].slice.call(document.querySelectorAll('.jsChangeSection'));
			for (var index = 0; index < changeSectionBtns.length; index++) {
				var btn = changeSectionBtns[index];
				btn.addEventListener('click', function(e) {
					var newSection = e.currentTarget.dataset.section;
					var reset = e.currentTarget.dataset.reset;
					//reset do post
					if (reset === 'true') {
						PROJECT.MAIN.resetPost();
					}
					PROJECT.MAIN.changeSection(newSection);
				});
			}

			//Botão para criar propriedade
			var createHouse = document.querySelector('.jsCreateHouse');
			createHouse.addEventListener('click', function(e) {
				e.preventDefault;
				var newHouse = {
					distrito: document.querySelector('input[name=Distrito]').value,
					rua: document.querySelector('input[name=Rua]').value,
					rate: 0,
					id: window.houses.length + 1,
					dono: 'Diogo Barata',
					fotos: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'],
					approved: 'no',
				};
				window.houses.push(newHouse);
				PROJECT.MAIN.changeSection('ownHousesType');
			});

			//Botão apra ler mensagens
			var readMessages = [].slice.call(document.querySelectorAll('.readUserMessage'));
			for (var i = 0; i < readMessages.length; i++) {
				var btn = readMessages[i];
				btn.addEventListener('click', function(e) {
					e.preventDefault();
					PROJECT.MAIN.changeSection(e.currentTarget.dataset.section, e.currentTarget.dataset.user);
				});
			}

			//Botão para criar mensagem
			var addMessageBtn = document.querySelector('.jsAddMessage');
			addMessageBtn.addEventListener('click', function(e) {
				var message = document.querySelector('input[name=message]').value;

				var messageCtns = [].slice.call(document.querySelectorAll('.userMessage'));

				for (var i = 0; i < messageCtns.length; i++) {
					var mesCtn = messageCtns[i];
					if (!mesCtn.classList.contains('hidden')) {
						var div = document.createElement('div');
						div.classList = 'container-chat darker';
						mesCtn.appendChild(div);

						var p = document.createElement('p');
						p.style = 'text-align: right';
						p.innerHTML = message;
						div.appendChild(p);

						var span = document.createElement('span');
						span.classList = 'time-left';
						span.innerHTML = '14:01';
						div.appendChild(span);
					}
				}

				PROJECT.MAIN.changeSection('messageUser');
			});

			//Botões das propriedades do post (titulo, desc, localização, postar)
			var postTypeBtn = [].slice.call(document.querySelectorAll('.jsBtnDefineContent'));
			for (var index = 0; index < postTypeBtn.length; index++) {
				var btn = postTypeBtn[index];
				btn.addEventListener('click', function(e) {
					e.preventDefault();
					var changeTo = e.currentTarget.dataset.type;
					PROJECT.MAIN.changeSection(changeTo);
				});
			}

			//Botões de Publicar
			var jsCreatePostBtns = [].slice.call(document.querySelectorAll('.jsCreatePost'));
			for (var index = 0; index < jsCreatePostBtns.length; index++) {
				var btn = jsCreatePostBtns[index];
				btn.addEventListener('click', function(e) {
					PROJECT.MAIN.changeSection('finalPost');
					if (PROJECT.MAIN.post.title) {
						var title = document.querySelector('.js-title');
						title.innerHTML = 'Título: ' + PROJECT.MAIN.post.title;
						title.classList.remove('hidden');
					}
					if (PROJECT.MAIN.post.description) {
						var description = document.querySelector('.js-description');
						description.innerHTML = 'Descrição: ' + PROJECT.MAIN.post.description;
						description.classList.remove('hidden');
					}
					if (PROJECT.MAIN.post.localization) {
						var localization = document.querySelector('.js-localization');
						localization.innerHTML = 'Publicado em: ' + PROJECT.MAIN.post.localization;
						localization.classList.remove('hidden');
					}
					if (PROJECT.MAIN.post.image) {
						var photo = document.querySelector('.js-photo');
						photo.innerHTML = '<img src="' + PROJECT.MAIN.post.image + '" />';
						photo.classList.remove('hidden');
					}
					if (PROJECT.MAIN.post.video) {
						var video = document.querySelector('.js-video');
						video.src = PROJECT.MAIN.post.video;
						video.classList.remove('hidden');
					}
					if (PROJECT.MAIN.post.audio) {
						var audio = document.querySelector('.js-audio');
						audio.src = PROJECT.MAIN.post.audio;
						audio.classList.remove('hidden');
					}
				});
			}

			//Botões do ecran Audio
			var audiosBtns = [].slice.call(document.querySelectorAll('.jsClickAudio'));
			for (var index = 0; index < audiosBtns.length; index++) {
				var btn = audiosBtns[index];
				btn.addEventListener('click', function(e) {
					e.preventDefault();
					var audio = e.currentTarget.dataset.audio;
					PROJECT.MAIN.post.audio = audio;
				});
			}

			//Botões do ecran Video
			var videosBtns = [].slice.call(document.querySelectorAll('.jsClickVideo'));
			for (var index = 0; index < videosBtns.length; index++) {
				var btn = videosBtns[index];
				btn.addEventListener('click', function(e) {
					e.preventDefault();
					var video = e.currentTarget.src;
					PROJECT.MAIN.post.video = video;
				});
			}

			//Botões do ecran Foto
			var photosBtns = [].slice.call(document.querySelectorAll('.jsClickPhoto'));
			for (var index = 0; index < photosBtns.length; index++) {
				var btn = photosBtns[index];
				btn.addEventListener('click', function(e) {
					e.preventDefault();
					var image = e.currentTarget.src;
					PROJECT.MAIN.post.image = image;
				});
			}

			//Botões do ecran titulo
			var addTextBtn = document.querySelector('.jsBtnAddText');
			addTextBtn.addEventListener('click', function(e) {
				e.preventDefault();
				PROJECT.MAIN.post.title = document.querySelector('input[name="title"]').value;
				PROJECT.MAIN.post.description = document.querySelector('input[name="description"]').value;
				PROJECT.MAIN.post.localization = document.querySelector('input[name="localization"]').value;
				PROJECT.MAIN.changeSection('postType');
			});
		},

		changeSection: function(sectionID, id) {
			var sections = [].slice.call(document.querySelectorAll('.section'));
			var currentSection = document.getElementById(sectionID);
			for (var index = 0; index < sections.length; index++) {
				var section = sections[index];
				section.classList.add('hidden');
			}
			currentSection.classList.remove('hidden');

			//Se o ecran for escolher casa
			if (!!currentSection.dataset.readhouses == true) {
				PROJECT.MAIN.createDistrictDropDown();
			}

			//Se o ecran for mostrar a minha casa
			if (!!currentSection.dataset.readmyhouses == true) {
				PROJECT.MAIN.createMyHousesList();
			}

			//Se o ecran for ver detalhe de casa
			if (id > 0) {
				if (sectionID === 'ownHousesTypeVerification') {
					var houses = window.houses;
					for (var i = 0; i < houses.length; i++) {
						var house = houses[i];
						if (house.id == id) {
							house.approved = 'pending';
						}
					}
					// se o ecran for de ver as mensagens
				} else if (sectionID === 'messageUser') {
					PROJECT.MAIN.showUserMessages(id);
				} else {
					PROJECT.MAIN.createHouseDetails(id);
				}
			}
		},

		showUserMessages: function(id) {
			var userMessagesCtn = [].slice.call(document.querySelectorAll('.userMessage'));
			for (var i = 0; i < userMessagesCtn.length; i++) {
				var userCtn = userMessagesCtn[i];
				userCtn.classList.add('hidden');
				if (userCtn.dataset.id == id) {
					userCtn.classList.remove('hidden');
				}
			}
		},

		createMyHousesList: function() {
			var container = document.querySelector('.my-houses-container');
			container.innerHTML = '';

			var houses = window.houses;
			var myHouses = 0;
			for (var i = 0; i < houses.length; i++) {
				var house = houses[i];
				if (house.dono === 'Diogo Barata') {
					myHouses++;
					if (house.approved === 'yes') {
						var link = document.createElement('a');
						link.href = '#';
						link.style =
							'position: relative; display: inline-block; width: 100px; height: 100px; background: url(images/houses/' +
							house.fotos[1] +
							') center no-repeat;';
						link.dataset.id = house.id;
						container.appendChild(link);

						var iconCtn = document.createElement('span');
						iconCtn.style =
							'position: absolute; top: 0; bottom: 0; right: 0; left: 0; background: rgba(255,255,255,.5) url(icones/icons8-verified-account-24.png) no-repeat center';
						link.appendChild(iconCtn);

						link.addEventListener('click', function(e) {
							e.preventDefault();
							PROJECT.MAIN.changeSection('houseDetails', e.currentTarget.dataset.id);
						});
					} else if (house.approved === 'pending') {
						var link = document.createElement('span');
						link.style =
							'position: relative; display: inline-block; width: 100px; height: 100px; background: url(images/houses/' +
							house.fotos[1] +
							') center no-repeat;';
						container.appendChild(link);

						var iconCtn = document.createElement('span');
						iconCtn.style =
							'position: absolute; top: 0; bottom: 0; right: 0; left: 0; background: rgba(255,255,255,.5) url(icones/icons8-hourglass-24.png) no-repeat center';
						link.appendChild(iconCtn);
					} else {
						var link = document.createElement('a');
						link.style =
							'position: relative; display: inline-block; width: 100px; height: 100px; background: url(images/houses/' +
							house.fotos[1] +
							') center no-repeat;';
						link.dataset.id = house.id;
						container.appendChild(link);

						var iconCtn = document.createElement('span');
						iconCtn.style =
							'position: absolute; top: 0; bottom: 0; right: 0; left: 0; background: rgba(255,255,255,.5) url(icones/icons8-help-24.png) no-repeat center';
						link.appendChild(iconCtn);

						link.addEventListener('click', function(e) {
							e.preventDefault();
							PROJECT.MAIN.changeSection('ownHousesTypeVerification', e.currentTarget.dataset.id);
						});
					}
				}
			}
			container.style = 'width:' + myHouses * 100 + 'px';
		},

		createHouseDetails: function(houseID) {
			var container = document.querySelector('.house-details-container');
			container.innerHTML = '';

			var houses = window.houses;

			for (var i = 0; i < houses.length; i++) {
				var house = houses[i];
				if (house.id == houseID) {
					var distrito = document.createElement('p');
					distrito.innerHTML = 'Distrito: ' + house.distrito;
					container.appendChild(distrito);

					var rua = document.createElement('p');
					rua.innerHTML = 'Rua: ' + house.rua;
					container.appendChild(rua);

					var dono = document.createElement('p');
					dono.innerHTML = 'Dono: ' + house.dono;
					container.appendChild(dono);

					var fotosWrap = document.createElement('div');
					fotosWrap.classList = 'house-details-fotos-wrap';
					container.appendChild(fotosWrap);

					var fotos = document.createElement('div');
					fotos.classList = 'house-details-fotos-ctn';
					fotos.style = 'width: ' + house.fotos.length * 100 + 'px';
					fotosWrap.appendChild(fotos);

					for (var j = 0; j < house.fotos.length; j++) {
						var foto = house.fotos[j];
						var img = document.createElement('img');
						img.width = 100;
						img.height = 100;
						img.src = 'images/houses/' + foto;
						fotos.appendChild(img);
					}
				}
			}
		},

		createDistrictDropDown: function() {
			var districts = [];
			var data = window.houses;

			for (var index = 0; index < data.length; index++) {
				var element = data[index];
				var district = element.distrito;
				if (districts.indexOf(district) < 0) {
					districts.push(element.distrito);
				}
			}

			var districtsSelect = document.querySelector('.districts');

			districtsSelect.innerHTML = '';

			var domElement = document.createElement('option');
			domElement.value = 'Distrito';
			domElement.innerHTML = 'Distrito';
			districtsSelect.appendChild(domElement);

			for (var index = 0; index < districts.length; index++) {
				var element = districts[index];
				var domElement = document.createElement('option');
				domElement.value = element;
				domElement.innerHTML = element;
				districtsSelect.appendChild(domElement);
			}

			districtsSelect.addEventListener('change', function(e) {
				e.preventDefault();
				var value = e.currentTarget.value;
				PROJECT.MAIN.populateHouses(value);
			});
		},

		populateHouses: function(district) {
			var houseListContainer = document.querySelector('.houseList');
			houseListContainer.innerHTML = '';

			var houses = window.houses;
			for (var index = 0; index < houses.length; index++) {
				var element = houses[index];
				if (element.distrito === district && element.approved === 'yes') {
					var link = document.createElement('a');
					link.href = '#';
					link.dataset.id = element.id;
					houseListContainer.appendChild(link);

					link.addEventListener('click', function(e) {
						e.preventDefault();
						PROJECT.MAIN.changeSection('houseDetails', e.currentTarget.dataset.id);
					});

					var street = document.createElement('span');
					street.style = 'display: inline-block';
					street.innerHTML = element.rua;
					link.appendChild(street);

					var rate = document.createElement('span');
					var rateInnerHTML = '';
					for (var i = 0; i < element.rate; i++) {
						rateInnerHTML += '*';
					}
					rate.innerHTML = rateInnerHTML;
					link.appendChild(rate);
				}
			}
		},

		resetPost: function() {
			PROJECT.MAIN.post = {
				type: 'text',
				title: '',
				image: '',
				video: '',
				audio: '',
				description: '',
				localization: '',
			};
			document.getElementById('file1').style.borderColor = 'transparent';
			document.getElementById('file2').style.borderColor = 'transparent';
			document.getElementById('file3').style.borderColor = 'transparent';
			document.getElementById('file4').style.borderColor = 'transparent';
			document.getElementById('file5').style.borderColor = 'transparent';
			document.getElementById('file6').style.borderColor = 'transparent';
			document.getElementById('file7').style.borderColor = 'transparent';
			document.getElementById('file8').style.borderColor = 'transparent';
			document.getElementById('file9').style.borderColor = 'transparent';
		},
	};
})();

function ready(fn) {
	if (document.readyState === 'complete') {
		PROJECT.MAIN.init();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

function selectFile1() {
	var elementFile1 = document.getElementById('file1');
	var elementFile2 = document.getElementById('file2');
	var elementFile3 = document.getElementById('file3');
	var elementFile4 = document.getElementById('file4');
	var elementFile5 = document.getElementById('file5');
	var elementFile6 = document.getElementById('file6');
	var elementFile7 = document.getElementById('file7');
	var elementFile8 = document.getElementById('file8');
	var elementFile9 = document.getElementById('file9');

	if (elementFile1.style.borderColor === 'white') {
		elementFile1.style.borderColor = 'transparent';
	} else {
		elementFile1.style.borderColor = 'white';
		elementFile2.style.borderColor = 'transparent';
		elementFile3.style.borderColor = 'transparent';
		elementFile4.style.borderColor = 'transparent';
		elementFile5.style.borderColor = 'transparent';
		elementFile6.style.borderColor = 'transparent';
		elementFile7.style.borderColor = 'transparent';
		elementFile8.style.borderColor = 'transparent';
		elementFile9.style.borderColor = 'transparent';
	}
}
function selectFile2() {
	var elementFile1 = document.getElementById('file1');
	var elementFile2 = document.getElementById('file2');
	var elementFile3 = document.getElementById('file3');
	var elementFile4 = document.getElementById('file4');
	var elementFile5 = document.getElementById('file5');
	var elementFile6 = document.getElementById('file6');
	var elementFile7 = document.getElementById('file7');
	var elementFile8 = document.getElementById('file8');
	var elementFile9 = document.getElementById('file9');

	if (elementFile2.style.borderColor === 'white') {
		elementFile2.style.borderColor = 'transparent';
	} else {
		elementFile1.style.borderColor = 'transparent';
		elementFile2.style.borderColor = 'white';
		elementFile3.style.borderColor = 'transparent';
		elementFile4.style.borderColor = 'transparent';
		elementFile5.style.borderColor = 'transparent';
		elementFile6.style.borderColor = 'transparent';
		elementFile7.style.borderColor = 'transparent';
		elementFile8.style.borderColor = 'transparent';
		elementFile9.style.borderColor = 'transparent';
	}
}
function selectFile3() {
	var elementFile1 = document.getElementById('file1');
	var elementFile2 = document.getElementById('file2');
	var elementFile3 = document.getElementById('file3');
	var elementFile4 = document.getElementById('file4');
	var elementFile5 = document.getElementById('file5');
	var elementFile6 = document.getElementById('file6');
	var elementFile7 = document.getElementById('file7');
	var elementFile8 = document.getElementById('file8');
	var elementFile9 = document.getElementById('file9');
	if (elementFile3.style.borderColor === 'white') {
		elementFile3.style.borderColor = 'transparent';
	} else {
		elementFile1.style.borderColor = 'transparent';
		elementFile2.style.borderColor = 'transparent';
		elementFile3.style.borderColor = 'white';
		elementFile4.style.borderColor = 'transparent';
		elementFile5.style.borderColor = 'transparent';
		elementFile6.style.borderColor = 'transparent';
		elementFile7.style.borderColor = 'transparent';
		elementFile8.style.borderColor = 'transparent';
		elementFile9.style.borderColor = 'transparent';
	}
}
function selectFile4() {
	var elementFile1 = document.getElementById('file1');
	var elementFile2 = document.getElementById('file2');
	var elementFile3 = document.getElementById('file3');
	var elementFile4 = document.getElementById('file4');
	var elementFile5 = document.getElementById('file5');
	var elementFile6 = document.getElementById('file6');
	var elementFile7 = document.getElementById('file7');
	var elementFile8 = document.getElementById('file8');
	var elementFile9 = document.getElementById('file9');

	if (elementFile4.style.borderColor === 'white') {
		elementFile4.style.borderColor = 'transparent';
	} else {
		elementFile1.style.borderColor = 'transparent';
		elementFile2.style.borderColor = 'transparent';
		elementFile3.style.borderColor = 'transparent';
		elementFile4.style.borderColor = 'white';
		elementFile5.style.borderColor = 'transparent';
		elementFile6.style.borderColor = 'transparent';
		elementFile7.style.borderColor = 'transparent';
		elementFile8.style.borderColor = 'transparent';
		elementFile9.style.borderColor = 'transparent';
	}
}
function selectFile5() {
	var elementFile1 = document.getElementById('file1');
	var elementFile2 = document.getElementById('file2');
	var elementFile3 = document.getElementById('file3');
	var elementFile4 = document.getElementById('file4');
	var elementFile5 = document.getElementById('file5');
	var elementFile6 = document.getElementById('file6');
	var elementFile7 = document.getElementById('file7');
	var elementFile8 = document.getElementById('file8');
	var elementFile9 = document.getElementById('file9');

	if (elementFile5.style.borderColor === 'white') {
		elementFile5.style.borderColor = 'transparent';
	} else {
		elementFile1.style.borderColor = 'transparent';
		elementFile2.style.borderColor = 'transparent';
		elementFile3.style.borderColor = 'transparent';
		elementFile4.style.borderColor = 'transparent';
		elementFile5.style.borderColor = 'white';
		elementFile6.style.borderColor = 'transparent';
		elementFile7.style.borderColor = 'transparent';
		elementFile8.style.borderColor = 'transparent';
		elementFile9.style.borderColor = 'transparent';
	}
}
function selectFile6() {
	var elementFile1 = document.getElementById('file1');
	var elementFile2 = document.getElementById('file2');
	var elementFile3 = document.getElementById('file3');
	var elementFile4 = document.getElementById('file4');
	var elementFile5 = document.getElementById('file5');
	var elementFile6 = document.getElementById('file6');
	var elementFile7 = document.getElementById('file7');
	var elementFile8 = document.getElementById('file8');
	var elementFile9 = document.getElementById('file9');

	if (elementFile6.style.borderColor === 'white') {
		elementFile6.style.borderColor = 'transparent';
	} else {
		elementFile1.style.borderColor = 'transparent';
		elementFile2.style.borderColor = 'transparent';
		elementFile3.style.borderColor = 'transparent';
		elementFile4.style.borderColor = 'transparent';
		elementFile5.style.borderColor = 'transparent';
		elementFile6.style.borderColor = 'white';
		elementFile7.style.borderColor = 'transparent';
		elementFile8.style.borderColor = 'transparent';
		elementFile9.style.borderColor = 'transparent';
	}
}
function selectFile7() {
	var elementFile1 = document.getElementById('file1');
	var elementFile2 = document.getElementById('file2');
	var elementFile3 = document.getElementById('file3');
	var elementFile4 = document.getElementById('file4');
	var elementFile5 = document.getElementById('file5');
	var elementFile6 = document.getElementById('file6');
	var elementFile7 = document.getElementById('file7');
	var elementFile8 = document.getElementById('file8');
	var elementFile9 = document.getElementById('file9');
	if (elementFile7.style.borderColor === 'white') {
		elementFile7.style.borderColor = 'transparent';
	} else {
		elementFile1.style.borderColor = 'transparent';
		elementFile2.style.borderColor = 'transparent';
		elementFile3.style.borderColor = 'transparent';
		elementFile4.style.borderColor = 'transparent';
		elementFile5.style.borderColor = 'transparent';
		elementFile6.style.borderColor = 'transparent';
		elementFile7.style.borderColor = 'white';
		elementFile8.style.borderColor = 'transparent';
		elementFile9.style.borderColor = 'transparent';
	}
}
function selectFile8() {
	var elementFile1 = document.getElementById('file1');
	var elementFile2 = document.getElementById('file2');
	var elementFile3 = document.getElementById('file3');
	var elementFile4 = document.getElementById('file4');
	var elementFile5 = document.getElementById('file5');
	var elementFile6 = document.getElementById('file6');
	var elementFile7 = document.getElementById('file7');
	var elementFile8 = document.getElementById('file8');
	var elementFile9 = document.getElementById('file9');

	if (elementFile8.style.borderColor === 'white') {
		elementFile8.style.borderColor = 'transparent';
	} else {
		elementFile1.style.borderColor = 'transparent';
		elementFile2.style.borderColor = 'transparent';
		elementFile3.style.borderColor = 'transparent';
		elementFile4.style.borderColor = 'transparent';
		elementFile5.style.borderColor = 'transparent';
		elementFile6.style.borderColor = 'transparent';
		elementFile7.style.borderColor = 'transparent';
		elementFile8.style.borderColor = 'white';
		elementFile9.style.borderColor = 'transparent';
	}
}
function selectFile9() {
	var elementFile1 = document.getElementById('file1');
	var elementFile2 = document.getElementById('file2');
	var elementFile3 = document.getElementById('file3');
	var elementFile4 = document.getElementById('file4');
	var elementFile5 = document.getElementById('file5');
	var elementFile6 = document.getElementById('file6');
	var elementFile7 = document.getElementById('file7');
	var elementFile8 = document.getElementById('file8');
	var elementFile9 = document.getElementById('file9');
	if (elementFile9.style.borderColor === 'white') {
		elementFile9.style.borderColor = 'transparent';
	} else {
		elementFile1.style.borderColor = 'transparent';
		elementFile2.style.borderColor = 'transparent';
		elementFile3.style.borderColor = 'transparent';
		elementFile4.style.borderColor = 'transparent';
		elementFile5.style.borderColor = 'transparent';
		elementFile6.style.borderColor = 'transparent';
		elementFile7.style.borderColor = 'transparent';
		elementFile8.style.borderColor = 'transparent';
		elementFile9.style.borderColor = 'white';
	}
}

/*
function selectFile(idFile){
	var elementFile = document.getElementById('file' + idElement);
    if (idFile === 1 || idFile === 2 || idFile === 3 || idFile === 4 || idFile === 5 || idFile === 6 || idFile === 7 || idFile === 8 || idFile === 9) {
      if (elementFile.style.borderColor === "white"){
				elementFile.style.borderColor = "transparent";
			}
      else{
				elementFile.style.borderColor = "white";
      }
    }
}
function color(row) {
	if(row.bgColor == "transparent"){
		row.bgColor="white";
	}
	else{
		row.bgColor="transparent";
	}
}
*/

ready(PROJECT.MAIN.init);
