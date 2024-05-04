package api.cart;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.Session;

import dao.GioHangDAO;
import dao.SachDao;
import model.ChiTietGioHang;
import model.User;
import util.HibernateUtil;
@WebServlet(urlPatterns = "/api/cart/*")
public class apiCart extends HttpServlet {
	SachDao sachDao = SachDao.getSachDao();
	static List<ChiTietGioHang> cart = null;
	HttpSession session = null;
	 private final Object lock = new Object();
	 @Override
	 protected synchronized void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			
		 synchronized (lock) {
			 	request.setCharacterEncoding("UTF-8");
				response.setCharacterEncoding("UTF-8");
				response.setContentType("text/html; charset=UTF-8");
				String url = null;
				try {
					url = request.getRequestURL().toString();			
				} catch (Exception e) {
					e.printStackTrace();
				}
				session = request.getSession();
				cart = (List<ChiTietGioHang>) session.getAttribute("cart");
				Session session2 = null;
				if(cart == null) {
					User user = (User) session.getAttribute("khachHang");
					session2 = HibernateUtil.getSessionFactory().openSession();
					cart = GioHangDAO.getGioHangDao().selectCartByIdUser1(user.getId(),session2);
				}
				if(url.contains("/setStatusTrue")) {
					setStatusTrue(request, response);
				}
				else if(url.contains("/setStatusFalse")) {
					setStatusFalse(request, response);
				}
				else if(url.contains("/setStatusAllTrue")) {
					setStatusTrueAll(request, response);
				}
				else if(url.contains("/setStatusAllFalse")) {
					setStatusFalseAll(request, response);
				}
			}
	
	 }

	 @Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		doGet(req, resp);
	}
	 
	 protected void setStatusTrue(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		 request.setCharacterEncoding("UTF-8");
		 response.setCharacterEncoding("UTF-8");
		 response.setContentType("text/html; charset=UTF-8");
		 String id = request.getParameter("id");
		 for(ChiTietGioHang c : cart) {
			 if(c.getSach().getId().equals(id)) {
				 c.setStatus(true); break;
			 }
		 }
		 for(ChiTietGioHang c : cart) {
			 System.out.println(c.getSach().getTen() + " " + c.isStatus());
		 }
		 session.setAttribute("cart", cart);
	}
	 
	 protected void setStatusFalse(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		 request.setCharacterEncoding("UTF-8");
		 response.setCharacterEncoding("UTF-8");
		 response.setContentType("text/html; charset=UTF-8");
		 String id = request.getParameter("id");
		 for(ChiTietGioHang c : cart) {
			 if(c.getSach().getId().equals(id)) {
				 c.setStatus(false); break;
			 }
		 }
		 for(ChiTietGioHang c : cart) {
			 System.out.println(c.getSach().getTen() + " " + c.isStatus());
		 }
		 session.setAttribute("cart", cart);
	}
	 
	 protected void setStatusTrueAll(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		 request.setCharacterEncoding("UTF-8");
		 response.setCharacterEncoding("UTF-8");
		 response.setContentType("text/html; charset=UTF-8");
		 for(ChiTietGioHang c : cart) {
			 c.setStatus(true);
		 }
		 for(ChiTietGioHang c : cart) {
			 System.out.println(c.getSach().getTen() + " " + c.isStatus());
		 }
		 session.setAttribute("cart", cart);
	}
	 
	 protected void setStatusFalseAll(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		 request.setCharacterEncoding("UTF-8");
		 response.setCharacterEncoding("UTF-8");
		 response.setContentType("text/html; charset=UTF-8");
		 for(ChiTietGioHang c : cart) {
			 c.setStatus(false);
		 }
		 for(ChiTietGioHang c : cart) {
			 System.out.println(c.getSach().getTen() + " " + c.isStatus());
		 }
		 session.setAttribute("cart", cart);
	}
	 
	 
	 
}
