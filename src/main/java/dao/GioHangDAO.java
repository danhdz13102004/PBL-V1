package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import model.ChiTietGioHang;
import model.Sach;
import util.HibernateUtil;

public class GioHangDAO {
	private static GioHangDAO gioHangDAO = null;
	public static GioHangDAO getGioHangDao() {
		if(gioHangDAO == null) gioHangDAO = new GioHangDAO();
		return gioHangDAO;
	}

	public Map<Sach, Integer> selectCartByIdUser(String id,Session session) {
		Map<Sach, Integer> res = new HashMap<Sach, Integer>();
		try {
			List<ChiTietGioHang> list = session.createQuery("SELECT ctgh FROM ChiTietGioHang ctgh\r\n"
					+ "WHERE ctgh.khachHang.id = :val and ctgh.soLuong > 0")
					.setParameter("val", id).list();
			for(ChiTietGioHang c : list) {
				res.put(c.getSach(), c.getSoLuong());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return res;
	}
	
	public List<ChiTietGioHang> selectCartByIdUser1(String id,Session session) {
		Map<Sach, Integer> res = new HashMap<Sach, Integer>();
		try {
			return session.createQuery("SELECT ctgh FROM ChiTietGioHang ctgh\r\n"
					+ "WHERE ctgh.khachHang.id = :val and ctgh.soLuong > 0")
					.setParameter("val", id).list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}
	public void updateCart(String id_sach,String id,Integer soluong,Session session) {
		try {
			String countHql = "SELECT COUNT(*) " +
	                  "FROM ChiTietGioHang " +
	                  "WHERE khachHang.id = :idNguoiDung AND sach.id = :idSach";
			Long existingCount = (Long) session.createQuery(countHql)

                    .setParameter("idNguoiDung", id)

                    .setParameter("idSach", id_sach)

                    .uniqueResult();
			Transaction transaction = session.beginTransaction();
			System.out.println(existingCount);
			// Kiểm tra đã tồn tại trong table hay chưa
			if(existingCount > 0) {
				String updateHql = "UPDATE ChiTietGioHang " +
		                   "SET soLuong = :soLuong " +
		                   "WHERE khachHang.id = :idNguoiDung AND sach.id = :idSach"; 
				session.createQuery(updateHql)
						.setParameter("soLuong", soluong)
						.setParameter("idNguoiDung", id)
						.setParameter("idSach", id_sach)
						.executeUpdate();
			}
			else {
				String insertHql = "INSERT INTO ChiTietGioHang (khachHang, sach, soLuong) " +
		                   "SELECT kh, s, :soLuong " +
		                   "FROM User kh, Sach s " +
		                   "WHERE kh.id = :idNguoiDung AND s.id = :idSach";
				session.createQuery(insertHql)
				.setParameter("soLuong", soluong)
				.setParameter("idNguoiDung", id)
				.setParameter("idSach", id_sach)
				.executeUpdate();
			}
			transaction.commit();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
	public static void main(String[] args) throws HibernateException {
		GioHangDAO.getGioHangDao().updateCart("4", "1713455089563", 2, HibernateUtil.getSessionFactory().openSession());
	}

}
