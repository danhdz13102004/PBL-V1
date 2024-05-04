package controller.order;

import java.io.IOException;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Random;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.Session;

import dao.DonHangDAO;
import dao.GioHangDAO;
import model.ChiTietDonHang;
import model.ChiTietGioHang;
import model.DonHang;
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
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(req, resp);
	}
	
	protected void addNewOrder(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String fullname = request.getParameter("fullname");
		String phonenumber = request.getParameter("phonenumber");
		String province = request.getParameter("province");
		String district = request.getParameter("district");
		String ward = request.getParameter("ward");
		String detailAddress = request.getParameter("detailAddress");
		Double totalPrice = Double.parseDouble(request.getParameter("totalprice"));

		DonHang dh =  new DonHang();
		Random rd = new Random();
		String id = System.currentTimeMillis() + rd.nextInt(1000) + "";
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("khachHang");
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		dh.setId(id);
		dh.setKhachHang(user);
		dh.setThoiGianDatHang(timestamp);
		dh.setDiaChiGiaoHang(detailAddress + ", " +  ward + ", " + district + ", " + province);
		dh.setTenNguoiNhan(fullname);
		dh.setSdtNguoiNhan(phonenumber);
		dh.setTinhTrang(DonHang.Status.DANGXULY);
		dh.setTongTien(totalPrice);
		DonHangDAO.getDonHangDao().addDonHang(dh);
		
	    List<ChiTietGioHang> cart = (List<ChiTietGioHang>) session.getAttribute("cart");
		Session session2 = null;
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
				
			}
		}
		
		
	}
}
