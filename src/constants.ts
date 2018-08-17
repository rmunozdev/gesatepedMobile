export class GesatepedConstants {

  public static GESATEPED_WS:string = GesatepedConstants.resolveEndpoint();

  private static resolveEndpoint(): string {
    if(typeof window['cordova'] === 'undefined') {
      return "http://localhost:8100/proxied";
    } else {
      return "https://educlapp.azurewebsites.net";
      //return "http://educlappnew.azurewebsites.net";
      //return "https://rmunozdev.appspot.com";
    }
  }

  public static CHOFER_LIST_URL:string = GesatepedConstants.GESATEPED_WS + "/despachos/choferes";

  public static PEDIDO_LIST_URL:string = GesatepedConstants.GESATEPED_WS + "/despachos/ruta/";

}
