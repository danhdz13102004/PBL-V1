package dao;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

import org.hibernate.Session;

import model.ChiTietDonHang;
import model.DanhGia;
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
	public List<ChiTietDonHang> getChiTietDonHangOf(String userID, int page, int size, Session s)
	{
		String hql = "Select ctdh "
				+ "from "
				+ "User u "
				+ "inner join u.listDonHang dh "
				+ "inner join dh.listCTDH ctdh "
				+ "where u.id = ?1 "
				+ "order by dh.thoiGianDatHang";
		
		List<ChiTietDonHang> res = HQLutil.getInstance().doQuery(hql, ChiTietDonHang.class, s, (page-1)*size, size, userID);
		return res;
	}
	public Long countChiTietDonHangOf(String userID, Session s)
	{
		String hql = "Select count(ctdh) "
				+ "from "
				+ "User u "
				+ "inner join u.listDonHang dh "
				+ "inner join dh.listCTDH ctdh "
				+ "where u.id = ?1 ";
		
		Long res = HQLutil.getInstance().doCountRecordOf(hql, s, userID);
		return res;
	}
	public ChiTietDonHang AddUpdateDanhGia(String idCTDH, Integer soSao, String binhLuan,Date thoiGian, Session s)
	{
		String hql = "from ChiTietDonHang ctdh "
				+ "where ctdh.id=?1";
		ChiTietDonHang ctdh = HQLutil.getInstance().doQuery(hql, ChiTietDonHang.class, s, 0, 2, idCTDH).get(0);
		System.out.println(ctdh.getId());
		if (ctdh.getDanhGia()!=null)
		{
			Integer soSaoCu = ctdh.getDanhGia().getSoSao();
			ctdh.getDanhGia().setSoSao(soSao);
			ctdh.getDanhGia().setBinhLuan(binhLuan);
			ctdh.getDanhGia().setThoiGian(thoiGian);
			ctdh.getSach().setSoSaoTB((ctdh.getSach().getSoSaoTB()*ctdh.getSach().getSoLuotDanhGia()-soSaoCu+soSao)/(ctdh.getSach().getSoLuotDanhGia()));
		}
		else
		{
			DanhGia dg = new DanhGia();
			dg.setBinhLuan(binhLuan);
			dg.setSoSao(soSao);
			dg.setCtDonHang(ctdh);
			dg.setThoiGian(thoiGian);
			ctdh.setDanhGia(dg);
			HQLutil.getInstance().doInsert(dg, s);
			ctdh.getSach().setSoSaoTB((ctdh.getSach().getSoSaoTB()*ctdh.getSach().getSoLuotDanhGia()+soSao)/(ctdh.getSach().getSoLuotDanhGia()+1));
			ctdh.getSach().setSoLuotDanhGia(ctdh.getSach().getSoLuotDanhGia()+1);
		}

		ctdh = HQLutil.getInstance().doUpdate(ctdh, s);
		return ctdh;
	}
	
//	public static void main(String[] args) {
//		List<DanhGia> list;
//		Session s = HibernateUtil.getSessionFactory().openSession();
//		//list = ChiTietDonHangDao.getChiTietDonHangDao().getChiTietDonHangOf("US00000001", 1, 100, s);
//		//Long cnt =ChiTietDonHangDao.getChiTietDonHangDao().countChiTietDonHangOf("US00000001", s);
//		//ChiTietDonHang ctdh = ChiTietDonHangDao.getChiTietDonHangDao().AddUpdateDanhGia("DO00000002", 5, "Hay", s);
//		//list = ChiTietDonHangDao.getChiTietDonHangDao().getFBOfBookHasStar("SA00000001", 3, 1, 2, s);
//		System.out.println(JsonUtil.getInstance().jsonToString(list));
//		HibernateUtil.close();
//		
//		
//	}
}
