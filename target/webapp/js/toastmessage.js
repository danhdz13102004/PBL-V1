"use strict";
export const toast = ({ title = ``, message = ``, type = ``, duration = 3000 }) => {
  const delayTime = (duration / 1000).toFixed(2);
  const icons = {
    error: `
    <svg class="toast__icon--state" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256zm0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4z"/>
    </svg>
    `,
    warning: `
    <svg class="toast__icon--state" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256zm0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4z"/>
    </svg>
    `,
    success: `
    <svg class="toast__icon--state" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z" fill="#292D32"/>
    </svg>
    `,
    info: `
    <svg class="toast__icon--state" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.696-3.534c.63 0 1.332-.288 2.196-1.458l.911-1.22a.334.334 0 0 0-.074-.472.38.38 0 0 0-.505.06l-1.475 1.679a.241.241 0 0 1-.279.061.211.211 0 0 1-.12-.244l1.858-7.446a.499.499 0 0 0-.575-.613l-3.35.613a.35.35 0 0 0-.276.258l-.086.334a.25.25 0 0 0 .243.312h1.73l-1.476 5.922c-.054.234-.144.63-.144.918 0 .666.396 1.296 1.422 1.296zm1.83-10.536c.702 0 1.242-.414 1.386-1.044.036-.144.054-.306.054-.414 0-.504-.396-.972-1.134-.972-.702 0-1.242.414-1.386 1.044a1.868 1.868 0 0 0-.054.414c0 .504.396.972 1.134.972z" fill="#000000"/>
    </svg>
    `,
  };

  const removeToast = (mainToast, toastElement) => {
    toastElement.style.animation = `toFadeOut 1s forwards`;
    toastElement.addEventListener(`animationend`, () => {
      if (mainToast.contains(toastElement)) {
        mainToast.removeChild(toastElement);
      }
    });
  };

  const mainToast = document.getElementById(`toast`);
  if (mainToast) {
    const innerMainToast = document.createElement(`div`);
    const currentToasts = mainToast.querySelectorAll(`.toast`);
    if (currentToasts.length >= 3) {
      removeToast(mainToast, currentToasts[0]);
    }
    const autoRemoveId = setTimeout(() => {
      removeToast(mainToast, innerMainToast);
    }, duration + 1000);
    innerMainToast.onclick = (e) => {
      if (e.target.closest(`.toast__close`)) {
        clearTimeout(autoRemoveId);
        removeToast(mainToast, innerMainToast);
      }
    };

    const icon = icons[type];
    innerMainToast.classList.add(`toast`, `toast--${type}`);
    innerMainToast.style.animation = `slideInLeft 0.3s ease, toFadeOut 1s linear ${delayTime}s forwards`;
    innerMainToast.innerHTML = `
      <style>
        #toast{
          position: fixed;
          bottom: calc(0% + 3rem);
          right: calc(0% + 3rem);
          z-index: 999999;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
          overflow: hidden;
        }
        .toast {
          position: relative;
          display: flex;
          align-items: center;
          background: var(--white-color);
          border-radius: 1rem;
          border-left: 0.5rem solid;
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
          padding: 2rem 0rem;
          min-width: 40rem;
          max-width: 40rem;
          height: 9rem;
          transition: all linear 0.3s;
          
          z-index: 999;
        }
        .toast__icon {
          padding: 0rem 1.6rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .toast__icon--state {
          width: 3.2rem;
          height: 3.2rem;
          > path {
            width: 3rem;
            height: 3rem;
          }
        }
        .toast + .toast {
          margin-top: 2.4rem;
        }
        .toast__body {
          flex-grow: 1;
        }
        .toast__title {
          margin: 0.6rem 0rem 0rem;
          font-size: 1.6rem;
          font-weight: 600;
          color: var(--text-color);
        }
        .toast__message {
          margin: 0.6rem 0rem 0rem;
          font-size: 1.4rem;
          font-weight: 400;
          line-height: 1.5;
          color: var(--text-color);
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: wrap;
          display: block;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .toast__close {
          padding: 0rem 1.6rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .toast__icon--close {
          width: 1.8rem;
          height: 1.8rem;
          cursor: pointer;
        }
        .toast__progress-bar{
          position: absolute;
          bottom: 0;
          right: 0;
          width: 100%;
          height: 0.25rem;
          border-radius: 0.5rem;
        }
        .toast__progress-bar::before{
          position: absolute;
          content: "";
          bottom: 0;
          right: 0;
          height: 100%;
          width: 100%;
          border-radius: 0.5rem;
          animation: runOutProgress calc(${delayTime}s + 0.5s) linear forwards;
        }
        .toast--success {
          border-color: var(--color-success);
          & .toast__icon--state {
            filter: brightness(0) saturate(100%) invert(67%) sepia(6%) saturate(4749%)
              hue-rotate(91deg) brightness(98%) contrast(92%);
          }
          & .toast__progress-bar::before{
            background-color: var(--color-success);
          }
        }
        .toast--info {
          border-color: var(--blue-color);
          & .toast__icon--state {
            filter: brightness(0) saturate(100%) invert(43%) sepia(25%) saturate(4561%)
              hue-rotate(186deg) brightness(102%) contrast(107%);
          }
          & .toast__progress-bar::before{
            background-color: var(--blue-color);
          }
        }
        .toast--warning {
          border-color: var(--color-warning);
          & .toast__icon--state {
            filter: brightness(0) saturate(100%) invert(51%) sepia(62%) saturate(3560%)
              hue-rotate(7deg) brightness(94%) contrast(98%);
          }
          & .toast__progress-bar::before{
            background-color: var(--color-warning);
          }
        }
        .toast--error {
          border-color: var(--color-error);
          & .toast__icon--state {
            filter: brightness(0) saturate(100%) invert(24%) sepia(62%) saturate(4343%)
              hue-rotate(348deg) brightness(92%) contrast(99%);
          }
          & .toast__progress-bar::before{
            background-color: var(--color-error);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(calc(100% + 3rem));
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes toFadeOut {
          to{
            opacity: 0;
          }
        }
        @keyframes runOutProgress {
          to{
            right: 100%;
          }
        }   
      </style>
      <div class="toast__icon">
        ${icon}
      </div>
      <div class="toast__body">
        <h3 class="toast__title">${title}</h3>
        <p class="toast__message">
          ${message}
        </p>
      </div>
      <div class="toast__close">
        <svg class="toast__icon--close" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z"
            fill="#000000" />
        </svg>
      </div>
      <div class="toast__progress-bar"></div>
    `;
    mainToast.appendChild(innerMainToast);
  }
};
