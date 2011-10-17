$(function()
{
	var form_lightbox;
	var cur_points;
	var cur_points_value;
	var num_players;
	var players_left;

	init();

	$('body #new_game').click(addPlayersForm);
	$('.more').live('click', incrementPoints);
	$('.less').live('click', decrementPoints);
	$('tbody tr').live('mouseover mouseout', function(event){
		if (event.type == 'mouseover')
			$(this).addClass('hovered');
		else
			$(this).removeClass('hovered');
	});

	function init(){
		form_lightbox = $('form.#add_players_form').modal(
			modalOptions()
		);
	}

	function activateFormButtons(){
		$('form .button').click(checkNumPlayers);
		$('form #add_more_players').click(addMorePlayerRows);
	}

	function addMorePlayerRows(){
		$('form #new_players').append('<label for="name">Player:</label>\
			<input class="new_player" name="name" type="text">\
			<br>');
	}

	function addPlayers(){
		$.each($('input[value!=""].new_player'), function(i, player){
			$('#active_players > tbody:last').append('<tr class="center"><td>\
				<span class="name">'
				+ $(player).val() 
				+ '</span>\
				</td><td>\
				<div class="less"></div>\
				<div class="points" value="0">0</div>\
				<div class="more"></div>\
				</td></tr>');
		});
		$('#active_players').show();
		num_players = $('table#active_players tbody tr').length;
		players_left = $('table#active_players tbody tr').length;
		form_lightbox.close();
	}

	function addPlayersForm(){
		$('#active_players').find("tr:gt(0)").remove();
		$('#active_players').hide();
		form_lightbox = $('form.#add_players_form').modal(
			modalOptions()
		);
	}

	function checkNumPlayers(){
		var num_entries = $('input[value!=""].new_player').length
		if (num_entries > 2) {
			addPlayers();
		} else {
			alert('Must have at least three players');
		}
		return false;
	}

	function decrementPoints(row){
		var row = $(this);
		getCurrentPoints(row);
		if (cur_points_value > 0) {
			updatePoints(cur_points, cur_points_value - 1);
			if (cur_points_value == 10){
				var eliminated_player_row = $(row).closest('tr');
				$(eliminated_player_row).removeClass('eliminated');
				players_left += 1;
			}
		}
	}

	function getCurrentPoints(row){
		cur_points = $(row).parent().children('.points');
		cur_points_value = parseInt( cur_points.attr('value') );
	}

	function incrementPoints(row){
		var row = $(this);
		getCurrentPoints(row);
		if (cur_points_value < 10 ){
			updatePoints(cur_points, cur_points_value + 1);
			if (cur_points_value == 9){
				var eliminated_player_row = $(row).closest('tr');
				$(eliminated_player_row).addClass('eliminated');
				players_left -= 1;
				if (players_left == 1){
					var winner = $('table#active_players tbody tr:not(.eliminated)');
					var winner_name = $(winner).children('td').children('span').html()
					$.modal("<div id='winner_lightbox'><h1>" + winner_name + " wins!</h1></div>");
				}
			}
		}
	}

	function modalOptions(){
		var options = {
			onShow: function(){
				activateFormButtons();
				$('button#new_game').hide();
			},
			onClose: function(){
				$('button#new_game').show();
				$.modal.close();
			},
			minWidth: 275
		};
		return options;
	}

	function updatePoints(row, value){
		$(row).text(value);
		$(row).attr('value', value);
	}

});
