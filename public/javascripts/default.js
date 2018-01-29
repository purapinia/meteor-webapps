
$( document ).ready(function() {

    	//$('#side-menu').metisMenu();
	//$( '#page-wrapper' ).fadeTo(200,1);	



	CargarLogout();
	CargaFormatoCampos();
	//CargarCambioContenidos();
	CargaHash();
		

});

//Menu lateral
    $('.navbar-toggle').click(function() {
      return $('body, html').toggleClass("nav-open");
    });
 /*
     * =============================================================================
     *   Nestable
     * =============================================================================
     */
    if ($('.nestable-list').length) {
      updateOutput = function(e) {
        var list, output;
        list = (e.length ? e : $(e.target));
        output = list.data("output");
        if (window.JSON) {
          return output.val(window.JSON.stringify(list.nestable("serialize")));
        } else {
          return output.val("JSON browser support required for this demo.");
        }
      };
      $("#nestable").nestable({
        group: 1
      }).on("change", updateOutput);
      
      updateOutput($("#nestable").data("output", $("#nestable-output")));

    }


  /*  $("#nestable-menu").on("click", function(e) {
      var action, target;
      target = $(e.target);
      action = target.data("action");
      if (action === "expand-all") {
        $(".dd").nestable("expandAll");
      }
      if (action === "collapse-all") {
        return $(".dd").nestable("collapseAll");
      }
    });
    return $("#nestable").nestable();
  });

}).call(this);
*/





 bandera=0;

//Modales normales de contenido, formularios

 
var auxobject;
function CargarSubmitABC()
{
		$(document.getElementsByClassName("form-ABC")).on('submit', function(e)
		{
			auxobject=this;			
        		e.preventDefault();
			
			if(ValidarFormulario(this))
			{
				$('#form-mensaje', this).html('<div class="alert alert-info">Realizando los cambios</div>');
				
				var idbase = $(this).attr('data-id');				
				var formABC = $(this).attr('data-form');
				var tipoABC= $(this).attr('data-tipo');
				
					$.ajax(
					{
					    	type:       'POST',
						dataType: 'JSON',
					    	url:        'controlador.php',
						'beforeSend' : function(xhr) {
						xhr.overrideMimeType('text/html; charset=iso-8859-1');
					},		
					    	data:       $(auxobject).serialize()+'&formABC='+formABC +'&idbase='+idbase+'&tipoABC='+tipoABC+'' ,
					    	success: function(data) 
						{
						
							if(data['error'])
							{
								$('#form-mensaje', auxobject).html('<div class="alert alert-danger">'+data['error']+'</div>');	
							}
							else
							{
								$('#form-mensaje', auxobject).html('<div class="alert alert-success">'+data['success']+'</div>');	

							
								setTimeout(
								  function() 
								  {
								    $(auxobject.parentElement.parentElement.parentElement).modal('hide');	
								    $(auxobject.parentElement.parentElement.parentElement.parentElement).modal('hide');	
										RecargarListas();	
										location.reload();	
								  }, 500);

											
							}
					    	},
						error:function(xhr, ajaxOptions, thrownError)
						{ 
							cadena=xhr.responseText;
							ban=1;
							if(/Cannot delete or update a parent row/.test(cadena))
							{
								$('#form-mensaje', auxobject).html("<div class='alert alert-danger'>Error:Debe eliminar o editar primero los elementos que estan relacionados</div>");	
								ban=0;
							}
							if(/Duplicate entry/.test(cadena))
							{
								$('#form-mensaje', auxobject).html("<div class='alert alert-danger'>Error:Existe un dato ya registrado con datos similares</div>");
								ban=0;
							}
							if(ban==1)
								$('#form-mensaje', auxobject).html("<div class='alert alert-danger'>"+xhr.responseText+"</div>");	
						}
					});
				}
	    	});	
}

function ValidarFormulario(form){
	var $val=0;

    $(form).find("input.required").each(function(){
        if (($(this).val())== ""){
              $(this.parentElement.parentElement).addClass("has-error");
              $val = 1
        }
        else{
            $(this.parentElement.parentElement).removeClass("has-error");
        }
     
    });
  // if you want to check select fields 
    $(form).find("select.required").each(function(){
        if ($(this).val()== "" || $(this).val()==null){
              $(this.parentElement.parentElement).addClass("has-error");
              $val = 1
        }
        else{
            $(this.parentElement.parentElement).removeClass("has-error");
        }
     
    });
	$(form).find("textarea.required").each(function(){
        if (($(this).val())== ""){
              $(this.parentElement.parentElement).addClass("has-error");
              $val = 1
        }
        else{
            $(this.parentElement.parentElement).removeClass("has-error");
        }
     
    });


    if ($val > 0) {
       $('#form-mensaje', auxobject).html('<div class="alert alert-danger">Por favor verifique los campos resaltados en rojo</div>');	
        return false;

 }
	else
	{return true}

}

function CargarLogout()
{
		$(document.getElementsByClassName("btn-logout")).on('click',this, function(e)		
		{
			$.ajax(
			{
			    	type:       'POST',
				dataType:   'html',
			    	url:        'controlador.php',
			    	data:       { logout: '1' },		
			    	success: function(data) 
				{
					location.reload();
			    	}
			});			
	    	});	
}


function RecargaFuncionesAsincronas()
{

	
	if($('.table').length)$('.table').bootstrapTable({});
	CargaFormatoCampos();
	CargaListasAnidadas();

	CargarLogout();


	

}


function RecargarListas()
{

		$('#myModal').find(".lista-recargable").each(function()
		{
			var tipo = $(this).attr('lista-tipo');
			var objetivo= $(this);
			
			$.ajax(
			{
			    	type:       'POST',
				dataType:   'html',
			    	url:        'controlador.php',
			    	data:{listaanidada:tipo,id_padre:this.value},
				success: function(data){					
					$(objetivo).html(data); 
					//alert($(objetivo).attr('lista-tipo'));
				},
				error:function(xhr, ajaxOptions, thrownError){ 
					$('#form-mensaje', auxobject).html("<div class='alert alert-danger'>"+xhr.responseText+" Exeption :"+thrownError+"</div>");	
				}
			});		
			
		});
	
}




function CargaHash()
{

	if(!window.location.hash) 
	{
		//window.location.hash="dashboard";
	}

	if(window.location.hash) 
	{
		if(bandera==0)
		{	
			$('#page-wrapper').fadeTo('fast','0.8');		
			bandera=1;
			var pag =window.location.hash.substring(1, window.location.hash.length);		
				$.ajax(
				{
				    	type:       'POST',
					dataType:   'html',
				    	url:        'controlador.php',
					 contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
				    	data:       { pag: pag },		
					'beforeSend' : function(xhr) {
						xhr.overrideMimeType('text/html; charset=iso-8859-1');
					},			    	
					success: function(data) 
					{
						$('#page-wrapper').html(data);	
						
						if($(".navbar-toggle").css('display')=='block')
							$(".navbar-toggle").click();
						
						RecargaFuncionesAsincronas();		
						bandera=0;
						$('#page-wrapper').fadeTo('fast','1');	
						//location.reload();
				    	},
					error: function(data) 
					{
						alert('Revise su conexión a internet');
						bandera=0;
						//location.reload();
				    	}
				});		
		}
	 
	} 
}

var otrosdiv;
function CargaOtros(pagina,divid)
{
	
	if(bandera==0)
		{	
			otrosdiv=divid;
	
			$('#'+otrosdiv).fadeTo('fast','0.8');		
			bandera=1;
			var pag =window.location.hash.substring(1, window.location.hash.length);		
				$.ajax(
				{
				    	type:       'GET',
					dataType:   'html',
				    	url:        'controlador.php?otros='+pagina,
					 contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
				    	//data:       { pag: pag },		
					'beforeSend' : function(xhr) {
						xhr.overrideMimeType('text/html; charset=iso-8859-1');
					},			    	
					success: function(data) 
					{
						
						$('#'+otrosdiv).html(data);	
						RecargaFuncionesAsincronas();		
						bandera=0;
						$('#'+otrosdiv).fadeTo('fast','1');	
						//location.reload();
				    	},
					error: function(data) 
					{
						alert('Revise su conexión a internet');
						bandera=0;
						//location.reload();
				    	}
				});		
		}
	 
	
}


function CargaListasAnidadas()
{

	$(document.getElementsByClassName("lista-anidada")).on('change',this, function(e)		
	{

		var tipos = $(this).attr('lista-tipo-target').split('-');
		var objetivos= $(this).attr('lista-id-target').split('-');
		
				
		if(tipos.length>0)
		{
			tipo=tipos[0];
			objetivo=objetivos[0];
			$.ajax(
			{
			    	type:       'POST',
				dataType:   'html',
			    	url:        'controlador.php',
			    	data:{listaanidada:tipo,id_padre:this.value},
				success: function(data){	
						$('#'+objetivo).html(data); 
								
				},
				error:function(xhr, ajaxOptions, thrownError){ 
					$('#form-mensaje', auxobject).html("<div class='alert alert-danger'>"+xhr.responseText+" Exeption :"+thrownError+"</div>");	
				}
			});	
		}		
		
		
		
		if(tipos.length>1)
		{
			tipo=tipos[1];
			objetivo1=objetivos[1];
			$.ajax(
			{
			    	type:       'POST',
				dataType:   'html',
			    	url:        'controlador.php',
			    	data:{listaanidada:tipo,id_padre:this.value},
				success: function(data){	
						$('#'+objetivo1).html(data); 
								
				},
				error:function(xhr, ajaxOptions, thrownError){ 
					$('#form-mensaje', auxobject).html("<div class='alert alert-danger'>"+xhr.responseText+" Exeption :"+thrownError+"</div>");	
				}
			});	
		}		
		
		
		if(tipos.length>2)
		{
			tipo=tipos[2];
			objetivo2=objetivos[2];
			$.ajax(
			{
			    	type:       'POST',
				dataType:   'html',
			    	url:        'controlador.php',
			    	data:{listaanidada:tipo,id_padre:this.value},
				success: function(data){	
						$('#'+objetivo2).html(data); 
								
				},
				error:function(xhr, ajaxOptions, thrownError){ 
					$('#form-mensaje', auxobject).html("<div class='alert alert-danger'>"+xhr.responseText+" Exeption :"+thrownError+"</div>");	
				}
			});	
		}		
		
   	});	

}


//formatos de campos
function CargaFormatoCampos()
{
	$($("[data-keyup]")).on('keyup',this, function(e)		
	{		
			array=$(this).attr('data-keyup').split("-");
			Formato(this,array[0],array[1],array[2],array[3]);
	});	
	$($("[data-change]")).on('change',this, function(e)		
	{		
			array=$(this).attr('data-change').split("-");
			Formato(this,array[0],array[1],array[2],array[3]);
	});	
	
	$($("[data-hidden-change]")).on('change',this, function(e)		
	{		
			array=$(this).attr('data-hidden-change').split("-");
			if(this.value==array[1])
			{
				$('.'+array[0]).removeClass('hidden');
				$('.'+array[0]+' select').prop('disabled',false);
				$('.'+array[0]+' input').prop('disabled',false);
			}
	
			else
			{
				$('.'+array[0]).addClass('hidden');
				$('.'+array[0]+' select').prop('disabled',true);
				$('.'+array[0]+' input').prop('disabled',true);
			}

	});	


}




function Formato(objeto,tipo,limit_inferior,limit_superior,fix)
{
	if(tipo=='mayusculas')
	{
		var string=$(objeto).val();
		$(objeto).val(string.toUpperCase());	
	}
	if(tipo=='minusculas')
	{
		var string=$(objeto).val();
		$(objeto).val(string.toLowerCase());	
	}
	if(tipo=='moneda')
	{
		var string=$(objeto).val();
		$(objeto).val(FormatoMoneda(string,limit_inferior,limit_superior));	
	}
	if(tipo=='numero')
	{
		var string=$(objeto).val();
		$(objeto).val(FormatoNumero(string,limit_inferior,limit_superior,fix));	
	}
	if(tipo=='porcentaje')
	{
		var string=$(objeto).val();
		$(objeto).val(FormatoPorcentaje(string,limit_inferior,limit_superior));	
	}

}


function FormatoNumero(numero,limit_inferior,limit_superior,fix)
{
	limit_inferior=ExtraerNumero(limit_inferior);
	limit_superior=ExtraerNumero(limit_superior);
	numero=ExtraerNumero(numero);
	if (!parseFloat(numero)) numero="0";
	numero=parseFloat(numero).toFixed(fix);
	if(numero<parseFloat(limit_inferior) && limit_inferior!=null) return agregar_miles(parseFloat(limit_inferior).toFixed(fix));
	if(numero>parseFloat(limit_superior) && limit_superior!=null) return agregar_miles(parseFloat(limit_superior).toFixed(fix));
	return agregar_miles(numero);
}
function FormatoMoneda(numero,limit_inferior,limit_superior)
{
	limit_inferior=ExtraerNumero(limit_inferior);
	limit_superior=ExtraerNumero(limit_superior);
	var decimales=2;
	numero=ExtraerNumero(numero);
	if (!parseFloat(numero)) numero="0";
	numero=parseFloat(numero).toFixed(decimales);
	if(numero<parseFloat(limit_inferior) && limit_inferior!=null) return "$"+agregar_miles(parseFloat(limit_inferior).toFixed(decimales));
	if(numero>parseFloat(limit_superior) && limit_superior!=null) return "$"+agregar_miles(parseFloat(limit_superior).toFixed(decimales));
	numero=agregar_miles(numero);
	
	return "$"+numero;

}


function FormatoPorcentaje(numero,limit_inferior,limit_superior)
{
	limit_inferior=ExtraerNumero(limit_inferior);
	limit_superior=ExtraerNumero(limit_superior);
	var decimales=2;
	numero=ExtraerNumero(numero);
	if (!parseFloat(numero)) numero="0";
	numero=parseFloat(numero).toFixed(decimales);
	if(numero<parseFloat(limit_inferior) && limit_inferior!=null) return agregar_miles(parseFloat(limit_inferior).toFixed(decimales))+'%';
	if(numero>parseFloat(limit_superior) && limit_superior!=null) return agregar_miles(parseFloat(limit_superior).toFixed(decimales))+'%';
	numero=agregar_miles(numero);
	
	return numero+'%';

}


/*Funcion especial uso de formatos*/
function agregar_miles(numero)
{
	
	var partes=numero.toString().split('.');
	var miles=new RegExp("(-?[0-9]+)([0-9]{3})"),separador_miles=',';
        while(miles.test(partes[0])) {
            partes[0]=partes[0].replace(miles, "$1" + separador_miles + "$2");
        }
	if(partes.length>1)	
		return partes[0]+'.'+partes[1];
	 if(partes.length==1)
	     return partes[0];
}
function ExtraerNumero(string)
{
	string=",$%"+string;
	string=string.replace(/\%/g,"").replace(/\$/g,"").replace(/,/g,"");
	return string;
}
function campoNumero(e) 
{ 
var key = window.Event ? e.which : e.keyCode 
return ((key >= 48 && key <= 57) || (key==8)) 
}


function DescargaArchivo(url)
{
	//window.open(url,'','width=600,height=400,left=50,top=50,toolbar=yes');
	document.location=url;
}






//callbakc
var MyRequestsCompleted = (function() {
    var numRequestToComplete, 
        requestsCompleted, 
        callBacks, 
        singleCallBack; 

    return function(options) {
        if (!options) options = {};

        numRequestToComplete = options.numRequest || 0;
        requestsCompleted = options.requestsCompleted || 0;
        callBacks = [];
        var fireCallbacks = function () {
            for (var i = 0; i < callBacks.length; i++) callBacks[i]();
        };
        if (options.singleCallback) callBacks.push(options.singleCallback);

        

        this.addCallbackToQueue = function(isComplete, callback) {
            if (isComplete) requestsCompleted++;
            if (callback) callBacks.push(callback);
            if (requestsCompleted == numRequestToComplete) fireCallbacks();
        };
        this.requestComplete = function(isComplete) {
            if (isComplete) requestsCompleted++;
            if (requestsCompleted == numRequestToComplete) fireCallbacks();
        };
        this.setCallback = function(callback) {
            callBacks.push(callBack);
        };
    };
    })();






 
