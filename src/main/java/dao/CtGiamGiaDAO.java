package dao;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.Session;

import model.ChuongTrinhGiamGia;
import model.Sach;
import util.HibernateUtil;
import util.JsonUtil;

public class CtGiamGiaDAO {
	private static CtGiamGiaDAO Instance;
	public static CtGiamGiaDAO getInstance()
	{
		if (Instance == null)
		{
			Instance = new CtGiamGiaDAO();
		}
		return Instance;
	}
	
	public List<ChuongTrinhGiamGia> selectAll(Session s)
	{
		List<ChuongTrinhGiamGia> res = HQLutil.getInstance().doSelectAll(ChuongTrinhGiamGia.class);
		return res;
	}
	
	public ChuongTrinhGiamGia selectById(Session s, String id)
	{
		ChuongTrinhGiamGia res = HQLutil.getInstance().doSelectById(ChuongTrinhGiamGia.class,id,s);
		return res;
	}
	
	
	public boolean isAppied(ChuongTrinhGiamGia ctgg, Session s)
	{
		Date today = new Date();
		String hql = "Select * from ChuongTinhGiamGia ct where ?1 = ct.id AND (?2 BETWEEN ct.ngayBatDau AND ct.ngayKetThuc)";
		List<ChuongTrinhGiamGia> res = HQLutil.getInstance().doQuery(hql, ChuongTrinhGiamGia.class, s, -1, -1, ctgg.getId(), today);
		return res!=null && res.size()>0;
	}
	public List<ChuongTrinhGiamGia> selectInInterval(Date from, Date to,int offset, int limit, Session s)
	{
		
		String hql = "Select * from ChuongTinhGiamGia ct where ?1 <= ct.ngayBatDau AND ct.ngayKetThuc <= ?2";
		List<ChuongTrinhGiamGia> res = HQLutil.getInstance().doQuery(hql, ChuongTrinhGiamGia.class, s, offset, limit, from, to);
		return res;
	}
	
	public List<ChuongTrinhGiamGia> selectRunningCTGG(Session s)
	{
		Date today = new Date();
		String hql = "Select ct from ChuongTrinhGiamGia ct where ?1 BETWEEN ct.ngayBatDau AND ct.ngayKetThuc";
		List<ChuongTrinhGiamGia> res = HQLutil.getInstance().doQuery(hql, ChuongTrinhGiamGia.class, s, -1, -1, today);
		return res;
	}
	
	public void insert (ChuongTrinhGiamGia ctgg, Session s)
	{
		HQLutil.getInstance().doInsert(ctgg, s);
	}
	
	public void addAppliedBook (String ctgg_id, List<Sach> listSach, Session s)
	{
		ChuongTrinhGiamGia ctgg = selectById(s, ctgg_id);
		List<Sach> list = ctgg.getListSach();
		for (int i=0;i< listSach.size();i++)
		{
			list.add(listSach.get(i));
			listSach.get(i).setCtGiamGia(ctgg);
		}
		HQLutil.getInstance().doUpdate(ctgg, s);
	}
	
	public void deleteById (String id, Session s)
	{
		String hql = "Update ChuongTrinhGiamGia SET status = true where id = ?1";
		HQLutil.getInstance().doUpdateQuery(hql, ChuongTrinhGiamGia.class, s,id);
	}
	public static void main(String[] args) {
		Session s = HibernateUtil.getSessionFactory().openSession();
//		ChuongTrinhGiamGia ctgg = new ChuongTrinhGiamGia();
//		
//		ctgg.setName("Test");
//		Date from = new Date();
//		Date to = new Date();
//		to.setDate(25);
//		ctgg.setNgayBatDau(from);
//		ctgg.setNgayKetThuc(to);
//		CtGiamGiaDAO.getInstance().insert(ctgg, s);
//		List<Sach> list = new ArrayList<Sach>();
//		for (int i=1;i<=9;i++)
//		{
//			Sach sach = SachDao.getSachDao().selectById("SA0000000"+i, s);
//			list.add(sach);
//		}
		ChuongTrinhGiamGia ctgg = CtGiamGiaDAO.getInstance().selectRunningCTGG(s).get(0);
		System.out.println(JsonUtil.getInstance().jsonToString(ctgg));
		HibernateUtil.close();
		
	}
}
