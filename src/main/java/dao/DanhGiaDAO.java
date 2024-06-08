package dao;

import org.hibernate.Session;

import model.ChiTietDonHang;
import model.DanhGia;

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
	
}
