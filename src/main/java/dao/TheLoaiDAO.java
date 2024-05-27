package dao;

import java.util.List;

import org.hibernate.Session;

import model.TheLoai;
import util.HibernateUtil;

public class TheLoaiDAO {
	private static TheLoaiDAO theLoaiDAO = null;
	public static TheLoaiDAO getTheLoaiDAO() {
		if(theLoaiDAO == null) theLoaiDAO = new TheLoaiDAO();
		return theLoaiDAO;
	}
	
	public List<TheLoai> selectAll(Session session) {
		try {
			String hql = "FROM TheLoai";
			return session.createQuery(hql).list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	
	public static void main(String[] args) {
		Session session = HibernateUtil.getSessionFactory().openSession();
		TheLoai theLoai = new TheLoai();
		theLoai.setTenTheLoai("Sách Hay");
		System.out.println(HQLutil.getInstance().doInsert(theLoai, session));
		session.close();
	}
}
