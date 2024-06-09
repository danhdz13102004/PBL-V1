package dao;

import java.util.List;

import org.hibernate.Session;

import model.ChiTietDonHang;
import model.DanhGia;
import util.HibernateUtil;
import util.JsonUtil;

public class DanhGiaDAO {
	private static DanhGiaDAO Instance;
	public static DanhGiaDAO getInstance()
	{
		if (Instance == null)
		{
			Instance = new DanhGiaDAO();
		}
		return Instance;
	}
	public List<DanhGia> getFeedbackOfBook(String id, Integer curPage, Integer size, Session s)
	{
		String hql = "select dg "
				+ "From Sach sa "
				+ "inner join sa.listChiTietDonHang ctdh "
				+ "inner join ctdh.danhGia dg "
				+ "where sa.id=?1 "
				+ "order by dg.thoiGian";
		List<DanhGia> res = HQLutil.getInstance().doQuery(hql, DanhGia.class, s, (curPage-1)*size, size, id);
		return res;
	}
	public Long countFeedbackOfBook(String id, Session s)
	{
		String hql = "select count(dg) "
				+ "From Sach sa "
				+ "inner join sa.listChiTietDonHang ctdh "
				+ "inner join ctdh.danhGia dg "
				+ "where sa.id=?1";
		Long res = HQLutil.getInstance().doCountRecordOf(hql, s, id);
		return res;
	}
	public List<DanhGia> getFBOfBookHasStar(String id, Integer soSao, Integer curPage, Integer size, Session s)
	{
		String hql = "select dg "
				+ "From Sach sa "
				+ "inner join sa.listChiTietDonHang ctdh "
				+ "inner join ctdh.danhGia dg "
				+ "where sa.id=?1 AND dg.soSao=?2"
				+ "order by dg.thoiGian";
		List<DanhGia> res = HQLutil.getInstance().doQuery(hql, DanhGia.class, s, (curPage-1)*size, size, id, soSao);
		return res;
	}
	public Long countFBOfBookHasStar(String id, Integer soSao, Session s)
	{
		String hql = "select count(dg) "
				+ "From Sach sa "
				+ "inner join sa.listChiTietDonHang ctdh "
				+ "inner join ctdh.danhGia dg "
				+ "where sa.id=?1 AND dg.soSao=?2";
		Long res = HQLutil.getInstance().doCountRecordOf(hql, s, id, soSao);
		return res;
	}
	public static void main(String[] args) {
		List<DanhGia> list;
		Session s = HibernateUtil.getSessionFactory().openSession();
		list = DanhGiaDAO.getInstance().getFeedbackOfBook("SA00000001", 1, 2, s);
		System.out.println(JsonUtil.getInstance().jsonToString(list));
		HibernateUtil.close();
		
		
	}
}
