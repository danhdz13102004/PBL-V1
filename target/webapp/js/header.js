let isUserLogin = true;
let currentPath = document.location.pathname;
export const getCurrentPath = () => currentPath;
export const setCurrentPath = (path) => {
  currentPath = path;
};
export const getIsUserLogin = () => isUserLogin;
export const setIsUserLogin = (value) => {
  isUserLogin = value;
};
/*export const initHeader = (shadowRoot, isUserLogin) => {
  const buttonWrap = shadowRoot.querySelector(`.button__wrap`);
  const btnSignup = shadowRoot.getElementById(`btnSignup`);
  const btnLogin = shadowRoot.getElementById(`btnLogin`);
  const headerUser = shadowRoot.querySelector(
    `.header-menu .header-menu__item:last-child .header-menu__wrap`
  );
  const headerCartNotice = shadowRoot.querySelector(`.header-cart__notice`);
  const headerCartEmpty = shadowRoot.querySelector(`.header-cart__list--empty`);
  const headerCartList = shadowRoot.querySelector(`.header-cart__list`);*/

  // Hide or show element with user login status
/*  buttonWrap.classList.toggle(`hidden`, isUserLogin);
  headerUser.classList.toggle(`hidden`, !isUserLogin);
  headerCartNotice.classList.toggle(`hidden`, !isUserLogin);
  headerCartEmpty.classList.toggle(
    `hidden`,
    isUserLogin && parseInt(headerCartNotice.innerHTML) > 0
  );
  headerCartList.classList.toggle(
    `hidden`,
    !isUserLogin || parseInt(headerCartNotice.innerHTML) === 0
  );*/

  // Hide btnSignin when stand in login page
/*  btnLogin.classList.toggle(`hidden`, currentPath === `/login.html`);
  btnSignup.classList.toggle(`hidden`, currentPath === `/signup.html` || currentPath === `/verifyemail.html`);

  // Change Searchbar size and position if path isn't homepage (index.html)
  const headerSearchBarColumn = shadowRoot.querySelector(
    `.header .row div:is(.col-lg-5)`
  );
  const headerMenuColumn = shadowRoot.querySelector(
    `.header .row div:is(.col-lg-4)`
  );*/

/*class Header extends HTMLElement {
  fetchCSSFile = async (filePath) => {
    try {
      const response = await fetch(filePath);
      const cssText = await response.text();
      const style = document.createElement("style");
      style.textContent = cssText;
      this.shadowRoot.appendChild(style);
    } catch (err) {
      console.error(err);
    }
  };
  headerReadyEvent = new CustomEvent(`headerReady`);
  fetchHTMLFile = async (filePath) => {
    try {
      const response = await fetch(filePath);
      const htmlText = await response.text();
      const html = new DOMParser().parseFromString(htmlText, "text/html");
      const headerTemplate = document.createElement(`template`);
      headerTemplate.innerHTML = html.body.innerHTML;
      this.shadowRoot.appendChild(headerTemplate.content.cloneNode(true));
      this.dispatchEvent(this.headerReadyEvent);
    } catch (err) {
      console.error(err);
    }
  };
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
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
    this.fetchCSSFile("assets/css/header.css").then(() => {
      this.fetchHTMLFile("header.html").then(() => {
        initHeader(this.shadowRoot, isUserLogin);
      });
    });
  }
}
customElements.define("header-component", Header);*/

// View cart detail when click on #btnViewCartDetail
/*document
  .querySelector(`header-component`)
  .addEventListener(`headerReady`, () => {
    let shadowRoot = document.querySelector(`header-component`).shadowRoot;
    const btnViewCartDetail = shadowRoot.querySelector(`#btnViewCartDetail`);
    
    btnViewCartDetail.addEventListener(`click`, () => {
      window.location.href = `/cartdetail.html`;
    });
  });
*/