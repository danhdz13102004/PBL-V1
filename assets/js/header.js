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
export const initHeader = (shadowRoot, isUserLogin) => {
  const buttonWrap = shadowRoot.querySelector(`.button__wrap`);
  const btnSignup = shadowRoot.getElementById(`btnSignup`);
  const btnLogin = shadowRoot.getElementById(`btnLogin`);
  const headerUser = shadowRoot.querySelector(
    `.header-menu .header-menu__item:last-child .header-menu__wrap`
  );
  const headerCartNotice = shadowRoot.querySelector(`.header-cart__notice`);
  const headerCartEmpty = shadowRoot.querySelector(`.header-cart__list--empty`);
  const headerCartList = shadowRoot.querySelector(`.header-cart__list`);

  // Hide or show element with user login status
  buttonWrap.classList.toggle(`hidden`, isUserLogin);
  headerUser.classList.toggle(`hidden`, !isUserLogin);
  headerCartNotice.classList.toggle(`hidden`, !isUserLogin);
  headerCartEmpty.classList.toggle(
    `hidden`,
    isUserLogin && parseInt(headerCartNotice.innerHTML) > 0
  );
  headerCartList.classList.toggle(
    `hidden`,
    !isUserLogin || parseInt(headerCartNotice.innerHTML) === 0
  );

  // Hide btnSignin when stand in login page
  btnLogin.classList.toggle(`hidden`, currentPath === `/login.html`);
  btnSignup.classList.toggle(
    `hidden`,
    currentPath === `/signup.html` || currentPath === `/verifyemail.html`
  );

  // Change Searchbar size and position if path isn't homepage (index.html)
  const headerSearchBarColumn = shadowRoot.querySelector(
    `.header .row .col-lg-5`
  );
  const headerMenuColumn = shadowRoot.querySelector(`.header .row .col-lg-4`);
  if (currentPath !== `/index.html`) {
    headerSearchBarColumn.removeAttribute(`class`);
    headerSearchBarColumn.setAttribute(`class`, `col-lg-6`);
    headerSearchBarColumn.style.paddingLeft = `0rem`;
    headerSearchBarColumn.style.paddingRight = `0rem`;
    headerMenuColumn.removeAttribute(`class`);
    headerMenuColumn.setAttribute(`class`, `col-lg-3`);
  }
};
class Header extends HTMLElement {
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
        this.addEventListener(
          `headerReady`,
          initHeader(this.shadowRoot, isUserLogin)
        );
      });
    });
  }
}
customElements.define("header-component", Header);

document
  .querySelector(`header-component`)
  .addEventListener(`headerReady`, () => {
    let shadowRoot = document.querySelector(`header-component`).shadowRoot;

    // View cart detail when click on #btnViewCartDetail
    const btnViewCartDetail = shadowRoot.querySelector(`#btnViewCartDetail`);

    btnViewCartDetail.addEventListener(`click`, () => {
      window.location.href = `/cartdetail.html`;
    });

    // Goto user account management
    const userAccountInfo = shadowRoot.querySelector(`#header-user__info`);
    const userOrder = shadowRoot.querySelector(`#header-user__order`);
    const userReview = shadowRoot.querySelector(`#header-user__review`);
    const userQuit = shadowRoot.querySelector(`#header-user__logout`);
    userAccountInfo.addEventListener(`click`, () => {
      gotoAccountPage("info");
    });
    userOrder.addEventListener(`click`, () => {
      gotoAccountPage("order");
    });
    userReview.addEventListener(`click`, () => {
      gotoAccountPage("review");
    });
    userQuit.addEventListener(`click`, () => {
      // Logout
      let modalLogout = shadowRoot.querySelector(`#modal__account-logout`);
      if (!modalLogout) {
        modalLogout = document.createElement(`div`);
        modalLogout.setAttribute(`class`, `modal`);
        modalLogout.setAttribute(`id`, `modal__account-logout`);
        modalLogout.innerHTML = `
      <style>
        #modal__account-logout .modal__body{
          padding: 2rem 2.4rem;
        }
        #modal__account-logout .logout__inner{
          font-size: 1.6rem;
        }
        .logout__container{
          display: flex;
          flex-direction: column;
        }
        .logout__head{
          display: flex;
          align-items: center;
          margin-bottom: 1.6rem;
        }
        .logout__alert-icon{
          filter: brightness(0) saturate(100%) invert(61%) sepia(79%) saturate(3155%) hue-rotate(356deg) brightness(100%) contrast(98%);
          fill: var(--yellow-color);
          width: 2.6rem;
          height: 2.6rem;
          margin-right: 0.8rem;
        }
        #modal__account-logout .logout__content-wrap{
          background-color: var(--white-color);
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-bottom: 2.4rem;
        }
        #modal__account-logout .logout__title{
          font-size: 2rem;
          font-weight: 500;
          line-height: 2.4rem;
        }
        #modal__account-logout .logout__content{
          font-size: 1.6rem;
          line-height: 2rem;
        }
        #modal__account-logout .logout__action-wrap{
          display: flex;
          align-items: center;
          justify-content: center;
        }
        #logout__action-cancel{
          margin-right: 1.6rem;
          width: 50%;
          height: 4.2rem;
        }
        #logout__action-confirm{
          width: 50%;
          height: 4.2rem;
        }
      </style>
      <div class="modal__overlay"></div>
      <div class="modal__body">
        <div class="modal__inner logout__inner">
          <div class="logout__container">
            <div class="logout__head">
            <svg class="modal__alert-icon logout__alert-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path fill="#000000"
              d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256zm0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4z" />
            </svg>
              <div class="logout__title">Thông báo</div>
            </div>
            <div class="logout__content-wrap">
              <div class="logout__content">Bạn có chắc chắn muốn đăng xuất?</div>
            </div>
          </div>
          <div class="logout__action-wrap">
            <button class="button" id="logout__action-cancel">Hủy</button>
            <button class="button" id="logout__action-confirm">Đăng xuất</button>
          </div>
        </div>
      </div>
      `;
        document.body.appendChild(modalLogout);
      }
      modalLogout.style.display = `flex`;
      const btnCancelLogout = modalLogout.querySelector(
        `#logout__action-cancel`
      );
      if (!btnCancelLogout.dataset.bound) {
        btnCancelLogout.addEventListener(`click`, () => {
          modalLogout.style.display = `none`;
        });
        btnCancelLogout.dataset.bound = true;
      }
      const overlay = modalLogout.querySelector(`.modal__overlay`);
      overlay.addEventListener(`click`, () => {
        modalLogout.style.display = `none`;
      });
      const btnConfirmLogout = modalLogout.querySelector(
        `#logout__action-confirm`
      );
      if (!btnConfirmLogout.dataset.bound) {
        btnConfirmLogout.addEventListener(`click`, () => {
          localStorage.removeItem(`user`);
          modalLogout.style.display = `none`;
          window.location.reload();
        });
        btnConfirmLogout.dataset.bound = true;
      }
    });
  });

const gotoAccountPage = (option) => {
  window.location.href = `useraccount.html?${option}`;
};
