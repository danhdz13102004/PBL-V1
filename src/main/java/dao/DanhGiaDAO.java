package dao;

import java.util.List;

import org.hibernate.Session;

import model.ChiTietDonHang;
import model.DanhGia;
import util.HibernateUtil;

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
	public void AddUpdate (String idCTDH, Integer soSao, String binhLuan, Session s)
	{
		
		String hql = "from ChiTietDonHang ctdh"
				+ "where ctdh.id=?3";
		ChiTietDonHang ctdh = HQLutil.getInstance().doQuery(hql, ChiTietDonHang.class, s, 0, 1, idCTDH).get(0);
		
		if (ctdh.getDanhGia()!=null)
		{
			ctdh.getDanhGia().setSoSao(soSao);
			ctdh.getDanhGia().setBinhLuan(binhLuan);
			HQLutil.getInstance().doUpdate(ctdh, s);
		}
		else
		{
			DanhGia dg = new DanhGia();
			dg.setBinhLuan(binhLuan);
			dg.setSoSao(soSao);
			dg.setCtDonHang(ctdh);
			ctdh.setDanhGia(dg);
			HQLutil.getInstance().doInsert(dg, s);
		}
	}
	
	public List<DanhGia> getFeedbackOfBook(String id, Integer curPage, Integer size, Session s)
	{
		String hql = "select dg "
				+ "From Sach sa "
				+ "inner join sa.listChiTietDonHang ctdh "
				+ "inner join ctdh.danhGia dg "
				+ "where sa.id=?1"
				+ "order by dg.thoiGian desc";
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
				+ "order by dg.thoiGian desc";
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
		Session session = HibernateUtil.getSessionFactory().openSession();
		System.out.println(getInstance().countFeedbackOfBook("12", session));
		List<DanhGia> list  =getInstance().getFeedbackOfBook("1", 1, 10, session);
		for(DanhGia d : list) System.out.println(d.getSoSao() + " " + d.getBinhLuan());
	}
	
}