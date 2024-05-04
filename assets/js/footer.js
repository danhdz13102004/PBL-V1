class Footer extends HTMLElement {
  fetchCSSFile = async (filePath) => {
    try{
      const response = await fetch(filePath);
      const cssText = await response.text();
      const style = document.createElement(`style`);
      style.textContent = cssText;
      this.shadowRoot.appendChild(style);
    }
    catch(err){
      console.error(err);
    }
  }
  fetchHTMLFile = async(filePath) => {
    try{
      const response = await fetch(filePath);
      const htmlText = await response.text();
      const html = new DOMParser().parseFromString(htmlText,`text/html`);
      const footerTemplate = document.createElement(`template`);
      footerTemplate.innerHTML = html.body.innerHTML;
      this.shadowRoot.appendChild(footerTemplate.content.cloneNode(true));
    }
    catch(err){
      console.error(err);
    }
  }
  constructor() {
    super();
    this.attachShadow({mode: "open"});
  }
  connectedCallback() {
    const linkNormalize = document.createElement(`link`);
    linkNormalize.setAttribute(`rel`, `stylesheet`);
    linkNormalize.setAttribute(`href`, `assets/css/normalize.css`);
    this.shadowRoot.appendChild(linkNormalize);
    const linkBase = document.createElement(`link`);
    linkBase.setAttribute(`rel`, `stylesheet`);
    linkBase.setAttribute(`href`, `assets/css/base.css`);
    this.shadowRoot.appendChild(linkBase);
    this.fetchCSSFile("assets/css/footer.css");
    this.fetchHTMLFile("footer.html");
  }
}
customElements.define("footer-component",Footer)
