import '../imports/ui/layouts/layouts.js';
import '../imports/ui/home/home.js';
import '../imports/ui/users/users.js';
import '../imports/ui/activos/activos.js';
import '../imports/ui/accesos/accesos.js';
import '../imports/ui/chat/chat.js';
import '../imports/ui/empleados/empleados.js';
import '../imports/ui/generales/generales.js';
import '../imports/ui/proveedores/proveedores.js';
import '../imports/ui/proyectandos/proyectandos.js';
import '../imports/ui/puestos/puestos.js';
import '../imports/ui/socios/socios.js';
import '../imports/ui/sucursales/sucursales.js';


Meteor.startup(function(){
  for(var property in Template){
    // check if the property is actually a blaze template
    if(Blaze.isTemplate(Template[property])){
      var template=Template[property];
      // assign the template an onRendered callback who simply prints the view name
      template.onRendered(function(){
			
		$('.table').bootstrapTable({});
      });
    }
  }
});


Template.base.events({
	"click a.logins":function(event,template)
	{
		event.preventDefault();
		Modal.show('modallogin');
	},
	"click .modal-control":function(event,template)
	{
		event.preventDefault();
		Modal.show(event.currentTarget.getAttribute('data-tipo'));
	},
	"click .navbar-toggle":function(event,template)
	{
		event.preventDefault();
		return $('body, html').toggleClass("nav-open");
	}

});



	
