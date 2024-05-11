var prices = {
/* цены на услуги и оборудование */
		topas:[10000,12000,19000], // Топас [5,8,10]
		delivery:1500, // Доставка
		trench:[10100,12900,19500], // Котлован для Топас [5,8,10]
		installation:10500, // Монтаж
		pipeline:620, // Трубопровод
		drain_well_digging:2200, // Дренажный колодец (ройка и засыпка)
		laying_electrical_cables:150, // Укладка электрокабеля
		formwork:5000, // Опалубка
		
		// цены на доп. оборудование
		alarm:2500, // Сигнализация
		drain_well:7500, // Дренажный колодец
		luke_poli:2500, // Люк полимеропесчаный
		drain_pump_willo:5500, // Насос дренажный Willo
		geotextile:200 // Геотекстиль
/* цены на услуги и оборудование */
	},
/* для управления и сохранения состояния */
		// управление включением чекбоксов (0 - выкл)
	checked = [
		// включенные для топас 5
		{ delivery:1,trench:1,installation:1,pipeline:1,drain_well_digging:1,laying_electrical_cables:1,formwork:1,alarm:1,drain_well:1,luke_poli:1,drain_pump_willo:1,geotextile:1 },
		// включенные для топас 8
		{ delivery:1,trench:1,installation:1,pipeline:1,drain_well_digging:1,laying_electrical_cables:1,formwork:1,alarm:1,drain_well:1,luke_poli:1,drain_pump_willo:1,geotextile:1 },
		// включенные для топас 10
		{ delivery:1,trench:1,installation:1,pipeline:1,drain_well_digging:1,laying_electrical_cables:1,formwork:1,alarm:1,drain_well:1,luke_poli:1,drain_pump_willo:1,geotextile:1 }
	],
		// управление количеством в полях для ввода
	counts = [
		// количество для топас 5
		{ delivery:1,trench:1,installation:1,pipeline:1,drain_well_digging:1,laying_electrical_cables:1,formwork:1,alarm:1,drain_well:1,luke_poli:1,drain_pump_willo:1,geotextile:1 },
		// количество для топас 8
		{ delivery:1,trench:1,installation:1,pipeline:1,drain_well_digging:1,laying_electrical_cables:1,formwork:1,alarm:1,drain_well:1,luke_poli:1,drain_pump_willo:1,geotextile:1 },
		// количество для топас 10
		{ delivery:1,trench:1,installation:1,pipeline:1,drain_well_digging:1,laying_electrical_cables:1,formwork:1,alarm:1,drain_well:1,luke_poli:1,drain_pump_willo:1,geotextile:1 }
	],
/* для управлений и сохранения состояния */
	rub = ' \u0440\u0443\u0431.', // строка ' руб.'
	i = 0; // хранит индекс топас для обращения к массиву prices
// форматирование цисел
function number_format(number){
    return number.toString().replace(
        /^(\-?)(\d{1,2})?(\d{3})?(\d{3})?(\d{3})?(\d{3})?(\d{3})?([\.\,](\d+)?)?$/,
        function($0,$s,$6,$5,$4,$3,$2,$1,$p,$d){
            $d = $d | 0;
			return   $s+
					($6 ? ' '+$6 : '')+
					($5 ? ' '+$5 : '')+
					($4 ? ' '+$4 : '')+
					($3 ? ' '+$3 : '')+
					($2 ? ' '+$2 : '')+
					($1 ? ' '+$1 : '')+
					($p ? ','+$d : '');
    });
}
// расчет стоимости
function calculate(){
	var ins_cost = 0, add_eq = 0, inp, tmp;
	// стоимоть услуг
	$('.main_works input:checkbox').each(function(){
		inp = $('input[name='+this.id+']');
		if($(inp).attr('disabled') != 'disabled'){
			tmp = prices[this.id];
			if($.isArray(tmp)) tmp = tmp[i];
			ins_cost += tmp*parseInt($(inp).val());
		}
	});
	$('#installation_cost').html(number_format(ins_cost)+rub);
	
	// стоимость оборудования
	$('.add_eq input:checkbox').each(function(){
		inp = $('input[name='+this.id+']');
		if($(inp).attr('disabled') != 'disabled'){
			tmp = prices[this.id];
			if($.isArray(tmp)) tmp = tmp[i];
			add_eq += tmp*parseInt($(inp).val());
		}
	});
	$('#add_cost').html(number_format(add_eq)+rub);
	
	$('#installation_cost').html(number_format(ins_cost)+rub);
	$('#total_cost').html(number_format(ins_cost)+' + '+number_format(add_eq)+' = '+number_format(ins_cost+add_eq)+rub);
}
// активирует чекбоксы в таблицах услуг и оборудования, устанавливает кол-во в поле ввода
function checking(){
	var j, inp;
	$('.main_works input:checkbox, .add_eq input:checkbox').each(function(){
		j = this.id;
		inp = $('input[name='+j+']');
		$(this).removeAttr('checked');
		$(inp).attr('disabled', 'disabled');
		if(checked[i][j]){
			$(this).prop('checked', 'checked');
			$(inp).removeAttr('disabled');
		}
		// установка кол-ва по умолчанию
		$(inp).val(counts[i][j]);
	});
}
// заполняет ячейки таблицы в колонке стоимость
function filling(){
	var tmp;
	$('.for_price').each(function(){
		tmp = $(this).attr('class').replace(' for_price', '');
		tmp = prices[tmp];
		if($.isArray(tmp)) tmp = tmp[i];
		$(this).html(number_format(tmp));
	});
}
// ПОЕХАЛИИИИИИИИИИИИИ (copyright Гагарин Ю.А)
$(document).ready(function(){
	var inp, val;
	
	// показываем цену топас
	$('#select_type_val').html($('#select_type option').html()+': '+prices['topas'][i]+rub);
	
	// активация/деактивация чекбоксов
	$('.main_works input:checkbox, .add_eq input:checkbox').change(function(){
		inp = $('input[name='+this.id+']');
		$(inp).attr('disabled') == 'disabled' ? $(inp).removeAttr('disabled') : $(inp).attr('disabled', 'disabled');
		checked[i][this.id] = $(inp).attr('disabled') == 'disabled' ? 0 : 1;
		calculate();
	});
	
	// изменение содержимого полей ввода
	$('.main_works input:text, .add_eq input:text').keyup(function(){
		var name = $(this).attr('name');
		counts[i][name] = $(this).val();
		calculate();
	});
	
	// всязывание полей Трубопровод и Укладка электрокабеля (без обратной связи)
	$('.binded_fields_01').keyup(function(){
		val = $(this).val();
		$('.binded_fields_01').each(function(){
			// отрубание обратной связи для Трубопровод
			if(!$(this).hasClass('pipeline')) $(this).val(val);
		});
	});
	
	// изменение в выборе топас
	$('#select_type').change(function(){
		i = parseInt(this.value);
		filling();
		checking();
		calculate();
		var str = $(this).children('option:selected').html().replace(/&nbsp;/g, '');
		$('#select_type_val').html(str+': '+prices['topas'][i]+rub);
	});
	
	// заполнение ячеек таблицы в колонке стоимость
	filling();
	// установка чекбоксов для типа топас и заполнение полей ввода числами
	checking();
	// расчет стоимости
	calculate();
});