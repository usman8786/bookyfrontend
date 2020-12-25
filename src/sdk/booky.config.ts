export class BookyConfig {
  private static path = "https://bookyionicapp.herokuapp.com/";

  public static getPath(): string {
    return BookyConfig.path;
  }
}
