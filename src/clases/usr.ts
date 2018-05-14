export class User {

  public nombre : string;
  public clave : string;
  public email : string;
  public uid : string;

  constructor(nombre? : string, email? : string, uid? : string) {
  	this.nombre = nombre;
  	this.email = email;
  	this.uid = uid;
  }

  formatUser(usr: User ,data : any) : any{
  	delete usr.clave;
    return {uid:data.uid, nombre:usr.nombre, email:data.email};
  }


}