package api.order;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.Session;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import dao.GioHangDAO;
import dao.SachDao;
import model.ChiTietGioHang;
import model.User;
import modelApi.ChiTietGioHangSerializer;
import util.HibernateUtil;
@WebServlet(urlPatterns = "/api/order/*")
public class apiOrder extends HttpServlet {
	
	SachDao sachDao = SachDao.getSachDao();
	static List<ChiTietGioHang> cart = null;
	HttpSession session = null;
	 private final Object lock = new Object();
	@Override
	protected synchronized void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		 synchronized (lock) {
			 String url = null;
				try {
					url = request.getRequestURL().toString();			
				} catch (Exception e) {
					e.printStackTrace();
				} 
			if(url.contains("/selectItemInOrder")) {
				selectItemInOrder(request,response);
			}
		 }
	}
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		super.doPost(request, response);
	}
	
	protected void selectItemInOrder(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		session = request.getSession();
		cart = (List<ChiTietGioHang>) session.getAttribute("cart");
		Session session2 = null;
		if(cart == null) {
			User user = (User) session.getAttribute("khachHang");
			session2 = HibernateUtil.getSessionFactory().openSession();
			cart = GioHangDAO.getGioHangDao().selectCartByIdUser1(user.getId(),session2);
		}
//		List<ChiTietGioHang> res = new ArrayList<ChiTietGioHang>();
//		for(ChiTietGioHang c : cart) {
//			if(c.isStatus() && c.getSoLuong() > 0) res.add(c);
//		}
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
