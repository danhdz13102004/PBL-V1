package dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;

import model.DonHang;
import util.HibernateUtil;

public class DonHangDAO {
	public static DonHangDAO donHangDAO = null;
	
	public static DonHangDAO getDonHangDao() {
		if(donHangDAO == null) donHangDAO = new DonHangDAO();
		return donHangDAO;
	}
	
	public void addDonHang(DonHang donHang) {
		Session s = HibernateUtil.getSessionFactory().openSession();
		try {
			HQLutil.getInstance().doInsert(donHang,s);
		} catch (Exception e) {
			e.printStackTrace();
		}
		s.close();
	}
	
	public void updateStatus(String id,DonHang.Status status,Session session) {
		try {
			Transaction tr = session.beginTransaction();
			String hql = "UPDATE DonHang u SET u.tinhTrang = :status WHERE u.id = :id";
			session.createQuery(hql)
					.setParameter("status", status)
					.setParameter("id", id)
					.executeUpdate();
			tr.commit();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	public List<DonHang> selectDonHangByUserId(String id,Session session) {
		try {
			String hql = "select dh FROM DonHang dh where dh.khachHang.id = :id";
			return session.createQuery(hql).setParameter("id",id).list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	public static void main(String[] args) {
		List<DonHang> list = DonHangDAO.getDonHangDao().selectDonHangByUserId("1713455089563", HibernateUtil.getSessionFactory().openSession());
		for(DonHang d : list) {
			System.out.println(d.getId());
		}
	}
	
}
