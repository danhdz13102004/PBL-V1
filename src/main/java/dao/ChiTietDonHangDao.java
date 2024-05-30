package dao;

import java.util.List;

import org.hibernate.Session;

import model.ChiTietDonHang;
import model.DonHang;
import model.Sach;
import util.HibernateUtil;
import util.JsonUtil;

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
	public List<ChiTietDonHang> getUnratedChiTietDonHangOf(String userID, int page, int size, Session s)
	{
		String hql = "Select ctdh "
				+ "from "
				+" User u "
				+ "inner join u.listDonHang dh "
				+ "inner join dh.listCTDH ctdh "
				+ "where u.id = ?1 AND not exists (from User u1 inner join u1.listDanhGia dg "
												+ "where dg.sach.id = ctdh.sach.id "
												+ "AND u1.id = u.id)";
		List<ChiTietDonHang> res = HQLutil.getInstance().doQuery(hql, ChiTietDonHang.class, s, (page-1)*size, size, userID);
		return res;
	}
	public static void main(String[] args) {
		List<ChiTietDonHang> list;
		Session s = HibernateUtil.getSessionFactory().openSession();
		list = ChiTietDonHangDao.getChiTietDonHangDao().getUnratedChiTietDonHangOf("US00000001", 1, 100, s);
		System.out.println(JsonUtil.getInstance().jsonToString(list));
		HibernateUtil.close();
		
		
	}
}
