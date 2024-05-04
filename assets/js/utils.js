export const currentPath = document.location.pathname;
export const initHeader = (isUserLogin, currentPath) => {
    const buttonWrap = document.querySelector(`.button__wrap`);
    const btnSignup = document.getElementById(`btnSignup`);
    const btnLogin = document.getElementById(`btnLogin`);
    const headerUser = document.querySelector(`.header-menu .header-menu__item:last-child .header-menu__wrap`);
    const headerCartNotice = document.querySelector(`.header-cart__notice`);
    const headerCartEmpty = document.querySelector(`.header-cart__list--empty`);
    const headerCartList = document.querySelector(`.header-cart__list`);

    // Hide or show element with user login status
    buttonWrap.classList.toggle(`hidden`, isUserLogin);
    headerUser.classList.toggle(`hidden`, !isUserLogin);
    headerCartNotice.classList.toggle(`hidden`, !isUserLogin);
    headerCartEmpty.classList.toggle(`hidden`, isUserLogin && parseInt(headerCartNotice.innerHTML) > 0);
    headerCartList.classList.toggle(`hidden`, !isUserLogin || parseInt(headerCartNotice.innerHTML) === 0);

    // Hide btnSignin when stand in login page
    btnLogin.classList.toggle(`hidden`, currentPath === `/login.html`);
    btnSignup.classList.toggle(`hidden`, currentPath === `/signup.html`);
}
export const fixSearchBarColumn = () =>{
    // Display Search bar in Center if path is not home page (index.html)
    const headerSearchBarColumn = document.querySelector(`.header .row div:is(.col-lg-5)`);
    const headerMenuColumn = document.querySelector(`.header .row div:is(.col-lg-4)`)
    if(currentPath !== `/index.html`){
        headerSearchBarColumn.removeAttribute(`class`);
        headerSearchBarColumn.setAttribute(`class`,`col-lg-6`);
        headerSearchBarColumn.style.paddingLeft = `0rem`;
        headerSearchBarColumn.style.paddingRight = `0rem`;
        headerMenuColumn.removeAttribute(`class`);
        headerMenuColumn.setAttribute(`class`,`col-lg-3`);
    }
}