<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Check out</title>
<link rel="stylesheet" href="../css/checkout.css">

</head>
<body>
	<div class="webapp">
    <!-- * Header -->
    <jsp:include page="header2.jsp" />
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- * Detail Cart -->
    <main class="main-checkout">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="checkout-wrap">
              <div class="checkout-info">
                <div class="checkout-info__title">
                  <h1 class="checkout-info__title-content">Thông tin thanh toán</h1>
                </div>
                <form action="#" method="post"> 
                <div class="checkout-info__content">
                  <label class="checkout-info__label" for="checkout-info__fullname">Họ và tên người nhận</label>
                  <input class="checkout-info__input" type="text" name="fullname" id="checkout-info__fullname" required
                    autofocus placeholder="Nhập họ tên người nhận">
                  <label class="checkout-info__label" for="checkout-info__phone-number">Số điện thoại</label>
                  <input class="checkout-info__input" type="tel" name="phonenumber" id="checkout-info__phone-number"
                    required placeholder="Nhập số điện thoại">
                  <label class="checkout-info__label" for="checkout-info__city">Tỉnh/Thành phố</label>
                  <input class="checkout-info__input" type="text" name="province" id="checkout-info__phone-number"
                    required placeholder="Nhập Tỉnh/Thành phố">
                  <label class="checkout-info__label" for="checkout-info__district">Quận/Huyện</label>
                  <input class="checkout-info__input" type="text" name="district" id="checkout-info__phone-number"
                    required placeholder="Nhập Quận/Huyện">
                   <label class="checkout-info__label" for="checkout-info__district">Xã/Phuờng</label>
                  <input class="checkout-info__input" type="text" name="ward" id="checkout-info__phone-number"
                    required placeholder="Nhập Xã/Phường">
                  <label class="checkout-info__label" for="checkout-info__address">Địa chỉ nhận hàng</label>
                  <input class="checkout-info__input" type="text" name="detail-address" id="checkout-info__address" required
                    placeholder="Ví dụ: số 54 đường Nguyễn Lương Bằng">
                </div>
              	</div>
              <div class="checkout-other-info">
                <div class="checkout__payment-method">
                  <div class="checkout__payment-method-label">Phương thức thanh toán</div>
                  <div class="checkout__payment-method-content">COD</div>
                </div>
                <div class="checkout__total">
                  <div class="checkout__total-label">Tổng tiền:</div>
                  <div class="checkout__total-result">10.000.000đ</div>
                </div>
              </div>
              <div class="button__wrap">
                <button class="button" id="btnReturnCart">
                  Quay về giỏ hàng
                </button>
                	<input name="totalprice" type="hidden" class="inp-total-price">
	                <button type="submit" class="button" id="btnSubmitPayment">
	                  Xác nhận thanh toán
	                </button>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
    <!-- * Footer -->
    <jsp:include page="footer1.jsp" />
  </div>
  
  <script type="text/javascript">
	     showItemInOrder();
  </script>
</body>
</html>