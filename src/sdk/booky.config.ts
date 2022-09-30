export class BookyConfig {
  private static path = "http://localhost:3000";
  // private static path = "https://bookyionicapp.herokuapp.com";
  public static getPath(): string {
    return BookyConfig.path;
  }
}
