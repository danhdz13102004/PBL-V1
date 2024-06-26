<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thanh toán</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Varela+Round&display=swap"
    rel="stylesheet">
  <link rel="shortcut icon" href="assets/image/logo.ico" type="image/x-icon">
  <link rel="stylesheet" href="../css/normalize.css">
  <link rel="stylesheet" href="../css/base.css">
  <link rel="stylesheet" href="../css/checkout.css">
</head>

<body>
  <div class="webapp">
    <!-- * Header -->
   <jsp:include page="header2.jsp" />
    <!-- * Checkout -->
    <main class="main-checkout">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="checkout__decoration"></div>
            <!--* Display 1 default checkout info -->
            <div class="checkout-default-wrap" id="checkout-default">
              <div class="checkout-default__title">
                <h2 class="checkout-default__title-content">Địa chỉ nhận hàng</h2>
              </div>
              <div class="checkout-default__list">
                <div class="checkout-default__item">
                  <div class="checkout-default__info-wrap">
                    <div class="checkout-default__info">
                      <div class="checkout-default__fullname">
                        Ngô Văn Danh
                      </div>
                      <div class="checkout-default__phone-number">
                        0987654321
                      </div>
                    </div>
                    <div class="checkout-default__address">
                      <label for="">Địa chỉ: </label>
                      <span>
                        Số 54 Nguyễn Lương Bằng, Phường Hòa Khánh Bắc, Quận Liên Chiểu, Đà Nẵng
                      </span>
                    </div>
                  </div>
                  <div class="checkout-default__label-default">Mặc định</div>
                  <div class="checkout-default__action">
                    <button class="button" id="checkout-default__action-switch">
                      <svg class="checkout-default__action-switch-icon" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z"
                          fill="#000000" />
                      </svg>
                      <span class="checkout-default__action-switch-label">Thay đổi</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!--* Display 1 default checkout info -->
            <!--* Modal to change default checkout info -->
            <div class="modal" id="modal__switch-checkout-info">
              <div class="modal__overlay"></div>
              <div class="modal__body">
                <div class="modal__inner">
                  <div class="checkout-history-wrap" id="checkout-history">
                    <div class="checkout-history__title">
                      <h1 class="checkout-history__title-content">Địa chỉ của bạn</h1>
                    </div>
                    <div class="checkout-history__list">
                      <div class="checkout-history__option">
                        <input type="radio" name="chooseDefault" class="checkout-radio-choose-default"
                          id="checkout-radio-choose-default" checked>
                        <div class="checkout-history__info-wrap">
                          <div class="checkout-history__info">
                            <div class="checkout-history__fullname">
                              Ngô Văn Danh
                            </div>
                            <div class="checkout-history__phone-number">
                              0987654321
                            </div>
                            <div class="checkout-history__label-default active">Mặc định</div>
                          </div>
                          <div class="checkout-history__address">
                            <div class="home-address">
                              Số 54 Nguyễn Lương Bằng
                            </div>
                            <div class="address">
                              <span class="ward">Phường Hòa Khánh Bắc</span>,
                              <span class="district">Quận Liên Chiểu</span>,
                              <span class="province">Đà Nẵng</span>
                            </div>
                          </div>
                        </div>
                        <div class="checkout-history__action">
                          <button class="button checkout-history__action-edit">
                            <svg class="checkout-history__action-edit-icon" viewBox="0 0 24 24" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z"
                                fill="#000000" />
                            </svg>
                            <span class="checkout-history__action-edit-label">Cập nhật</span>
                          </button>
                        </div>
                      </div>
                      <div class="checkout-history__option">
                        <input type="radio" name="chooseDefault" class="checkout-radio-choose-default"
                          id="checkout-radio-choose-default">
                        <div class="checkout-history__info-wrap">
                          <div class="checkout-history__info">
                            <div class="checkout-history__fullname">
                              Nguyễn Phúc
                            </div>
                            <div class="checkout-history__phone-number">
                              0383431907
                            </div>
                            <div class="checkout-history__label-default">Mặc định</div>
                          </div>
                          <div class="checkout-history__address">
                            <div class="home-address">
                              Số 121 Nguyễn Chánh
                            </div>
                            <div class="address">
                              <span class="ward">Phường Hòa Khánh Bắc</span>,
                              <span class="district">Quận Liên Chiểu</span>,
                              <span class="province">Đà Nẵng</span>
                            </div>
                          </div>
                        </div>
                        <div class="checkout-history__action">
                          <button class="button checkout-history__action-edit">
                            <svg class="checkout-history__action-edit-icon" viewBox="0 0 24 24" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z"
                                fill="#000000" />
                            </svg>
                            <span class="checkout-history__action-edit-label">Cập nhật</span>
                          </button>
                        </div>
                      </div>
                      <div class="checkout-history__option">
                        <input type="radio" name="chooseDefault" class="checkout-radio-choose-default"
                          id="checkout-radio-choose-default">
                        <div class="checkout-history__info-wrap">
                          <div class="checkout-history__info">
                            <div class="checkout-history__fullname">
                              Lê Võ Nhật Minh
                            </div>
                            <div class="checkout-history__phone-number">
                              0987829293
                            </div>
                            <div class="checkout-history__label-default">Mặc định</div>
                          </div>
                          <div class="checkout-history__address">
                            <div class="home-address">
                              K112/90 Ngô Sĩ Liên
                            </div>
                            <div class="address">
                              <span class="ward">Phường Hòa Minh</span>,
                              <span class="district">Quận Liên Chiểu</span>,
                              <span class="province">Đà Nẵng</span>
                            </div>
                          </div>
                        </div>
                        <div class="checkout-history__action">
                          <button class="button checkout-history__action-edit">
                            <svg class="checkout-history__action-edit-icon" viewBox="0 0 24 24" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z"
                                fill="#000000" />
                            </svg>
                            <span class="checkout-history__action-edit-label">Cập nhật</span>
                          </button>
                        </div>
                      </div>
                      <div class="checkout-history__option">
                        <input type="radio" name="chooseDefault" class="checkout-radio-choose-default"
                          id="checkout-radio-choose-default">
                        <div class="checkout-history__info-wrap">
                          <div class="checkout-history__info">
                            <div class="checkout-history__fullname">
                              Phúc Long
                            </div>
                            <div class="checkout-history__phone-number">
                              0987654561
                            </div>
                            <div class="checkout-history__label-default">Mặc định</div>
                          </div>
                          <div class="checkout-history__address">
                            <div class="home-address">
                              93 Nguyễn Lương Bằng
                            </div>
                            <div class="address">
                              <span class="ward">Phường Hòa Khánh Bắc</span>,
                              <span class="district">Quận Liên Chiểu</span>,
                              <span class="province">Đà Nẵng</span>
                            </div>
                          </div>
                        </div>
                        <div class="checkout-history__action">
                          <button class="button checkout-history__action-edit">
                            <svg class="checkout-history__action-edit-icon" viewBox="0 0 24 24" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z"
                                fill="#000000" />
                            </svg>
                            <span class="checkout-history__action-edit-label">Cập nhật</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <button class="button" id="btnAddNewInfo">
                      Thêm Địa Chỉ Mới
                    </button>
                    <div class="button__wrap">
                      <button class="button btnCloseModal" id="btnReturn">
                        Hủy
                      </button>
                      <button class="button" id="btnChooseDefaultInfo">
                        Xác nhận
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--* Modal to change default checkout info -->
            <!--* Modal to add new checkout info -->
            <div class="modal" id="modal__addNewInfo">
              <div class="modal__overlay"></div>
              <div class="modal__body">
                <div class="modal__inner">
                  <div class="checkout-wrap">
                    <div class="checkout-info">
                      <div class="checkout-info__title">
                        <h1 class="checkout-info__title-content">Thông tin thanh toán mới</h1>
                      </div>
                      <div class="checkout-info__content">
                        <div class="checkout-info__field">
                          <label class="checkout-info__label" for="checkout-info__fullname">
                            Họ và tên người nhận
                          </label>
                          <input class="checkout-info__input checkout-info__fullname" type="text" name="fullname" id="checkout-info__fullname"
                            autofocus placeholder="Nhập họ tên người nhận">
                          <div class="form__alert">
                            <svg class="form__alert-icon" viewBox="0 0 24 24" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12 7V13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                              <circle cx="12" cy="16.5" r="1" fill="#000000" />
                            </svg>
                            <div class="form__alert-message"></div>
                          </div>
                        </div>
                        <div class="checkout-info__field">
                          <label class="checkout-info__label" for="checkout-info__phone-number">
                            Số điện thoại
                          </label>
                          <input class="checkout-info__input checkout-info__phone-number" type="tel" name="phoneNumber"
                            id="checkout-info__phone-number" placeholder="Nhập số điện thoại">
                          <div class="form__alert">
                            <svg class="form__alert-icon" viewBox="0 0 24 24" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12 7V13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                              <circle cx="12" cy="16.5" r="1" fill="#000000" />
                            </svg>
                            <div class="form__alert-message"></div>
                          </div>
                        </div>
                        <div class="checkout-info__field">
                          <label class="checkout-info__label" for="checkout-info__country">Quốc gia</label>
                          <input class="checkout-info__input checkout-info__country" type="text" name="country" id="checkout-info__country"
                            value="Việt Nam" readonly>
                        </div>
                        <div class="checkout-info__field">
                          <label class="checkout-info__label" for="checkout-info__province">Tỉnh/Thành phố</label>
                          <select onchange="onChangeSelect(this,'inp-province-add')" class="checkout-info__input checkout-info__province" name="province" id="checkout-info__province">
                            <option  value="">Chọn tỉnh/ thành phố</option>
                          </select>
                          <div class="form__alert">
                            <svg class="form__alert-icon" viewBox="0 0 24 24" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12 7V13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                              <circle cx="12" cy="16.5" r="1" fill="#000000" />
                            </svg>
                            <div class="form__alert-message"></div>
                          </div>
                        </div>
                        <div class="checkout-info__field">
                          <label class="checkout-info__label" for="checkout-info__district">Quận/Huyện</label>
                          <select onchange="onChangeSelect(this,'inp-district-add')" class="checkout-info__input checkout-info__district" name="district" id="checkout-info__district">
                            <option  value="">Chọn quận/ huyện</option>
                          </select>
                          <div class="form__alert">
                            <svg class="form__alert-icon" viewBox="0 0 24 24" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12 7V13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                              <circle cx="12" cy="16.5" r="1" fill="#000000" />
                            </svg>
                            <div class="form__alert-message"></div>
                          </div>
                        </div>
                        <div class="checkout-info__field">
                          <label class="checkout-info__label" for="checkout-info__ward">Xã/Phường</label>
                          <select onchange="onChangeSelect(this,'inp-ward-add')" class="checkout-info__input checkout-info__ward" name="ward" id="checkout-info__ward">
                            <option value="">Chọn xã/ phường</option>
                          </select>
                          <div class="form__alert">
                            <svg class="form__alert-icon" viewBox="0 0 24 24" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12 7V13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                              <circle cx="12" cy="16.5" r="1" fill="#000000" />
                            </svg>
                            <div class="form__alert-message"></div>
                            <input value="province" type="hidden" class="inp-province-add">
                            <input value="district" type="hidden" class="inp-district-add">
                            <input value="ward" type="hidden" class="inp-ward-add"> 
                          </div>
                        </div>
                        <div class="checkout-info__field">
                          <label class="checkout-info__label" for="checkout-info__address">Địa chỉ nhận hàng</label>
                          <input list="address" class="checkout-info__input checkout-info__address" name="address" id="checkout-info__address" value=""
                            placeholder="Ví dụ: số 54 đường Nguyễn Lương Bằng">
                          <div class="form__alert">
                            <svg class="form__alert-icon" viewBox="0 0 24 24" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12 7V13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                              <circle cx="12" cy="16.5" r="1" fill="#000000" />
                            </svg>
                            <div class="form__alert-message"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="button__wrap">
                      <button class="button btnCloseModal" id="btnReturnSwitchInfo">
                        Quay lại
                      </button>
                      <button class="button" id="btnSubmitInfo">
                        Hoàn thành
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--* End Modal to add new checkout info -->
            <!--* Modal to update history checkout info -->
            <div class="modal" id="modal__addUpdateInfo">
              <div class="modal__overlay"></div>
              <div class="modal__body">
                <div class="modal__inner">
                  <div class="checkout-wrap">
                    <div class="checkout-info">
                      <div class="checkout-info__title">
                        <h1 class="checkout-info__title-content">Cập nhật thông tin thanh toán</h1>
                      </div>
                      <input type="hidden" class="inp-id-update">
                      <div class="checkout-info__content">
                        <div class="checkout-info__field">
                          <label class="checkout-info__label" for="checkout-info__fullname">
                            Họ và tên người nhận
                          </label>
                          <input class="checkout-info__input" type="text" name="fullname" id="checkout-info__fullname"
                            autofocus placeholder="Nhập họ tên người nhận">
                          <div class="form__alert">
                            <svg class="form__alert-icon" viewBox="0 0 24 24" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12 7V13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                              <circle cx="12" cy="16.5" r="1" fill="#000000" />
                            </svg>
                            <div class="form__alert-message"></div>
                          </div>
                        </div>
                        <div class="checkout-info__field">
                          <label class="checkout-info__label" for="checkout-info__phone-number">
                            Số điện thoại
                          </label>
                          <input class="checkout-info__input" type="tel" name="phoneNumber"
                            id="checkout-info__phone-number" placeholder="Nhập số điện thoại">
                          <div class="form__alert">
                            <svg class="form__alert-icon" viewBox="0 0 24 24" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12 7V13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                              <circle cx="12" cy="16.5" r="1" fill="#000000" />
                            </svg>
                            <div class="form__alert-message"></div>
                          </div>
                        </div>
                        <div class="checkout-info__field">
                          <label class="checkout-info__label" for="checkout-info__country">Quốc gia</label>
                          <input class="checkout-info__input" type="text" name="country" id="checkout-info__country"
                            value="Việt Nam" readonly>
                        </div>
                        <div class="checkout-info__field">
                          <label class="checkout-info__label" for="checkout-info__province">Tỉnh/Thành phố</label>
                          <select onchange="loadAllDistrict()" class="checkout-info__input checkout-info__province update-province" name="province" id="checkout-info__province">
                            <option value="">Chọn tỉnh/ thành phố</option>
                          </select>
                          <div class="form__alert">
                            <svg class="form__alert-icon" viewBox="0 0 24 24" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12 7V13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                              <circle cx="12" cy="16.5" r="1" fill="#000000" />
                            </svg>
                            <div class="form__alert-message"></div>
                          </div>
                        </div>
                        <div class="checkout-info__field">
                          <label class="checkout-info__label" for="checkout-info__district">Quận/Huyện</label>
                          <select onchange="loadAllWard()" class="checkout-info__input checkout-info__district update-district" name="district" id="checkout-info__district">
                            <option value="">Chọn quận/ huyện</option>
                          </select>
                          <div class="form__alert">
                            <svg class="form__alert-icon" viewBox="0 0 24 24" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12 7V13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                              <circle cx="12" cy="16.5" r="1" fill="#000000" />
                            </svg>
                            <div class="form__alert-message"></div>
                          </div>
                        </div>
                        <div class="checkout-info__field">
                          <label class="checkout-info__label" for="checkout-info__ward">Xã/Phường</label>
                          <select  class="checkout-info__input checkout-info__ward update-ward" name="ward" id="checkout-info__ward">
                            <option value="">Chọn xã/ phường</option>
                          </select>
                          <div class="form__alert">
                            <svg class="form__alert-icon" viewBox="0 0 24 24" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12 7V13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                              <circle cx="12" cy="16.5" r="1" fill="#000000" />
                            </svg>
                            <div class="form__alert-message"></div>
                          </div>
                        </div>
                        <div class="checkout-info__field">
                          <label class="checkout-info__label" for="checkout-info__address">Địa chỉ nhận hàng</label>
                          <input list="address" class="checkout-info__input checkout-info__address road-update" name="address" id="checkout-info__address" value=""
                            placeholder="Ví dụ: số 54 đường Nguyễn Lương Bằng">
                          <div class="form__alert">
                            <svg class="form__alert-icon" viewBox="0 0 24 24" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12 7V13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                              <circle cx="12" cy="16.5" r="1" fill="#000000" />
                            </svg>
                            <div class="form__alert-message"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="button__wrap">
                      <button class="button btnCloseModal" id="btnReturnSwitchInfo">
                        Quay lại
                      </button>
                      <button class="button" id="btnUpdateInfo">
                        Hoàn thành
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--* End Modal to update history checkout info -->
          </div>
        </div>
      </div>
    </main>
    <div class="checking-order">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="checking-order-section">
              <div class="checking-order__title">
                Kiểm tra đơn hàng
              </div>
              <div class="checking-order-wrap">
                <div class="checking-order-header-tag checking-order__item">
                  <div for="checking-order__item-checkBox" class="checking-order__item-info">
                    <div class="checking-order__item-name">
                      <div href="" class="checking-order__item-link">
                        Tên sách
                      </div>
                    </div>
                  </div>
                  <span class="checking-order__item-unitPrice">Đơn giá</span>
                  <div class="checking-order__item-quantity">
                    Số lượng
                  </div>
                  <span class="checking-order__item-totalAmount">Thành tiền</span>
                </div>
                <div class="contain-all-item">
                
	                <div class="checking-order__item">
	                  <div for="checking-order__item-checkBox" class="checking-order__item-info">
	                    <div class="checking-order__item-image-wrap">
	                      <div href="" class="checking-order__item-image"
	                        style="background-image: url(assets/data/Khong_phai_soi_nhung_cung_dung_la_cuu.jpg);">
	                      </div>
	                    </div>
	                    <div class="checking-order__item-name">
	                      <div href="" class="checking-order__item-link">
	                        Không Phải Sói Nhưng Cũng Đừng Là Cừu -Tặng kèm bookmark 2 mặt
	                      </div>
	                    </div>
	                  </div>
	                  <span class="checking-order__item-unitPrice">86.800đ</span>
	                  <div class="checking-order__item-quantity">
	                    1
	                  </div>
	                  <span class="checking-order__item-totalAmount">86.800đ</span>
	                </div>
	                <div class="checking-order__item">
	                  <div for="checking-order__item-checkBox" class="checking-order__item-info">
	                    <div class="checking-order__item-image-wrap">
	                      <div href="" class="checking-order__item-image"
	                        style="background-image: url(assets/data/Khong_phai_soi_nhung_cung_dung_la_cuu.jpg);">
	                      </div>
	                    </div>
	                    <div class="checking-order__item-name">
	                      <div href="" class="checking-order__item-link">
	                        Không Phải Sói Nhưng Cũng Đừng Là Cừu -Tặng kèm bookmark 2 mặt
	                      </div>
	                    </div>
	                  </div>
	                  <span class="checking-order__item-unitPrice">86.800đ</span>
	                  <div class="checking-order__item-quantity">
	                    1
	                  </div>
	                  <span class="checking-order__item-totalAmount">86.800đ</span>
	                </div>
	                <div class="checking-order__item">
	                  <div for="checking-order__item-checkBox" class="checking-order__item-info">
	                    <div class="checking-order__item-image-wrap">
	                      <div href="" class="checking-order__item-image"
	                        style="background-image: url(assets/data/Khong_phai_soi_nhung_cung_dung_la_cuu.jpg);">
	                      </div>
	                    </div>
	                    <div class="checking-order__item-name">
	                      <div href="" class="checking-order__item-link">
	                        Không Phải Sói Nhưng Cũng Đừng Là Cừu -Tặng kèm bookmark 2 mặt
	                      </div>
	                    </div>
	                  </div>
	                  <span class="checking-order__item-unitPrice">86.800đ</span>
	                  <div class="checking-order__item-quantity">
	                    1
	                  </div>
	                  <span class="checking-order__item-totalAmount">86.800đ</span>
	                </div>
	                <div class="checking-order__item">
	                  <div for="checking-order__item-checkBox" class="checking-order__item-info">
	                    <div class="checking-order__item-image-wrap">
	                      <div href="" class="checking-order__item-image"
	                        style="background-image: url(assets/data/Khong_phai_soi_nhung_cung_dung_la_cuu.jpg);">
	                      </div>
	                    </div>
	                    <div class="checking-order__item-name">
	                      <div href="" class="checking-order__item-link">
	                        Không Phải Sói Nhưng Cũng Đừng Là Cừu -Tặng kèm bookmark 2 mặt
	                      </div>
	                    </div>
	                  </div>
	                  <span class="checking-order__item-unitPrice">86.800đ</span>
	                  <div class="checking-order__item-quantity">
	                    1
	                  </div>
	                  <span class="checking-order__item-totalAmount">86.800đ</span>
	                </div>
                </div>  
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="payment-info">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="payment-info__wrap">
              <div class="row">
                <div class="col-lg-8">
                  <div class="payment__title">
                    Thông tin thanh toán
                  </div>
                </div>
                <div class="col-lg-4">
                  <form action="${pageContext.request.contextPath}/order/addNewOrder" method="post">
                    <div class="payment__final-info">
                      <div class="payment__method">
                        <div class="payment__method-label">Phương thức thanh toán:</div>
                        <div class="payment__method-content">COD</div>
                      </div>
                      <div class="payment__delivery">
                        <div class="payment__delivery-label">Chi phí vận chuyển:</div>
                        <div class="payment__delivery-content">15.000đ</div>
                      </div>
                      <div class="payment__total">
                        <div class="payment__total-label">Tổng tiền:</div>
                        <div class="payment__total-result">10.000.000đ</div>
                        <input class="totalprice-inp" name="totalprice" type="hidden">
                        <input class="phonenumber-inp" name="phonenumber" type="hidden">
                        <input class="fullname-inp" name="fullname" type="hidden">
                        <input class="address-inp" name="address" type="hidden">
                      </div>
                    </div>
                    <div class="button__wrap">
                      <button type="submit" class="button" id="btnSubmitPayment">Thanh toán</button>
                    </div>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <jsp:include page="footer1.jsp" />
  </div>
  <script type="text/javascript">
  		showItemInOrder();
  		loadAddress();
  </script>
  <script type="module" src="../js/checkout.js" defer></script>
</body>

</html>