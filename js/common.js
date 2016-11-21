function changeBG(){
	/**/
	var x = Math.floor((Math.random() * 90) + 1);
	if((x >= 1)&&(x < 10)){
		document.getElementById("abcxyz").style.backgroundImage = "url('images/444.jpg')";
		//alert(x);
	}else if((x >= 10)&&(x < 20)){
		document.getElementById("abcxyz").style.backgroundImage = "url('images/555.jpg')";
		//alert(x);
	}else if((x >= 20)&&(x < 30)){
		document.getElementById("abcxyz").style.backgroundImage = "url('images/666.jpg')";
		//alert(x);
	}else if((x >= 30)&&(x < 40)){
		document.getElementById("abcxyz").style.backgroundImage = "url('images/444.jpg')";
		//alert(x);
	}else if((x >= 40)&&(x < 50)){
		document.getElementById("abcxyz").style.backgroundImage = "url('images/555.jpg')";
		//alert(x);
	}else if((x >= 50)&&(x < 60)){
		document.getElementById("abcxyz").style.backgroundImage = "url('images/666.jpg')";
		//alert(x);
	}else if((x >= 60)&&(x < 70)){
		document.getElementById("abcxyz").style.backgroundImage = "url('images/444.jpg')";
		//alert(x);
	}else if((x >= 70)&&(x < 80)){
		document.getElementById("abcxyz").style.backgroundImage = "url('images/666.jpg')";
		//alert(x);
	}else{
		document.getElementById("abcxyz").style.backgroundImage = "url('images/555.jpg')";
		//alert(x);
	}	
	/**/
}