package controller.user;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.mysql.cj.Session;

import dao.GioHangDAO;
import dao.SachDao;
import model.ChiTietGioHang;
import model.Sach;
import model.User;
import modelApi.ChiTietGioHangSerializer;
import util.HibernateUtil;
@WebServlet(urlPatterns = "/cart/*")
public class cartRequest extends HttpServlet {
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html; charset=UTF-8");
		String url = null;
		try {
			url = request.getRequestURL().toString();			
		} catch (Exception e) {
			e.printStackTrace();
		}
		if(url.contains("/add")) {
			addToCart(request, response);
		}
	}
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		doGet(req, resp);
	}
	
	
	protected void addToCart(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("khachHang");
		String urlRedirect = "";
		if(user == null) {
			request.setAttribute("baoLoi", "Vui lòng đăng nhập để tiếp tục");
			urlRedirect += "/customer/signinView.jsp";
			RequestDispatcher rq = getServletContext().getRequestDispatcher(urlRedirect);
			rq.forward(request, response);	
		}
		else {
			org.hibernate.Session session2 =  HibernateUtil.getSessionFactory().openSession();
			String id = request.getParameter("id");
			Integer soluong = Integer.parseInt(request.getParameter("soluong"));
			List<ChiTietGioHang> cart =  (List<ChiTietGioHang>) session.getAttribute("cart");
			if(cart == null) cart = GioHangDAO.getGioHangDao().selectCartByIdUser1(user.getId(), session2);
			if(cart == null) cart = new ArrayList<ChiTietGioHang>();
			for(ChiTietGioHang c : cart) {
				if(c.getSach().getId().equals(id)) {
					c.setSoLuong(c.getSoLuong() + soluong);
					for(ChiTietGioHang c1 : cart) {
						System.out.println(c1.getSach().getTen() + " " + c1.getSoLuong());
					}
					session.setAttribute("cart", cart);
					return;
				}
			}
			Sach s = SachDao.getSachDao().selectById(id, session2);
			ChiTietGioHang c = new ChiTietGioHang(user, s, soluong);
			cart.add(c);
			for(ChiTietGioHang c1 : cart) {
				System.out.println(c1.getSach().getTen() + " " + c1.getSoLuong());
			}
			session.setAttribute("cart", cart);
			GsonBuilder gb = new GsonBuilder();
	    	gb.registerTypeAdapter(model.ChiTietGioHang.class, new ChiTietGioHangSerializer());
	    	Gson gson = gb.create();
	    	String json = gson.toJson(cart);
	    	response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			PrintWriter out = response.getWriter();
	        out.print(json);
	        out.flush();	
	        if(session2 != null) session2.close();
		}
	}
	
	
	
	
	
}

