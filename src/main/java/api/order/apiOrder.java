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

import dao.DonHangDAO;
import dao.GioHangDAO;
import dao.SachDao;
import model.ChiTietDonHang;
import model.ChiTietGioHang;
import model.DonHang;
import model.User;
import modelApi.ChiTietGioHangSerializer;
import modelApi.DonHangSerializer;
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
				String[] arr = url.split("/");
				url = arr[arr.length - 1];
				
			if(url.equals("selectItemInOrder")) {
				selectItemInOrder(request,response);
			}
			else if(url.equals("selectOrder")) {
				selectOrder(request, response);
			}
			else if(url.equals("updateOrder")) {
				updateOrder(request, response);
			}
			else if(url.equals("countAll")) {
				countAll(request, response);
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
	
	protected void selectOrder(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Integer page = Integer.parseInt(request.getParameter("page"));
		Integer size = Integer.parseInt(request.getParameter("size"));
		Session session = HibernateUtil.getSessionFactory().openSession();
		List<DonHang> list = DonHangDAO.getDonHangDao().selectAllByPaging(page, size, session);
		GsonBuilder gb = new GsonBuilder();
    	gb.registerTypeAdapter(model.DonHang.class, new DonHangSerializer());
    	Gson gson = gb.create();
    	String json = gson.toJson(list);
    	response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();	
        if(session != null) session.close();	
	}
	
	
	protected void updateOrder(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String id = request.getParameter("id");
		String status = request.getParameter("status");
		Session session = HibernateUtil.getSessionFactory().openSession();
		if(status.equals("delete")) {
			DonHangDAO.getDonHangDao().updateStatus(id, DonHang.Status.DAHUY, session);
			DonHang dh = DonHangDAO.getDonHangDao().selectDonHangById(id, session);
			for(ChiTietDonHang c : dh.getListCTDH()) {
				SachDao.getSachDao().updateSoluong(c.getSach().getId(), session, -1 * c.getSoLuong());
			}
		}
		else if(status.equals("confirm")) {
			DonHangDAO.donHangDAO.updateStatus(id, DonHang.Status.DAXACNHAN, session);
		}
	}
	
	
	protected void countAll(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("Count ne");
		HttpSession session = request.getSession();
		Session session2 = null;
		Integer sl  = (Integer) request.getAttribute("slOrder");
		if(sl == null) {
			session2 = HibernateUtil.getSessionFactory().openSession();
			sl = DonHangDAO.getDonHangDao().countAllOrder(session2);
			session.setAttribute("slOrder", sl);
		}
		System.out.println("sl " + sl);
		Gson gson = new Gson();
		String json = gson.toJson(sl);
    	response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();	
	}
	
}
