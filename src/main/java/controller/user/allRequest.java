package controller.user;

import java.io.IOException;
import java.util.Random;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import dao.UserDao;
import model.User;
import util.Email;
import util.EmailValidation;
import util.MaHoa;
import util.PhoneNumberValidation;
import util.RandomNumber;
@WebServlet("/khach-hang/*")
public class allRequest extends HttpServlet {
	UserDao userDao = UserDao.getUserDao();
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String url = null;
		try {
			url = request.getRequestURL().toString();			
		} catch (Exception e) {
			e.printStackTrace();
		}
		// /khach-hang/dang-ki
		if(url.contains("/dang-ki")) {
			dangKi(request, response);
		}
		else if(url.contains("/xac-thuc")) {
			xacThuc(request, response);
		}
		else if(url.contains("/dang-nhap")) {
			dangNhap(request, response);
		}
		else if(url.contains("/dang-xuat")) {
			dangXuat(request, response);
		}
		else if(url.contains("/reset-password")) {
			resetPassword(request, response);
		}
		else if(url.contains("/change-password")) {
			changePassword(request, response);
		}
	}
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		doGet(req, resp);
	}
	
	protected void dangKi(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String email = request.getParameter("email");
		String password = request.getParameter("password");
		String fullName = request.getParameter("fullname");
		String phoneNumber = request.getParameter("phonenumber");
		String confirmPassword = request.getParameter("confirmPassword");
		
		String loiEmail = "";
		String loiPass = "";
		String loiPhone = "";
		String loiPassConfirm = "";
		
		String urlRedirect = "";
		
		if(!password.equals(confirmPassword)) {
			loiPassConfirm += "Mật khẩu không khớp!";
		}
		
		if(!EmailValidation.isEmailValid(email)) {
			loiEmail += "Email không hợp lệ!";
		}
		else if(userDao.checkEmailIsContain(email)) {
			loiEmail += "Email đã tồn tại!";
		}
		
		if(password.length() < 8) {
			loiPass += "Mật khẩu phải có 8 kí tự trở lên!";
		}
		
		if(!PhoneNumberValidation.isPhoneNumberValid(phoneNumber)) {
			loiPhone += "Số điện thoại không hợp lệ!";
		}
		
		if(loiEmail.length() > 0 || loiPass.length() > 0 || loiPhone.length() > 0 || loiPassConfirm.length() > 0) {
			urlRedirect = "/customer/signup.jsp";
			if(loiEmail.length() > 0) request.setAttribute("loiEmail",loiEmail);
			if(loiPass.length() > 0) request.setAttribute("loiPass",loiPass);
			if(loiPhone.length() > 0) request.setAttribute("loiPhone",loiPhone);
			if(loiPassConfirm.length() > 0) request.setAttribute("loiPassConfirm", loiPassConfirm);
			System.out.println(loiEmail + " " + loiPass + " " + loiPhone + " " + loiPassConfirm);
			
			
			request.setAttribute("email",email);
			request.setAttribute("password",password);
			request.setAttribute("fullname",fullName);
			request.setAttribute("phonenumber",phoneNumber);
		}
		else {
			try {
				String maXacThuc = RandomNumber.getNumber();
				Random rd = new Random();
				String maKH = System.currentTimeMillis() + rd.nextInt(1000) + "";
				User user = new User(maKH,fullName,phoneNumber,email,MaHoa.Encode(password),User.Role.KH,maXacThuc,User.Status.PR);
				userDao.insert(user);
//				Email.sendEmail(user.getEmail(), "Email xác thực", "Mã xác thực của bạn là " + maXacThuc+ ".Vui lòng nhập mã này để hoàn thành đăng kí");
				request.setAttribute("maKhachHang", maKH);
				request.setAttribute("email", email);
				urlRedirect = "/customer/verifyemail.jsp";					
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		RequestDispatcher rq = getServletContext().getRequestDispatcher(urlRedirect);
		rq.forward(request, response);
	}
	
	protected void dangNhap(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String email = request.getParameter("email");
		String password = request.getParameter("password");
		String urlRedirect = "";
		if(email == null || password == null) {
			urlRedirect += "/customer/signin.jsp";
			request.setAttribute("loiDangNhap", "Vui lòng nhập đầy đủ email và mật khẩu");
		}
		else {
			password = MaHoa.Encode(password);
			System.out.println(email + " " + password);
			User user = userDao.checkEmailPassAndStatus(email, password);
			if(user == null) {
				urlRedirect += "/customer/signin.jsp";
				request.setAttribute("loiDangNhap", "Tài khoản hoặc mật khẩu không chính xác");
			}
			else {
				System.out.println(user);
				if(user.getStatus().getStatusName().equals("Active")) {
					HttpSession session = request.getSession();
					session.setAttribute("khachHang", user);
					if(user.getRole() == User.Role.KH) {
					urlRedirect += "/home";
					Cookie cookie = new Cookie("status","dang-nhap");
					cookie.setMaxAge(24 * 60 * 60);
					cookie.setPath("/");
			        response.addCookie(cookie);
			        }
					else {
						urlRedirect = "/nvql/index.jsp";
					}
					System.out.println("Role: " + user.getRole().name());
				
//			        response.sendRedirect("/home");
				}
				else if(user.getStatus().getStatusName().equals("Cho xac thuc")){
					urlRedirect += "/customer/verifyemail.jsp";
					request.setAttribute("email", email);
					request.setAttribute("baoLoi", "Vui lòng xác thực để tiếp tục");
				}
			}
		}
		RequestDispatcher rq = getServletContext().getRequestDispatcher(urlRedirect);
		rq.forward(request, response);	
	}
	
	protected void xacThuc(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String email = request.getParameter("email");
		String otpCode = request.getParameter("otpCode");
		String maXacThucCheck = userDao.getMaXacThucByEmail(email);
		System.out.println(email + " " + email + " " + maXacThucCheck);
		String urlRedirect = "";
		if(otpCode.equals(maXacThucCheck)) {
			userDao.setTrangThaiXacThucTrueByEmail(email);
			request.setAttribute("thongBao", "Xác thực thành công. Đăng nhập để tiếp tục!");
			urlRedirect += "/customer/signin.jsp";
		}
		else {
			urlRedirect += "/customer/verifyemail.jsp";
			request.setAttribute("email", email);
			request.setAttribute("loiOTP", "Mã xác thực không chính xác. Vui lòng thử lại");
		}
		RequestDispatcher rq = getServletContext().getRequestDispatcher(urlRedirect);
		rq.forward(request, response);	
	}
	
	protected void dangXuat(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		System.out.println("before close");
		session.invalidate();
		System.out.println("after close");
		String urlRedirect = "/index.jsp";
		RequestDispatcher rq = getServletContext().getRequestDispatcher(urlRedirect);
		Cookie cookie = new Cookie("status","dang-nhap");
		cookie.setPath("/");
		cookie.setMaxAge(0);
        response.addCookie(cookie);
		rq.forward(request, response);	
	}
	
	protected void resetPassword(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String email = request.getParameter("email");
		String otpCode = request.getParameter("otpCode");
		String password = request.getParameter("password");
		String confirmPassword = request.getParameter("confirmPassword");
		boolean c = true;
		
		String otpCheck = UserDao.getUserDao().getMaXacThucByEmail(email);
		System.out.println(email + " " + otpCode + " " + password + " " + otpCheck + " " + confirmPassword);
		if(otpCheck == null) {
			System.out.println("loi mail");
			request.setAttribute("loiEmail", "Email không tồn tại hoặc chưa được đăng kí"); c = false;
		}
		else if(!otpCheck.equals(otpCode)) {
			System.out.println("loi otp");
			request.setAttribute("loiOTP", "Mã xác thực không hợp lệ"); c = false;
		}
		
		if(!password.equals(confirmPassword)) {
			System.out.println("loi pass");
			request.setAttribute("loiPass", "Mật khẩu không khớp"); c = false;
		}
		
		String urlRedirect = "/customer/forgotpassword.jsp";
		if(c) {
			System.out.println("change mat khau");
			urlRedirect = "/customer/signin.jsp";
			UserDao.getUserDao().changeMatKhau(MaHoa.Encode(password), email);
		}
		request.setAttribute("thongBao", "Thay đổi mật khẩu thành công. Đăng nhập để tiếp tục");
		RequestDispatcher rq = getServletContext().getRequestDispatcher(urlRedirect);
		rq.forward(request, response);	
	}
	
	
	protected void changePassword(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String email = request.getParameter("email");
		String otpCode = request.getParameter("otpCode");
		String oldpass = request.getParameter("oldpass");
		String password = request.getParameter("password");
		String confirmPassword = request.getParameter("confirmPassword");
		boolean c = true;
		
		String otpCheck = UserDao.getUserDao().getMaXacThucByEmail(email);
		System.out.println(email + " " + otpCode + " " + password + " " + otpCheck + " " + confirmPassword);
		if(otpCheck == null) {
			System.out.println("loi mail");
			request.setAttribute("loiEmail", "Email không tồn tại hoặc chưa được đăng kí"); c = false;
		}
		else if(!otpCheck.equals(otpCode)) {
			System.out.println("loi otp");
			request.setAttribute("loiOTP", "Mã xác thực không hợp lệ"); c = false;
		}
		
		if(userDao.checkEmailPassAndStatus(email, MaHoa.Encode(oldpass)) == null) {
			request.setAttribute("loiOldPass", "Mật khẩu không chính xác"); c = false;
		}
		
		
		if(!password.equals(confirmPassword)) {
			System.out.println("loi pass");
			request.setAttribute("loiPass", "Mật khẩu không khớp"); c = false;
		}
		
		String urlRedirect = "/customer/useraccount.jsp?info&changingpassword";
		if(c) {
			System.out.println("change mat khau");
			HttpSession session  = request.getSession();
			session.invalidate();
			urlRedirect = "/customer/signin.jsp";
//			request.setAttribute("thongBao", "Đổi mật khẩu thành công. Đăng nhập để tiếp tục!");
			UserDao.getUserDao().changeMatKhau(MaHoa.Encode(password), email);
		}
		request.setAttribute("thongBao", "Thay đổi mật khẩu thành công. Đăng nhập để tiếp tục");
		RequestDispatcher rq = getServletContext().getRequestDispatcher(urlRedirect);
		rq.forward(request, response);	
	}
	
}
