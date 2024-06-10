package controller.order;

import java.io.IOException;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Random;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.Session;

import dao.ChiTietDonHangDao;
import dao.DonHangDAO;
import dao.GioHangDAO;
import dao.SachDao;
import model.ChiTietDonHang;
import model.ChiTietGioHang;
import model.DonHang;
import model.Sach;
import model.User;
import util.HibernateUtil;
@WebServlet(urlPatterns = "/order/*")
public class allRequest extends HttpServlet {
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String url = null;
		try {
			url = request.getRequestURL().toString();			
		} catch (Exception e) {
			e.printStackTrace();
		}
		if(url.contains("/addNewOrder")) {
			addNewOrder(request, response);
		}
		else if(url.contains("/prepareOrder")) {
			prepareOrder(request, response);
		}
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(req, resp);
	}
	
	protected void addNewOrder(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html; charset=UTF-8");
		
		String fullname = request.getParameter("fullname");
		String phonenumber = request.getParameter("phonenumber");
//		String province = request.getParameter("province");
//		String district = request.getParameter("district");
//		String ward = request.getParameter("ward");
//		String detailAddress = request.getParameter("detail-address");
		String address = request.getParameter("address");
		Double totalPrice = Double.parseDouble(request.getParameter("totalprice"));
		System.out.println("Tong tien: " + totalPrice);
		DonHang dh =  new DonHang();
		/*
		 * Random rd = new Random(); String id = System.currentTimeMillis() +
		 * rd.nextInt(1000) + "";
		 */
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("khachHang");
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		Session session2 = HibernateUtil.getSessionFactory().openSession();
//		dh.setId(id);
		dh.setKhachHang(user);
		dh.setThoiGianDatHang(timestamp);
		dh.setDiaChiGiaoHang(address);
		dh.setTenNguoiNhan(fullname);
		dh.setSdtNguoiNhan(phonenumber);
		dh.setTinhTrang(DonHang.Status.DANGXULY);
		dh.setTongTien(totalPrice);
		DonHangDAO.getDonHangDao().addDonHang(dh,session2);
		
	    List<ChiTietGioHang> cart = (List<ChiTietGioHang>) session.getAttribute("cart");
		if(cart == null) {
			session2 = HibernateUtil.getSessionFactory().openSession();
			cart = GioHangDAO.getGioHangDao().selectCartByIdUser1(user.getId(),session2);
		}
		
		for(ChiTietGioHang c : cart) {
			if(c.isStatus() && c.getSoLuong() > 0) {
				ChiTietDonHang ctdh = new ChiTietDonHang();
				ctdh.setDonHang(dh);
				ctdh.setSach(c.getSach());
				ctdh.setGiaBan(c.getSach().getGiaBan());
				ctdh.setSoLuong(c.getSoLuong());
				ChiTietDonHangDao.getChiTietDonHangDao().addChiTietDonHang(ctdh,session2);
			}
		}
		
		for(ChiTietGioHang c : cart) {
			if(c.isStatus() && c.getSoLuong() > 0) {
				SachDao.getSachDao().updateSoluong(c.getSach().getId(), session2, c.getSoLuong());
			}
		}
		List<DonHang> list1 = (List<DonHang>) session.getAttribute("page1size10statusall");
		if(list1 != null) {
			list1.add(0,dh);
			session.setAttribute("page1size10statusall", list1);
		}
		List<DonHang> list2 = (List<DonHang>) session.getAttribute("page1size10statusawaiting");
		if(list2 != null) {
			list2.add(0,dh);
			session.setAttribute("page1size10statusawaiting", list2);
		}
		
		RequestDispatcher rq = getServletContext().getRequestDispatcher("/customer/useraccount.jsp");
		rq.forward(request, response);
		session2.close();
			
	}
	
	protected void prepareOrder(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("khachHang");
		String urlRedirect = "";
		if(user == null) {
			urlRedirect += "/customer/signin.jsp";
		}
		else {
			urlRedirect += "/customer/checkout.jsp";
			List<ChiTietGioHang> cart = (List<ChiTietGioHang>) session.getAttribute("cart");
			Session session2 = HibernateUtil.getSessionFactory().openSession();;
			if(cart == null) {
				cart = GioHangDAO.getGioHangDao().selectCartByIdUser1(user.getId(),session2);
			}
			String id = request.getParameter("id");
			Integer sl = Integer.parseInt(request.getParameter("soluong"));
			boolean check = true;
			for(ChiTietGioHang c : cart) {
				if(c.getSach().getId().equals(id)) {
					check = false;
					c.setSoLuong(sl);
					c.setStatus(true);
				}
				else {
					c.setStatus(false);
				}
			}
			if(check) {
//				System.out.println(id + " " + sl);
				Sach s = new Sach();
				s = SachDao.getSachDao().selectById(id, session2);
//				System.out.println(s.getTen() + " " + s.getId());
				ChiTietGioHang c = new ChiTietGioHang();
				c.setKhachHang(user);
				c.setSach(s);
				c.setSoLuong(sl);
				c.setStatus(true);
				cart.add(c);
			}
			session.setAttribute("cart", cart);
			if(session2 != null) session2.close();
		}
		
		RequestDispatcher rq = getServletContext().getRequestDispatcher(urlRedirect);
		rq.forward(request, response);
		
	}
}
