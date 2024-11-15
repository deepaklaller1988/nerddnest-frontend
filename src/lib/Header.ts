export default class Header {
  static title = "";

  static async setHeader(title: string) {
    const headerTitleElement = document.getElementById('header-title');
        if (headerTitleElement) {
          headerTitleElement.innerHTML = title;
        }
  }

}