

var solution = {

	answers: [],

	answer_list: $('.answer__list .list__tick'),
	result_links: $('#result_links'),
	result_solution: $('#result_solution'),
	result: $('#result'),
	result_profile: $('#result .link'),
	result_stp: $('#result_stp'),
	result_sequrity: $('#result_sequrity'),

	init: function () {
	
		$('.choosing__elem input').change(function () {
			
			solution.answers = $('.choosing__elem input:checked');

			solution.updateAnswerList();

			if (solution.answers.length == 5) {
				solution.showResult();
			} else {
				solution.hideResult();
			}

		});
		
	},

	showResult: function() {


		solution.result_links.show();
		solution.result_solution.show();
		solution.result.show();

		var res = [];
		
		for (var i = 0; i < solution.answers.length; i++) {	
			if (solution.answers[i].name == 'question_1') {
				res[0] = $(solution.answers[i]).val();
			}
			if (solution.answers[i].name == 'question_2') {
				res[1] = $(solution.answers[i]).val();
			}
			if (solution.answers[i].name == 'question_3') {
				res[2] = $(solution.answers[i]).val();
			}
			if (solution.answers[i].name == 'question_4') {
				res[3] = $(solution.answers[i]).val();
			}
			if (solution.answers[i].name == 'question_5') {
				res[4] = $(solution.answers[i]).val();
			}
		}

		var profile_text = '';
		var stp_text = '';
		var sequrity_text = '';

		console.log(res);

		// Профиль
		switch (true) {
			case (res[0] == 3): profile_text = 'EUROLINE';
				break;
			case (res[0] == 2 && res[1] == 1): profile_text = 'PROLINE';
				break;
			case (res[0] == 2 && res[1] == 2): profile_text = 'SOFTLINE';
				break;
			case (res[0] == 2 && res[1] == 3): profile_text = 'SWINGLINE';
				break;
			case (res[0] == 1 && (res[1] == 3 || res[1] == 1)): profile_text = 'SOFTLINE 82';
				break;
			case (res[0] == 1 && res[1] == 2): profile_text = 'ALPHALINE';
				break;
		}

		// Стеклопакет
		switch (true) {
			case (res[2] == 1 || res[2] == 2): stp_text = 'Двухкамерный';
				break;
			case (res[2] == 3): stp_text = 'Аккустический';
				break;
		}

		// Детская безопасность
		switch (true) {
			case (res[3] == 1): sequrity_text = 'Нет';
				break;
			case (res[3] == 2): sequrity_text = 'Детский замок и триплекс';
				break;
			case (res[3] == 3): sequrity_text = 'Триплекс';
				break;
		}

		solution.result_profile.text(profile_text);
		solution.result_stp.text(stp_text);
		solution.result_sequrity.text(sequrity_text);
	},

	hideResult: function() {

		solution.result_links.hide();
		solution.result_solution.hide();
		solution.result.hide();

	},

	updateAnswerList: function() {

		var t = '';
		
		console.log(solution.answers.length);

		for (var i = 0; i < solution.answers.length; i++) {
			
			var text = $(solution.answers[i]).parent().find('span').text();

			t += '<li><b>' + text + '</b></li>';
		}

		solution.answer_list.html(t);
	}

}



$(document).ready(function () {
	solution.init();
});

