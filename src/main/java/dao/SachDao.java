package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.query.Query;

import org.hibernate.*;

import model.ChuongTrinhGiamGia;
import model.Sach;
import util.HibernateUtil;

public class SachDao  {
	private static SachDao sachDao = null;
	public static SachDao getSachDao() {
		if(sachDao == null) sachDao = new SachDao();
		return sachDao;
	}
	public List<Sach> selectNewestItem(Session session) {
	    List<Sach> arr = new ArrayList<>();
	    try {
//	        Session session = HibernateUtil.getSessionFactory().openSession();
	        String hql = "FROM Sach ORDER BY ngayThem DESC";
	        arr = session.createQuery(hql).setMaxResults(12).list();
//	        session.close();
	    } catch (Exception e) {
	        // Xử lý ngoại lệ ở đây nếu cần
	        e.printStackTrace();
	    }
	    return arr;
	}
	
	public List<Sach> selectWithText(Integer page, Integer size, String txt,Session session) {
	    List<Sach> arr = new ArrayList<>();
	    try {
//	    	Session session = HibernateUtil.getSessionFactory().openSession();
	        String hql = "FROM Sach WHERE ten LIKE :txt AND trangThai = true ORDER BY ngayThem DESC";
	        Query query = session.createQuery(hql);
	        query.setParameter("txt", "%" + txt + "%");
	        query.setFirstResult((page - 1) * size);
	        query.setMaxResults(size);
	        arr = query.list();
	    } catch (Exception e) {
	        e.printStackTrace();
	    }
	    return arr;
	}
	
	
	public List<Sach> selectWithKindOfBook(Integer page, Integer size, String theloai,Session session) {
	    List<Sach> arr = new ArrayList<>();
	    try {
//	        Session session = HibernateUtil.getSessionFactory().openSession();
	        String hql = "SELECT s FROM Sach s JOIN s.theLoai t WHERE t.id = :theloai AND s.trangThai = true ORDER BY s.ngayThem DESC";
	        Query query = session.createQuery(hql);
	        query.setParameter("theloai", theloai);
	        query.setFirstResult((page - 1) * size);
	        query.setMaxResults(size);
	        arr = query.list();
//	        session.close();
	    } catch (Exception e) {
	        // Xử lý ngoại lệ ở đây nếu cần
	        e.printStackTrace();
	    }
	    return arr;
	}
	
	public Integer countAllSach(Session session,String txt) {
		try {
			if(txt == null) txt ="";
			String hqlQuery = "select count(*) from Sach where ten like :ten AND trangThai = true";
			Long kq = (Long) session.createQuery(hqlQuery).setParameter("ten","%" + txt + "%").uniqueResult();
			return Integer.parseInt(kq.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}
	
	public Integer countAllByCategory(Session session,String id) {
		try {
			String hql = "SELECT COUNT(s) FROM Sach s JOIN s.theLoai t WHERE t.id = :theloai AND s.trangThai = true";
			Long kq = (Long) session.createQuery(hql).setParameter("theloai",id).uniqueResult();
			return Integer.parseInt(kq.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	
	public Sach selectById(String id,Session session) {
		try {
			Sach s = HQLutil.getInstance().doSelectById(Sach.class,id,session);
			return s;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	
	
	public void deleteById(String id,Session session) {
		try {
			Transaction tr = session.beginTransaction();
			String hql = "UPDATE Sach SET trangThai = :status WHERE id = :id";
			session.createQuery(hql)
			.setParameter("status", false)
			.setParameter("id", id).executeUpdate();
			tr.commit();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void updateSoluong(String id,Session session,Integer soluong) {
		
		try {
			Transaction tr = session.beginTransaction();
			String hql = "UPDATE Sach SET soLuongBan = soLuongBan + :soluong WHERE id = :id";
			session.createQuery(hql)
			.setParameter("soluong", soluong)
			.setParameter("id", id).executeUpdate();
			tr.commit();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	 public void updateGiamGia(String idTG,String idTL,String idNxb,ChuongTrinhGiamGia c,Session session) {
		 try {
				Transaction tr = session.beginTransaction();
				String hql = "UPDATE Sach s " +
			             "SET s.ctGiamGia = :newCtGiamGia " +
			             "WHERE s.tacGia.id LIKE :idTacGia " +
			             "AND s.theLoai.id LIKE :idTheLoai " +
			             "AND s.nxb.id LIKE :idNxb";
				session.createQuery(hql)
				.setParameter("idTacGia", idTG)
				.setParameter("idTheLoai", idTL)
				.setParameter("idNxb", idNxb)
				.setParameter("newCtGiamGia", c)
				.executeUpdate();
				tr.commit();
			} catch (Exception e) {
				e.printStackTrace();
			}
	 }
	
	
	public static void main(String[] args) {
		Session session = HibernateUtil.getSessionFactory().openSession();
		ChuongTrinhGiamGia c = CtGiamGiaDAO.getInstance().selectById(session, "DE00000005");
		getSachDao().updateGiamGia("1", "%%", "1",c , session);
	}
}
