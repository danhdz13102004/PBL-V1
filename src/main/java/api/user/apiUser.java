package api.user;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder.In;
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
import dao.DiaChiGiaoHangDAO;
import dao.DonHangDAO;
import dao.GioHangDAO;
import dao.HQLutil;
import dao.SachDao;
import dao.TheLoaiDAO;
import dao.UserDao;
import model.ChiTietDonHang;
import model.ChiTietGioHang;
import model.DiaChiGiaoHang;
import model.DonHang;
import model.Sach;
import model.TheLoai;
import model.User;
import modelApi.ChiTietGioHangSerializer;
import modelApi.DiaChiGiaoHangSerializer;
import modelApi.DonHangSerializer;
import modelApi.DonHangSerializer1;
import modelApi.SachSerializer;
import modelApi.TheLoaiSerializer;
import modelApi.UserSerializer;
import util.Email;
import util.HibernateUtil;
import util.RandomNumber;



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
			String[] arr = url.split("/");
			url = arr[arr.length - 1];
			System.out.println(url);
			if(url.equals("getNewestItem")) {
				getNewestItems(request, response);
			}
			else if(url.equals("selectByText")) {
				selectByText(request, response);
			}
			else if(url.equals("selectByKindOfBook")) {
				selectByKindOfBook(request, response);
			}
			else if(url.equals("selectCart")) {
				selectCart(request, response);
			}
			else if(url.equals("selectOrder")) {
				selectOrder(request, response);
			}
			else if(url.equals("selectOrderDesciption")) {
				selectOrderDesciption(request, response);
			}
			else if(url.equals("updateCart")) {
				updateCart(request, response);
			}
			else if(url.equals("deleteAndShow")) {
				deleteAndShow(request, response);
			}
			else if(url.equals("countNumberByCategory")) {
				countNumberByCategory(request, response);
			}
			else if(url.equals("countNumber")) {
				countNumber(request, response);
			}
			else if(url.equals("getAllTheLoai")) {
				getAllTheLoai(request, response);
			}
			else if(url.equals("requestSendEmail")) {
				requestSendEmail(request, response);
			}
			else if(url.equals("addNewAddress")) {
				addNewAddress(request, response);
			}
			else if(url.equals("selectAddress")) {
				selectAddress(request, response);
			}
			else if(url.equals("updateAddress")) {
				updateAddress(request, response);
			}
			else if(url.equals("selectInforUser")) {
				selectInforUser(request, response);
			}
			else if(url.equals("updateInforUser")) {
				updateInforUser(request, response);
			}
			else if(url.equals("selectOrderByState")) {
				selectOrderByState(request, response);
			}
			else if(url.equals("selectOrderById")) {
				selectOrderById(request, response);
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
		String reload = request.getParameter("reload");
		if(sort == null) sort = "";
		String txt = request.getParameter("txt");
		Session session = HibernateUtil.getSessionFactory().openSession();
		HttpSession session1 = request.getSession();
		if(txt == null) txt = "";
		txt = "%" + txt + "%";
		List<Sach> list = (List<Sach>) session1.getAttribute("page" + page.toString() + txt + "s" + size.toString());
		System.out.println("page" + page.toString() + txt + "s" + size.toString());
		if(list == null || reload != null) {
			list = sachDao.selectWithText(page, size, txt,session);
			session1.setAttribute("page" + page.toString() + txt + "s" + size.toString(), list);
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
		for(ChiTietGioHang c : cart) {
			c.setStatus(false);
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
		boolean check =true;
		if(cart == null) {
			User user = (User) session.getAttribute("khachHang");
			session2 = HibernateUtil.getSessionFactory().openSession();
			cart = GioHangDAO.getGioHangDao().selectCartByIdUser1(user.getId(),session2);
		}
		for(ChiTietGioHang c : cart) {
			if(c.getSach().getId().equals(id)) {
				c.setSoLuong(c.getSoLuong() + soluong);
				check = false;
				break;
			}
		}
		if(check) {
			User user = (User) session.getAttribute("khachHang");
			Sach s = new Sach();
			s.setId(id);
			ChiTietGioHang ctgh = new ChiTietGioHang(user, s, 1);
			cart.add(ctgh);
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
		String id = (String) request.getParameter("id");
		Integer sl = (Integer) session.getAttribute("category_number"+id);
//		System.out.println(txt);
		System.out.println(id);
		if(sl == null) {
			Session session2 = HibernateUtil.getSessionFactory().openSession();
			sl = SachDao.getSachDao().countAllByCategory(session2, id);
			session.setAttribute("category_number" + id, sl);
		}
		System.out.println(sl);
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
	
	protected void requestSendEmail(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String email = request.getParameter("email");
		String maXacThuc = RandomNumber.getNumber();
		
		Email.sendEmail(email, "Lấy lại mật khẩu", "Đây là mã xác thực để lấy lại mật khẩu: " + maXacThuc + ".Vui lòng sử dụng mã này để hoàn tất quá trình!");
		UserDao.getUserDao().changeMaXacThuc(maXacThuc, email);
	}
	
	protected void addNewAddress(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("khachHang");
		String tenNguoiNhan = request.getParameter("tenNguoiNhan");
		String soDienThoai = request.getParameter("soDienThoai");
		String province = request.getParameter("province");
		String district = request.getParameter("district");
		String ward = request.getParameter("ward");
		String road = request.getParameter("road");
		String address = road + ", " + ward  + ", " + district + ", " + province;
		
		DiaChiGiaoHang c = new DiaChiGiaoHang(user, tenNguoiNhan, soDienThoai, address);
		Session session2 = HibernateUtil.getSessionFactory().openSession();
		DiaChiGiaoHangDAO.getDiaChiGiaoHangDAO().insert(c, session2);
		session2.close();
		
	}
	
	protected void selectAddress(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("khachHang");
		Session session2 = HibernateUtil.getSessionFactory().openSession();
		List<DiaChiGiaoHang> list = (List<DiaChiGiaoHang>) session.getAttribute("listAddress");
		if(list == null) {
			list = DiaChiGiaoHangDAO.getDiaChiGiaoHangDAO().getAddressById(user.getId(), session2);
			session.setAttribute("listAddress", list);
		}
		GsonBuilder gb = new GsonBuilder();
    	gb.registerTypeAdapter(model.DiaChiGiaoHang.class, new DiaChiGiaoHangSerializer());
    	Gson gson = gb.create();
    	String json = gson.toJson(list);
    	response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();	
        if(session2 != null) session2.close();	
	}
	
	protected void updateAddress(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("khachHang");
		String name = request.getParameter("name");
		String soDienThoai = request.getParameter("soDienThoai");
		String address = request.getParameter("address");
		String id = request.getParameter("id");
		DiaChiGiaoHang d = new DiaChiGiaoHang(user, name, soDienThoai, address);
		d.setId(id);
		Session session2 = HibernateUtil.getSessionFactory().openSession();
		HQLutil.getInstance().doUpdate(d, session2);
		session2.close();
	}
	
	protected void selectInforUser(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("khachHang");
		if(user != null) {
			GsonBuilder gb = new GsonBuilder();
	    	gb.registerTypeAdapter(model.User.class, new UserSerializer());
	    	Gson gson = gb.create();
	    	String json = gson.toJson(user);
	    	response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			PrintWriter out = response.getWriter();
	        out.print(json);
	        out.flush();	
		}
	
	}
	
	protected void updateInforUser(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("khachHang");
		String name = request.getParameter("name");
		String email = request.getParameter("email");
		String soDienThoai = request.getParameter("soDienThoai");
		if(user != null) {
			user.setEmail(email);
			user.setTen(name);
			user.setSoDienThoai(soDienThoai);
			Session session2 = HibernateUtil.getSessionFactory().openSession();
			HQLutil.getInstance().doUpdate(user, session2);
			session2.close();
		}
	
	}
	
	
	protected void selectOrderByState(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("khachHang");
		Integer page = Integer.parseInt(request.getParameter("page"));
		Integer size = Integer.parseInt(request.getParameter("size"));
		String status = request.getParameter("status");
		Session session2 = HibernateUtil.getSessionFactory().openSession();
		List<DonHang> res;
		res = (List<DonHang>) session.getAttribute("page" + page + "size" + size + "status" + status);
		if(res == null) {
				if(status.equals("all")) {
					res = DonHangDAO.getDonHangDao().selectDonHangByUserId(user.getId(), session2, page, size);
				}
				else if(status.equals("awaiting")) {
					res = DonHangDAO.getDonHangDao().selectDonHangByStatus(page, size,DonHang.Status.DANGXULY , user.getId(), session2);
				}
				else if(status.equals("cancelled")) {
					res = DonHangDAO.getDonHangDao()	.selectDonHangByStatus(page, size,DonHang.Status.DAHUY , user.getId(), session2);
				}
				else if(status.equals("daxacnhan")) {
					res = DonHangDAO.getDonHangDao().selectDonHangByStatus(page, size,DonHang.Status.DAXACNHAN , user.getId(), session2);
				}
				else if(status.equals("delivering")) {
					res = DonHangDAO.getDonHangDao().selectDonHangByStatus(page, size,DonHang.Status.DANGGIAOHANG , user.getId(), session2);
				}
				else if(status.equals("complete")) {
					res = DonHangDAO.getDonHangDao().selectDonHangByStatus(page, size,DonHang.Status.THANHCONG , user.getId(), session2);
				}
				else if(status.equals("trahang")) {
					res = DonHangDAO.getDonHangDao().selectDonHangByStatus(page, size,DonHang.Status.DANGCHOXULYTRAHANG , user.getId(), session2);
				}
				else if(status.equals("returned")) {
					res = DonHangDAO.getDonHangDao().selectDonHangByStatus(page, size,DonHang.Status.DATRAHANG,DonHang.Status.DANGCHOXULYTRAHANG,DonHang.Status.TUCHOITRAHANG,DonHang.Status.XACNHANTRAHANG, user.getId(), session2);
				}
				else {
					res = new ArrayList<DonHang>();
				}
				session.setAttribute(("page" + page + "size" + size + "status" + status), res);
		}
		
		GsonBuilder gb = new GsonBuilder();
    	gb.registerTypeAdapter(model.DonHang.class, new DonHangSerializer1());
    	Gson gson = gb.create();
    	String json = gson.toJson(res);
    	response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();	
        session2.close();
	
	}
	
	protected void selectOrderById(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		String id = request.getParameter("id");
		DonHang dh = (DonHang) session.getAttribute("donhang" + id);
		Session session2 = null;
		if(dh == null) {
			session2 = HibernateUtil.getSessionFactory().openSession();
			User user = (User) session.getAttribute("khachHang");
			dh = DonHangDAO.getDonHangDao().selectDonHangByUserIdAndOrderId(user.getId(),session2 , id);	
		}
		
		GsonBuilder gb = new GsonBuilder();
    	gb.registerTypeAdapter(model.DonHang.class, new DonHangSerializer());
    	Gson gson = gb.create();
    	String json = gson.toJson(dh);
    	response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();	
        if(session2 != null) session2.close();
	}
	
}
