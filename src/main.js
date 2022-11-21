	// funcion para la creación de la tabla en la página web
	function newtab(evt, opcion) {
		// Declare all variables
		var i, tabcontent, tablinks;
	  
		// oculta todos los elementos
		tabcontent = document.getElementsByClassName("tabcontent");
		for (i = 0; i < tabcontent.length; i++) {
		  tabcontent[i].style.display = "none"; //los desactiva
		}
	  
		// coge todas los botones y los desactiva
		tablinks = document.getElementsByClassName("tablinks");
		for (i = 0; i < tablinks.length; i++) {
		  tablinks[i].className = tablinks[i].className.replace("active", "");
		}
	  
		// coge el elemento con el id de la opcion querida y activa su contenido
		document.getElementById(opcion).style.display = "block"; //block hace que el elemento se represente como un bloque
		evt.currentTarget.className += " active";
	  }
	  function openNav() {
        document.getElementById("myNav").style.width = "100%";
      }
      
      function closeNav() {
        document.getElementById("myNav").style.width = "0%";
      }

	  