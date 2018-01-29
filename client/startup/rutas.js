import {Router} from 'meteor/iron:router';

Meteor.startup(function(){

	Router.onBeforeAction(function (){
		if(!Meteor.userId())
		{
			Modal.show('modallogin');
		}
		this.next();
	});

	



	Router.configure ({
		layoutTemplate: 'base'
	});
	Router.route ('/',{
		name: 'home'
	});
	Router.route ('/users',{
		name: 'users'
	});
	Router.route ('/activos',{
		name: 'activos'
	});
	Router.route ('/help',{
		name: 'help'
	});
	Router.route ('/accesos',{
		name: 'accesos'
	});
	Router.route ('/chat',{
		name: 'chat'
	});
	Router.route ('/empleados',{
		name: 'empleados'
	});
	Router.route ('/generales',{
		name: 'generales'
	});
	Router.route ('/proyectandos',{
		name: 'proyectandos'
	});
	Router.route ('/proveedores',{
		name: 'proveedores'
	});
	Router.route ('/puestos',{
		name: 'puestos'
	});
	Router.route ('/socios',{
		name: 'socios'
	});
	Router.route ('/sucursales',{
		name: 'sucursales'
	});
	

});

