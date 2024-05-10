package dao;

import java.util.List;

import org.hibernate.Session;

import model.ChiTietDonHang;
import model.DonHang;
import model.Sach;
import util.HibernateUtil;

public class ChiTietDonHangDao  {
	public static ChiTietDonHangDao chiTietDonHangDao = null;
	
	public static ChiTietDonHangDao getChiTietDonHangDao() {
		if(chiTietDonHangDao == null) chiTietDonHangDao = new ChiTietDonHangDao();
		return chiTietDonHangDao;
	}
	
	public void addChiTietDonHang(ChiTietDonHang c, Session s) {
		try {
			HQLutil.getInstance().doInsert(c,s);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public List<ChiTietDonHang> getChiTietDonHangByOrderId(String id,Session session) {
		try {
			String hql = "SELECT ctdh FROM ChiTietDonHang ctdh\r\n"
					+ "WHERE ctdh.donHang.id = :id\r\n"
					+ "";
			return session.createQuery(hql).setParameter("id" ,id).list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	 
	public static void main(String[] args) {
		List<ChiTietDonHang> list = ChiTietDonHangDao.getChiTietDonHangDao().getChiTietDonHangByOrderId("123", HibernateUtil.getSessionFactory().openSession());
		for(ChiTietDonHang c : list) {
			System.out.println(c.getId() +  " " + c.getDonHang().getId());
		}
	}
}
