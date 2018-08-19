export class GesatepedConstants {

  public static GESATEPED_WS:string = GesatepedConstants.resolveEndpoint();

  private static resolveEndpoint(): string {
    if(typeof window['cordova'] === 'undefined') {
      return "http://localhost:8100/proxied";
    } else {
      return "http://192.168.1.2:8080/GesatepedWS";
    }
  }

  public static CHOFER_LIST_URL:string = GesatepedConstants.GESATEPED_WS + "/despachos/choferes";

  public static PEDIDO_LIST_URL:string = GesatepedConstants.GESATEPED_WS + "/despachos/ruta/";
  public static PEDIDO_DETAIL_URL:string = GesatepedConstants.GESATEPED_WS + "/despachos/ruta/pedido/";
  public static MOTIVO_LIST_URL:string = GesatepedConstants.GESATEPED_WS + "/despachos/motivos";
  public static PEDIDO_ATENCION_URL:string = GesatepedConstants.GESATEPED_WS + "/despachos/atencion";
  public static PEDIDO_INCUMPLIMIENTO_URL:string = GesatepedConstants.GESATEPED_WS + "/despachos/incumplimiento";

}
