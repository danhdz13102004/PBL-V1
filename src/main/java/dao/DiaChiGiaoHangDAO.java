package dao;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;

import model.DiaChiGiaoHang;

public class DiaChiGiaoHangDAO {
	private static DiaChiGiaoHangDAO diaChiGiaoHangDAO = null;
	
	public static DiaChiGiaoHangDAO getDiaChiGiaoHangDAO() {
		if(diaChiGiaoHangDAO == null) diaChiGiaoHangDAO = new DiaChiGiaoHangDAO();
		return diaChiGiaoHangDAO;
	}
	
	public void insert(DiaChiGiaoHang d,Session session) {
		try {
			HQLutil.getInstance().doInsert(d, session);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public List<DiaChiGiaoHang> getAddressById(String id,Session session) {
		try {
			String hql = "select dh FROM DiaChiGiaoHang dh where dh.khachHang.id = :id";
			return session.createQuery(hql).setParameter("id", id).list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
