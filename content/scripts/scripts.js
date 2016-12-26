$(document).ready(function(){

	//var n = new ComboBox('field-name');

	textareaFlex();

});

$(window).resize(function(){

	fixed();

	if($('.fixed').length){
		var delta = 30;
		if($('.сard-table').length){
			delta = 0;
		}
		setTimeout(function(){
			destination = $('#card-' + id).offset().top - delta;
			$('html,body').stop().animate({
				scrollTop: destination
			},{
				duration: 200
			});
		},100);
	}

});

$(window).scroll(function(){

    fixed();

});

function fixed(){

	if($('.fixed').length){
		var fixed = $('.fixed');
		var base = $('.fixed-base');
		var pointStart = base.offset().top - 20;
		var pointEnd = base.offset().top + base.outerHeight() - fixed.height() - 20;

		if($(window).scrollTop() < pointStart){
			fixed.removeAttr('style').removeClass('scroll');
		} else if($(window).scrollTop() >= pointStart && $(window).scrollTop() <= pointEnd){
			fixed.removeAttr('style').addClass('scroll');
			fixed.width(fixed.parent().width());
		} else if($(window).scrollTop() > pointEnd){
			fixed.removeAttr('style').removeClass('scroll');
			var marginTop = base.outerHeight() - fixed.height();
			fixed.css('margin-top',marginTop);
		}
	}

}

function textareaFlex(){

	$.each($('textarea[data-autoresize]'), function() {
		var offset = this.offsetHeight - this.clientHeight;
		var resizeTextarea = function(el) {
			$(el).css('height', 'auto').css('height', el.scrollHeight + offset);
		};
		$(this).on('keyup input', function() { resizeTextarea(this); }).removeAttr('data-autoresize');
	});

}

function ComboBox(e){
	console.log(e)
	var editElement = document.getElementById(e);
	editElement.value="";
	this.edit = editElement;
	var parent = editElement.parentNode;
	var t = parent.getElementsByTagName("DIV");
	this.dropdownlist = t[0];
	this.currentitem = null;
	this.currentitemindex = null;
	this.visiblecount = 0;
	var n = this;
	var r = parent.getElementsByTagName("SPAN");
	r[0].onclick = function(){
		n.edit.focus()
	};
	this.edit.onfocus = function(){
		n.dropdownlist.style.display="block"
	};
	this.edit.onblur=function(){
		if(i)setTimeout(function(){
			n.dropdownlist.style.display="none"
		},150);
	};

	var i=true;
	n.dropdownlist.onmousedown=function(e){
		i=false;
		return false;
	};

	n.dropdownlist.onmouseup=function(e){
		setTimeout(function(){i=true},150);
		return false;
	};

	this.listitems=this.dropdownlist.getElementsByTagName("A");


	this.edit.onkeydown=function(e){
		e=e||window.event;
		if(e.keyCode==38){
			var t=0;
			if(n.visiblecount>0){
				if(n.visiblecount==1){
					n.currentitemindex=n.listitems.length-1;
				}
				do{
					n.currentitemindex--;t++;
				}while(n.currentitemindex>0&&n.listitems[n.currentitemindex].style.display=="none");
		if(n.currentitemindex<0)
			n.currentitemindex=n.listitems.length-1;
		if(n.currentitem){
			n.currentitem.className=n.currentitem.className.replace(/light/g,"");
		}
		n.currentitem=n.listitems[n.currentitemindex];
		n.currentitem.className+=" light";
		n.currentitem.scrollIntoView(false);
	}

e.cancelBubble=true;
	if(navigator.appName!="Microsoft Internet Explorer"){
		e.preventDefault();
		e.stopPropagation();
	}
	return false;
}else if(e.keyCode==40){
	var r=0;
	if(n.visiblecount>0){
		do{
			n.currentitemindex++
		}while(n.currentitemindex<n.listitems.length&&n.listitems[n.currentitemindex].style.display=="none");
	if(n.currentitemindex>=n.listitems.length)
		n.currentitemindex=0;
	if(n.currentitem){
		n.currentitem.className=n.currentitem.className.replace(/light/g,"");
	}
	n.currentitem=n.listitems[n.currentitemindex];
	n.currentitem.className+=" light";
	n.currentitem.scrollIntoView(false);
}
e.cancelBubble=true;
if(navigator.appName!="Microsoft Internet Explorer"){
	e.preventDefault();
	e.stopPropagation();
}
return false;
}
};
this.edit.onkeyup=function(e){
	e=e||window.event;
	if(e.keyCode==13){
		if(n.visiblecount!=0){
			var t=n.currentitem.innerHTML;
			t=t.replace(/\<b\>/ig,"");
			t=t.replace(/\<\/b\>/ig,"");
			n.edit.value=t;
		}
		n.dropdownlist.style.display="none";
		e.cancelBubble=true;
		return false;
	}else{
		n.dropdownlist.style.display="block";
		n.visiblecount=0;
		if(n.edit.value==""){
			for(var r=0;r<n.listitems.length;r++){
				n.listitems[r].style.display="block";
				n.visiblecount++;
				var i=n.listitems[r].innerHTML;
				i=i.replace(/\<b\>/ig,"");
				n.listitems[r].innerHTML=i.replace(/\<\/b\>/ig,"");
			}
		}else{
			var s=new RegExp("("+n.edit.value+")","i");
			for(var r=0;r<n.listitems.length;r++){
				var i=n.listitems[r].innerHTML;
				i=i.replace(/\<b\>/ig,"");
				i=i.replace(/\<\/b\>/ig,"");
				if(s.test(i)){
					n.listitems[r].style.display="block";
					n.visiblecount++;
					n.listitems[r].innerHTML=i.replace(s,"<b>$1</b>");
				}else{
					n.listitems[r].style.display="none";
				}
			}
		}
	}
}
}
