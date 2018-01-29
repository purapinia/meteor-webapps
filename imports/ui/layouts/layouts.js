import './menu.html';
import './footer.html';
import './top.html';
import './help.html';
import './base.html';
import './login.html';
import './inicio.html';


var validation=$.validator;

validation.setDefaults({
		rules:{
				login_correo:{
				required:true
			},
				login_password:{
				required:true
			}
			},
		messages:{
				login_correo:{
					required:"Introduzca texto"
				},
				login_password:{
					required:"Introduzca texto"
				}
			}
		
});
//TOP
Template.top.events({
	"click .logout":function(event,template){
		event.preventDefault();
		Meteor.logout();
	}
});


//LOGIN
Template.modallogin.onRendered(function(){
	validator=$('#form_login').validate(validation);
});

Template.modallogin.events({
	"submit #form_login":function(event,template){
		event.preventDefault();
		var user=template.find('#login_correo').value;
		var contrasena=template.find('#login_password').value;
		var cliente=template.find('#login_cliente').value;		

		Meteor.loginWithPassword(user,contrasena);
		Modal.hide('modallogin');
		
	},
	"click #crearusu":function(event,template){
		
		var user=template.find('#login_correo').value;
		var contrasena=template.find('#login_password').value;
		var cliente=template.find('#login_cliente').value;		
		alert(user+' '+contrasena+' '+cliente);	

		 
		var usuario={
			email:user,
			password:contrasena
		}
		Accounts.createUser(usuario,function (err){
			console.log(Meteor.user());
			Modal.hide('modallogin');

		});
		console.log('submit form');
		return false;
	}
});








