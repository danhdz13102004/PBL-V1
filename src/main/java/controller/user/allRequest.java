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

import org.hibernate.Session;

import dao.UserDao;
import model.User;
import util.Email;
import util.EmailValidation;
import util.HibernateUtil;
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
			Session s = HibernateUtil.getSessionFactory().openSession();
			try {
				String maXacThuc = RandomNumber.getNumber();
				Random rd = new Random();
				String maKH = System.currentTimeMillis() + rd.nextInt(1000) + "";
				User user = new User(maKH,fullName,phoneNumber,email,MaHoa.Encode(password),User.Role.KH,maXacThuc,User.Status.PR);
				userDao.insert(user,s);
				Email.sendEmail(user.getEmail(), "Email xác thực", "Mã xác thực của bạn là " + maXacThuc+ ".Vui lòng nhập mã này để hoàn thành đăng kí");
				request.setAttribute("maKhachHang", maKH);
				urlRedirect = "/customer/confirm.jsp";					
			} catch (Exception e) {
				e.printStackTrace();
			}
			finally
			{
				s.close();
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
				if(user.getStatus().toString().equals("Active")) {
					urlRedirect += "/home";
					HttpSession session = request.getSession();
					session.setAttribute("khachHang", user);
					Cookie cookie = new Cookie("status","dang-nhap");
					cookie.setMaxAge(24 * 60 * 60);
					cookie.setPath("/");
			        response.addCookie(cookie);
//			        response.sendRedirect("/home");
				}
				else if(user.getStatus().toString().equals("Cho xac thuc")){
					urlRedirect += "/customer/confirm.jsp";
					request.setAttribute("maKhachHang", user.getId());
					request.setAttribute("baoLoi", "Vui lòng xác thực để tiếp tục");
				}
			}
		}
		RequestDispatcher rq = getServletContext().getRequestDispatcher(urlRedirect);
		rq.forward(request, response);	
	}
	
	protected void xacThuc(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String maKhachHang = request.getParameter("maKhachHang");
		String maXacThuc = request.getParameter("maXacThuc");
		String maXacThucCheck = userDao.getMaXacThuc(maKhachHang);
		System.out.println(maKhachHang + " " + maXacThuc + " " + maXacThucCheck);
		String urlRedirect = "";
		if(maXacThuc.equals(maXacThucCheck)) {
			userDao.setTrangThaiXacThucTrue(maKhachHang);
			request.setAttribute("maKhachHang",maKhachHang);
			request.setAttribute("thongBao", "Xác thực thành công. Đăng nhập để tiếp tục!");
			urlRedirect += "/customer/signinView.jsp";
		}
		else {
			urlRedirect += "/customer/confirm.jsp";
			request.setAttribute("maKhachHang", maKhachHang);
			request.setAttribute("baoLoi", "Mã xác thực không chính xác. Vui lòng thử lại");
		}
		RequestDispatcher rq = getServletContext().getRequestDispatcher(urlRedirect);
		rq.forward(request, response);	
	}
	
	protected void dangXuat(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		session.invalidate();
		String urlRedirect = "/index.jsp";
		RequestDispatcher rq = getServletContext().getRequestDispatcher(urlRedirect);
		Cookie cookie = new Cookie("status","dang-nhap");
		cookie.setPath("/");
		cookie.setMaxAge(0);
        response.addCookie(cookie);
		rq.forward(request, response);	
	}
}
