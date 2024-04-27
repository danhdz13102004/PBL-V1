package api.user;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
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
import com.mysql.cj.x.protobuf.MysqlxCrud.Collection;

import dao.ChiTietDonHangDao;
import dao.DonHangDAO;
import dao.GioHangDAO;
import dao.SachDao;
import dao.TheLoaiDAO;
import model.ChiTietDonHang;
import model.ChiTietGioHang;
import model.DonHang;
import model.Sach;
import model.SachAPI;
import model.TheLoai;
import model.User;
import modelApi.ChiTietGioHangSerializer;
import modelApi.DonHangSerializer;
import modelApi.SachSerializer;
import modelApi.TheLoaiSerializer;
import util.HibernateUtil;



@WebServlet(urlPatterns = "/api/user/*")
public class apiUser extends HttpServlet {
	SachDao sachDao = SachDao.getSachDao();
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
			System.out.println(url);
			if(url.contains("/getNewestItem")) {
				getNewestItems(request, response);
			}
			else if(url.contains("/selectByText")) {
				selectByText(request, response);
			}
			else if(url.contains("/selectByKindOfBook")) {
				selectByKindOfBook(request, response);
			}
			else if(url.contains("/selectCart")) {
				selectCart(request, response);
			}
			else if(url.contains("/selectOrder")) {
				selectOrder(request, response);
			}
			else if(url.contains("/selectOrderDesciption")) {
				selectOrderDesciption(request, response);
			}
			else if(url.contains("/updateCart")) {
				updateCart(request, response);
			}
			else if(url.contains("/deleteAndShow")) {
				deleteAndShow(request, response);
			}
			else if(url.contains("/countNumber")) {
				countNumber(request, response);
			}
			else if(url.contains("/countNumberByCategory")) {
				countNumberByCategory(request, response);
			}
			else if(url.contains("/getAllTheLoai")) {
				getAllTheLoai(request, response);
			}
		}
		
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
	}
	
	protected void getNewestItems(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		Session session2 = HibernateUtil.getSessionFactory().openSession();
		List<Sach> list = (List<Sach>) session.getAttribute("listNewest");
		if(list == null) {
			list = sachDao.selectNewestItem(session2);
			session.setAttribute("listNewest", list);
		}
		Session s=HibernateUtil.getSessionFactory().openSession();
    	GsonBuilder gb = new GsonBuilder();
    	gb.registerTypeAdapter(model.Sach.class, new SachSerializer());
    	Gson gson = gb.create();
    	String json = gson.toJson(list);
    	response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();
        session2.close();
	}
	
	protected void selectByText(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Integer page = Integer.parseInt(request.getParameter("page"));
		Integer size = Integer.parseInt(request.getParameter("size"));
		String sort = request.getParameter("sort");
		if(sort == null) sort = "";
		String txt = request.getParameter("txt");
		Session session = HibernateUtil.getSessionFactory().openSession();
		HttpSession session1 = request.getSession();
		if(txt == null) txt = "";
		txt = "%" + txt + "%";
		List<Sach> list = (List<Sach>) session1.getAttribute("page" + page.toString() + txt);
		if(list == null) {
			list = sachDao.selectWithText(page, size, txt,session);
			session1.setAttribute("page" + page.toString() + txt, list);
		}
//		System.out.println("sort: " + sort);
		if(sort.equals("inc")) {
				Collections.sort(list, new Comparator<Sach>() {
					@Override
					public int compare(Sach sach1, Sach sach2) {
						return Double.compare(sach1.getGiaBan(), sach2.getGiaBan());
					}
				});				
		}
		else if(sort.equals("dec")) {
			Collections.sort(list, new Comparator<Sach>() {
	            @Override
	            public int compare(Sach sach1, Sach sach2) {
	                return Double.compare(sach2.getGiaBan(), sach1.getGiaBan());
	            }
	        });
		}
		GsonBuilder gb = new GsonBuilder();
    	gb.registerTypeAdapter(model.Sach.class, new SachSerializer());
    	Gson gson = gb.create();
    	String json = gson.toJson(list);
    	response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();
        session.close();
	}
	
	protected void selectByKindOfBook(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Integer page = Integer.parseInt(request.getParameter("page"));
		Integer size = Integer.parseInt(request.getParameter("size"));
		String idtheloai = request.getParameter("idtheloai");
		String sort = request.getParameter("sort");
		if(sort == null) sort = "";
		Session session = HibernateUtil.getSessionFactory().openSession();
		if(idtheloai == null) idtheloai = "";
		List<Sach> list = sachDao.selectWithKindOfBook(page, size, idtheloai,session);
		if(sort.equals("inc")) {
			Collections.sort(list, new Comparator<Sach>() {
				@Override
				public int compare(Sach sach1, Sach sach2) {
					return Double.compare(sach1.getGiaBan(), sach2.getGiaBan());
				}
			});				
		}
		else if(sort.equals("dec")) {
			Collections.sort(list, new Comparator<Sach>() {
	            @Override
	            public int compare(Sach sach1, Sach sach2) {
	                return Double.compare(sach2.getGiaBan(), sach1.getGiaBan());
	            }
	        });
		}
		GsonBuilder gb = new GsonBuilder();
    	gb.registerTypeAdapter(model.Sach.class, new SachSerializer());
    	Gson gson = gb.create();
    	String json = gson.toJson(list);
    	response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();
        session.close();
	}
	
	protected void selectCart(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		List<ChiTietGioHang> cart = (List<ChiTietGioHang>) session.getAttribute("cart");
		Session session2 = null;
		if(cart == null) {
			User user = (User) session.getAttribute("khachHang");
			session2 = HibernateUtil.getSessionFactory().openSession();
			cart = GioHangDAO.getGioHangDao().selectCartByIdUser1(user.getId(),session2);
		}
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
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("khachHang");
		Session session2 = HibernateUtil.getSessionFactory().openSession();
		List<DonHang> list =  DonHangDAO.getDonHangDao().selectDonHangByUserId(user.getId(),session2);
		GsonBuilder gb = new GsonBuilder();
    	gb.registerTypeAdapter(model.DonHang.class, new DonHangSerializer());
    	Gson gson = gb.create();
    	String json = gson.toJson(list);
    	response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();	
        session2.close();
	}
	
	protected void selectOrderDesciption(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String id = request.getParameter("id");
		Session session2 = HibernateUtil.getSessionFactory().openSession();
		List<ChiTietDonHang> list = ChiTietDonHangDao.getChiTietDonHangDao().getChiTietDonHangByOrderId(id, session2);
		GsonBuilder gb = new GsonBuilder();
    	gb.registerTypeAdapter(model.ChiTietDonHang.class, new ChiTietDonHang());
    	Gson gson = gb.create();
    	String json = gson.toJson(list);
    	response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();	
        session2.close();
	}
	
	
	protected void updateCart(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String id = request.getParameter("id");
		Integer soluong = Integer.parseInt(request.getParameter("soluong"));
		HttpSession session = request.getSession();
		Session session2 = null;
		List<ChiTietGioHang> cart = (List<ChiTietGioHang>) session.getAttribute("cart");
		if(cart == null) {
			User user = (User) session.getAttribute("khachHang");
			session2 = HibernateUtil.getSessionFactory().openSession();
			cart = GioHangDAO.getGioHangDao().selectCartByIdUser1(user.getId(),session2);
		}
		for(ChiTietGioHang c : cart) {
			if(c.getSach().getId().equals(id)) {
				c.setSoLuong(c.getSoLuong() + soluong);
				break;
			}
		}
		for(ChiTietGioHang c : cart) {
			System.out.println(c.getSach().getTen() + " " + c.getSoLuong());
		}
		session.setAttribute("cart", cart);
		if(session2 != null) session2.close();
	}
	
	protected void deleteAndShow(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String id = request.getParameter("id");
		HttpSession session = request.getSession();
		Session session2 = null;
		List<ChiTietGioHang> cart = (List<ChiTietGioHang>) session.getAttribute("cart");
		if(cart == null) {
			User user = (User) session.getAttribute("khachHang");
			session2 = HibernateUtil.getSessionFactory().openSession();
			cart = GioHangDAO.getGioHangDao().selectCartByIdUser1(user.getId(),session2);
		}
		for(ChiTietGioHang c : cart) {
			if(c.getSach().getId().equals(id)) {
				c.setSoLuong(0);
				break;
			}
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
	
	protected void countNumber(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		String txt = (String) request.getParameter("txt");
		if(txt == null) txt ="";
		Integer sl = (Integer) session.getAttribute("sl"+txt);
//		System.out.println(txt);
		if(sl == null) {
			Session session2 = HibernateUtil.getSessionFactory().openSession();
			sl = SachDao.getSachDao().countAllSach(session2, txt);
			session.setAttribute("sl" + txt, sl);
		}
		Gson gson = new Gson();
		String json = gson.toJson(sl);
    	response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();	
	}
	
	protected void countNumberByCategory(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		String id = (String) request.getParameter("txt");
		Integer sl = (Integer) session.getAttribute("category"+id);
//		System.out.println(txt);
		if(sl == null) {
			Session session2 = HibernateUtil.getSessionFactory().openSession();
			sl = SachDao.getSachDao().countAllByCategory(session2, id);
			session.setAttribute("category" + id, sl);
		}
		Gson gson = new Gson();
		String json = gson.toJson(sl);
    	response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();	
	}
	
	protected void getAllTheLoai(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		List<TheLoai> listTheLoai = (List<TheLoai>) session.getAttribute("listTheLoai");
		Session session2 = HibernateUtil.getSessionFactory().openSession();
		if(listTheLoai == null) {
			listTheLoai = TheLoaiDAO.getTheLoaiDAO().selectAll(session2);
			session.setAttribute("listTheLoai", listTheLoai);
		}
		GsonBuilder gb = new GsonBuilder();
    	gb.registerTypeAdapter(model.TheLoai.class, new TheLoaiSerializer());
    	Gson gson = gb.create();
    	String json = gson.toJson(listTheLoai);
    	response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();	
        if(session2 != null) session2.close();
	}
	
}
