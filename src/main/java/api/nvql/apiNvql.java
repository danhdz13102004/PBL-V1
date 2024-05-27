package api.nvql;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Date;
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

import dao.CtGiamGiaDAO;
import dao.DonHangDAO;
import dao.HQLutil;
import dao.SachDao;
import dao.TheLoaiDAO;
import model.ChuongTrinhGiamGia;
import model.NhaXuatBan;
import model.Sach;
import model.TacGia;
import model.TheLoai;
import modelApi.ChuongTrinhGiamGiaSerializer;
import modelApi.DoanhThuThang;
import modelApi.DoanhThuTuan;
import modelApi.NhaXuatBanSerializer;
import modelApi.SachSerializer;
import modelApi.TacGiaSerializer;
import modelApi.TheLoaiSerializer;
import util.HibernateUtil;
import java.sql.Timestamp;
@WebServlet(urlPatterns = "/api/nvql/*")
public class apiNvql extends HttpServlet {
	
	private final Object lock = new Object();
	HttpSession session;
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
			System.out.println(url);
			request.setCharacterEncoding("UTF-8");
			response.setCharacterEncoding("UTF-8");
			response.setContentType("text/html; charset=UTF-8");
			session = request.getSession();
			if(url.equals("getTheLoaiSach")) {
				getTheLoaiSach(request, response);
			}
			else if(url.equals("addTheLoaiSach")) {
				addTheLoaiSach(request, response);
			}
			else if(url.equals("getTacGia")) {
				getTacGia(request, response);
			}
			else if(url.equals("addTacGia")) {
				addTacGia(request, response);
			}
			else if(url.equals("getNhaXuatBan")) {
				getNhaXuatBan(request, response);
			}
			else if(url.equals("addNhaXuatBan")) {
				addNhaXuatBan(request, response);
			}
			else if(url.equals("deleteSach")) {
				deleteSach(request, response);
			}
			else if(url.equals("getDoanhThuThang")) {
				getDoanhThuThang(request, response);
			}
			else if(url.equals("getDoanhThuNgay")) {
				getDoanhThuNgay(request, response);
			}
			else if(url.equals("getDoanhThuTuan")) {
				getDoanhThuTuan(request, response);
			}
			else if(url.equals("addNewDiscount")) {
				addNewDiscount(request,response);
			}
			else if(url.equals("selectDiscount")) {
				selectDiscount(request, response);
			}
			else if(url.equals("updateDiscount")) {
				updateDiscount(request, response);
			}
			else if(url.equals("deleteDiscount")) {
				deleteDiscount(request,response);
			}
			else if(url.equals("countDiscount")) {
				countDiscount(request, response);
			}
			
		}
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		doGet(req, resp);
	}
	
	protected void getTheLoaiSach(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		List<TheLoai> listTL = (List<TheLoai>) session.getAttribute("listTL");
		Session session2 = null;
		if(listTL == null) {
			session2 = HibernateUtil.getSessionFactory().openSession();
			listTL = HQLutil.getInstance().doSelectAll(TheLoai.class, session2);
			session.setAttribute("listTL",listTL);
		}
		GsonBuilder gb = new GsonBuilder();
    	gb.registerTypeAdapter(model.TheLoai.class, new TheLoaiSerializer());
    	Gson gson = gb.create();
    	String json = gson.toJson(listTL);
    	response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();
        if(session2 != null) session2.close();
	}
	
	protected void addTheLoaiSach(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		List<TheLoai> listTL = (List<TheLoai>) session.getAttribute("listTL");
		Session session2 = HibernateUtil.getSessionFactory().openSession();
		if(listTL == null) {
			listTL = HQLutil.getInstance().doSelectAll(TheLoai.class, session2);
		}
		String name = request.getParameter("name");
		TheLoai theLoai = new TheLoai();
		theLoai.setTenTheLoai(name);
		listTL.add(theLoai);
		HQLutil.getInstance().doInsert(theLoai, session2);
		session.setAttribute("listTL",listTL);
		session2.close();
	}
	
	protected void getTacGia(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		List<TacGia> listTG = (List<TacGia>) session.getAttribute("listTG");
		Session session2 = null;
		if(listTG == null) {
			session2 = HibernateUtil.getSessionFactory().openSession();
			listTG = HQLutil.getInstance().doSelectAll(TacGia.class, session2);
			session.setAttribute("listTG",listTG);
		}
		GsonBuilder gb = new GsonBuilder();
    	gb.registerTypeAdapter(model.TacGia.class, new TacGiaSerializer());
    	Gson gson = gb.create();
    	String json = gson.toJson(listTG);
    	response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();
        if(session2 != null) session2.close();
	}
	
	protected void addTacGia(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		List<TacGia> listTG = (List<TacGia>) session.getAttribute("listTG");
		Session session2 = HibernateUtil.getSessionFactory().openSession();
		if(listTG == null) {
			listTG = HQLutil.getInstance().doSelectAll(TacGia.class, session2);
		}
		String name = request.getParameter("name");
		TacGia tacGia = new TacGia();
		tacGia.setTen(name);
		listTG.add(tacGia);
		HQLutil.getInstance().doInsert(tacGia, session2);
		session.setAttribute("listTG",listTG);
		session2.close();
	}
	
	protected void getNhaXuatBan(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		List<NhaXuatBan> listNxb = (List<NhaXuatBan>) session.getAttribute("listNxb");
		Session session2 = null;
		if(listNxb == null) {
			session2 = HibernateUtil.getSessionFactory().openSession();
			listNxb = HQLutil.getInstance().doSelectAll(NhaXuatBan.class, session2);
			session.setAttribute("listNxb",listNxb);
		}
		GsonBuilder gb = new GsonBuilder();
    	gb.registerTypeAdapter(model.NhaXuatBan.class, new NhaXuatBanSerializer());
    	Gson gson = gb.create();
    	String json = gson.toJson(listNxb);
    	response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();
        if(session2 != null) session2.close();
	}
	
	
	protected void addNhaXuatBan(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		List<NhaXuatBan> listNxb = (List<NhaXuatBan>) session.getAttribute("listNxb");
		Session session2 = HibernateUtil.getSessionFactory().openSession();
		if(listNxb == null) {
			listNxb = HQLutil.getInstance().doSelectAll(NhaXuatBan.class, session2);
		}
		String name = request.getParameter("name");
		NhaXuatBan nhaXuatBan = new NhaXuatBan();
		nhaXuatBan.setTenNxb(name);
		listNxb.add(nhaXuatBan);
		HQLutil.getInstance().doInsert(nhaXuatBan, session2);
		session.setAttribute("listNxb",listNxb);
		session2.close();
	}
	

	protected void deleteSach(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String id = request.getParameter("id");
		Session session = HibernateUtil.getSessionFactory().openSession();
		SachDao.getSachDao().deleteById(id, session);
		session.close();
	}
	
	protected void getDoanhThuThang(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		List<DoanhThuThang> list = (List<DoanhThuThang>) session.getAttribute("doanhThuThang");
		Session session2 = HibernateUtil.getSessionFactory().openSession();
		if(list == null) {
			list = DonHangDAO.getDonHangDao().getDoanhThuThang(session2);
			session.setAttribute("doanhThuThang", list);
		}
		Gson gson = new Gson();
		String json = gson.toJson(list);
    	response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();	
        session2.close();
	}
	
	protected void getDoanhThuNgay(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		Session session2 = HibernateUtil.getSessionFactory().openSession();		
		List<DoanhThuThang> list = DonHangDAO.getDonHangDao().getDoanhThuNgay(session2);
		Gson gson = new Gson();
		String json = gson.toJson(list);
    	response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();	
        session2.close();
	}
	
	protected void getDoanhThuTuan(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		List<DoanhThuTuan> list;
		HttpSession session = request.getSession();
		Session session2 = null;
		list = (List<DoanhThuTuan>) session.getAttribute("DoanhThuTuan");
		if(list == null) {
			session2 = HibernateUtil.getSessionFactory().openSession();
			list = DonHangDAO.getDonHangDao().getDoanhThuTuan(session2);
			session.setAttribute("DoanhThuTuan", list);
		}
		Gson gson = new Gson();
		String json = gson.toJson(list);
    	response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();	
        if(session2 != null) session2.close();
	}
	
	protected void addNewDiscount(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String name = request.getParameter("name");
		Date starttime = Date.valueOf(request.getParameter("starttime"));
		Date endtime = Date.valueOf(request.getParameter("endtime"));
		Double percent = Double.parseDouble(request.getParameter("percent"));
		String category = request.getParameter("category");
		String author = request.getParameter("author");
		String producer = request.getParameter("producer");
		if(category.equals("0")) category = "%%";
		if(author.equals("0")) author = "%%";
		if(producer.equals("0")) producer = "%%";
		
		
		Timestamp start = new Timestamp(starttime.getTime());
		Timestamp end = new Timestamp(endtime.getTime());
		
		Session session = HibernateUtil.getSessionFactory().openSession();
		ChuongTrinhGiamGia c = new ChuongTrinhGiamGia();
		c.setName(name);
		c.setNgayBatDau(start);
		c.setNgayKetThuc(end);
		c.setMucGiam(percent);
		HttpSession session2 = request.getSession();
		List<ChuongTrinhGiamGia> list = (List<ChuongTrinhGiamGia>) session2.getAttribute("page" + 1 + "s" + 5 + "txt");
		list.add(c);
		session2.setAttribute(("page" + 1 + "s" + 5 + "txt"), list);
		CtGiamGiaDAO.getInstance().insert(c, session);
		SachDao.getSachDao().updateGiamGia(author, category, producer, c, session);

	}
	
	protected void selectDiscount(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Integer page = Integer.parseInt(request.getParameter("page"));
		Integer size = Integer.parseInt(request.getParameter("size"));
		String txt = request.getParameter("txt");
		if(txt == null) txt = "";
		System.out.println(page + " " + size);
		HttpSession session = request.getSession();
		Session session2 = null;
		List<ChuongTrinhGiamGia> list = (List<ChuongTrinhGiamGia>) session.getAttribute("page" + page + "s" + size + "txt" + txt);
		if(list == null) {
			session2 = HibernateUtil.getSessionFactory().openSession();
			list = CtGiamGiaDAO.getInstance().selectWithText(page, size, txt, session2);
			session.setAttribute("page" + page + "s" + size + "txt" + txt, list);
		}
		for(ChuongTrinhGiamGia c : list) System.out.println(c.getName());
		GsonBuilder gb = new GsonBuilder();
    	gb.registerTypeAdapter(model.ChuongTrinhGiamGia.class, new ChuongTrinhGiamGiaSerializer());
    	Gson gson = gb.create();
    	String json = gson.toJson(list);
    	response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();
        if(session2 != null) session2.close();
	}
	
	protected void updateDiscount(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String id = request.getParameter("id");
		Date start = Date.valueOf(request.getParameter("start"));
		Date end = Date.valueOf(request.getParameter("end"));
		String name = request.getParameter("name");
		Double discount = Double.parseDouble(request.getParameter("discount"));
		
		Timestamp start_time = new Timestamp(start.getTime());
		Timestamp end_time = new Timestamp(end.getTime());
		
		ChuongTrinhGiamGia c = new ChuongTrinhGiamGia();
		c.setId(id);
		c.setName(name);
		c.setNgayBatDau(start_time);
		c.setNgayKetThuc(end_time);
		c.setMucGiam(discount);
		Session session = HibernateUtil.getSessionFactory().openSession();
		HQLutil.getInstance().doUpdate(c, session);
		session.close();
	}
	
	protected void deleteDiscount(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String id = request.getParameter("id");
		HttpSession session = request.getSession();
		session.removeAttribute("page" + 1 + "s" + 5 + "txt");
		Session session2 = HibernateUtil.getSessionFactory().openSession();
		CtGiamGiaDAO.getInstance().deleteById(id, session2);
		session2.close();	
	}
	
	protected void countDiscount(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String txt = request.getParameter("txt");
		if(txt == null) txt = "";
		HttpSession session = request.getSession();
		Long res = (Long) session.getAttribute("totalDiscount" + txt);
		Session session2 = HibernateUtil.getSessionFactory().openSession();
		if(res == null) {
			res = CtGiamGiaDAO.getInstance().countAll(session2, txt);
			session.setAttribute("totalDiscount" + txt, res);
		}
		Gson gson = new Gson();
		String json = gson.toJson(res);
    	response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();	
		
	}
}
