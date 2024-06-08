package listener;

import java.util.List;

import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import dao.GioHangDAO;
import model.ChiTietGioHang;
import model.Sach;
import model.User;
import util.HibernateUtil;

@WebListener
public class MySessionListener implements HttpSessionListener {

    @Override
    public void sessionDestroyed(HttpSessionEvent se) {
    	System.out.println("before destroy");
    	HttpSession session = se.getSession();
		User user = (User) session.getAttribute("khachHang");
		List<ChiTietGioHang> cart = (List<ChiTietGioHang>) session.getAttribute("cart");
		org.hibernate.Session session2 =  HibernateUtil.getSessionFactory().openSession();
		for(ChiTietGioHang c : cart) {
			
			GioHangDAO.getGioHangDao().updateCart(c.getSach().getId(), user.getId(), c.getSoLuong(), session2);
		}
		
    }

	@Override
	public void sessionCreated(HttpSessionEvent se) {
		// TODO Auto-generated method stub
		
	}
}