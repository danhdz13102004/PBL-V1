package dao;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;



import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

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
		List<ChuongTrinhGiamGia> res = HQLutil.getInstance().doSelectAll(ChuongTrinhGiamGia.class,s);
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
		String hql = "Update ChuongTrinhGiamGia SET status = false where id = :id";
		try {
			Transaction tr = s.beginTransaction();
			s.createQuery(hql).setParameter("id", id).executeUpdate();
			tr.commit();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
	public Long countAll(Session session,String txt) {
		String hql = "select count(*) from ChuongTrinhGiamGia where status = true and name like :name";
		try {
			return  (Long) session.createQuery(hql).setParameter("name", "%" + txt + "%").uniqueResult();
		} catch (Exception e) {
			// TODO: handle exception
		}
		return (long) 0;
	}
	
	public List<ChuongTrinhGiamGia> selectWithText(Integer page, Integer size, String txt,Session session) {
	    List<ChuongTrinhGiamGia> arr = new ArrayList<>();
	    try {
//	    	Session session = HibernateUtil.getSessionFactory().openSession();
	        String hql = "FROM ChuongTrinhGiamGia WHERE name LIKE :txt AND status = true ORDER BY ngayKetThuc DESC";
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
	
	
	public static void main(String[] args) {
		Session s = HibernateUtil.getSessionFactory().openSession();
		List<ChuongTrinhGiamGia> list = getInstance().selectWithText(1, 5, "D", s);
		for(ChuongTrinhGiamGia c : list) {
			System.out.println(c.getName());
		}
		
	}
}