package dao;

import java.sql.Date;
import java.time.LocalDate;
import java.time.Year;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import model.DonHang;
import modelApi.DoanhThuThang;
import modelApi.DoanhThuTuan;
import util.HibernateUtil;

public class DonHangDAO {
	public static DonHangDAO donHangDAO = null;
	
	public static DonHangDAO getDonHangDao() {
		if(donHangDAO == null) donHangDAO = new DonHangDAO();
		return donHangDAO;
	}
	
	public void addDonHang(DonHang donHang,Session session) {
		try {
			HQLutil.getInstance().doInsert(donHang, session);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void updateStatus(String id,DonHang.Status status,Session session) {
		try {
			Transaction tr = session.beginTransaction();
			String hql = "UPDATE DonHang u SET u.tinhTrang = :status WHERE u.id = :id";
			session.createQuery(hql)
					.setParameter("status", status)
					.setParameter("id", id)
					.executeUpdate();
			tr.commit();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void updateStatus(String id,DonHang.Status status,Session session,String message) {
		try {
			Transaction tr = session.beginTransaction();
			String hql = "UPDATE DonHang u SET u.tinhTrang = :status , u.loiNhan = :message WHERE u.id = :id";
			session.createQuery(hql)
					.setParameter("status", status)
					.setParameter("id", id)
					.setParameter("message", message)
					.executeUpdate();
			tr.commit();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public List<DonHang> selectDonHangByUserId(String id,Session session) {
		try {
			String hql = "select dh FROM DonHang dh where dh.khachHang.id = :id";
			return session.createQuery(hql).setParameter("id",id).list();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public DonHang selectDonHangByUserIdAndOrderId(String id,Session session,String idOrder) {
		try {
			String hql = "select dh FROM DonHang dh where dh.khachHang.id = :id and dh.id = :idOrder";
			return (DonHang) session.createQuery(hql)
					.setParameter("id",id)
					.setParameter("idOrder", idOrder)
					.list().get(0);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public List<DonHang> selectDonHangByUserId(String id,Session session,Integer page,Integer size) {
		try {
			String hql = "select dh FROM DonHang dh where dh.khachHang.id = :id ORDER BY dh.thoiGianDatHang DESC";		
			Query query = session.createQuery(hql);
			query.setParameter("id",id);
			query.setFirstResult((page - 1) * size);
	        query.setMaxResults(size);
	        return query.list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public List<DonHang> selectDonHangByStatus(Integer page,Integer size, DonHang.Status status,String id, Session session) {
		List<DonHang> res = new ArrayList<DonHang>();
		try {
			String hql = "FROM DonHang dh WHERE dh.khachHang.id = :khachHangId AND dh.tinhTrang = :tinhTrang ORDER BY dh.thoiGianDatHang DESC";
			Query query = session.createQuery(hql);
			query.setParameter("khachHangId", id)
				.setParameter("tinhTrang", status);
			query.setFirstResult((page - 1) * size);
	        query.setMaxResults(size);
	        res = query.list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return res;
	}
	
	public List<DonHang> selectDonHangByStatus(Integer page,Integer size, DonHang.Status status,DonHang.Status status1,DonHang.Status status2,DonHang.Status status3,String id, Session session) {
		List<DonHang> res = new ArrayList<DonHang>();
		try {
			String hql = "FROM DonHang dh WHERE dh.khachHang.id = :khachHangId AND (dh.tinhTrang = :tinhTrang OR dh.tinhTrang = :tinhTrang1 OR dh.tinhTrang = :tinhTrang2 OR dh.tinhTrang = :tinhTrang3 ) ORDER BY dh.thoiGianDatHang DESC";
			Query query = session.createQuery(hql);
			query.setParameter("khachHangId", id)
				.setParameter("tinhTrang", status)
				.setParameter("tinhTrang1", status1)
				.setParameter("tinhTrang2", status2)
				.setParameter("tinhTrang3", status3);
			query.setFirstResult((page - 1) * size);
	        query.setMaxResults(size);
	        res = query.list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return res;
	}
	
	
	
	
	public DonHang selectDonHangById(String id,Session session) {
		try {
			String hql = "select dh FROM DonHang dh where dh.id = :id";
			return (DonHang) session.createQuery(hql).setParameter("id",id).list().get(0);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public List<DonHang> selectAllByPaging(Integer page,Integer size,Session session) {
		List<DonHang> res = new ArrayList<DonHang>();
		try {
			String hql = "FROM DonHang ORDER BY thoiGianDatHang DESC";
			Query query = session.createQuery(hql);
			query.setFirstResult((page - 1) * size);
	        query.setMaxResults(size);
	        res = query.list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return res;	
	}
	
	public Integer countAllOrder(Session session) {
		try {
			String hqlQuery = "select count(*) from DonHang";
			Long kq = (Long) session.createQuery(hqlQuery).uniqueResult();
			System.out.println("kq " + kq);
			return Integer.parseInt(kq.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}
	
	public Integer countAllOrder(Session session,String id) {
		try {
			String hqlQuery = "select count(*) from DonHang where khachHang.id = :id";
			Long kq = (Long) session.createQuery(hqlQuery).setParameter("id", id).uniqueResult();
			System.out.println("kq " + kq);
			return Integer.parseInt(kq.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}
	
	public Integer countAllByStatus(Session session,String id,DonHang.Status status) {
		try {
			String hqlQuery = "select count(*) from DonHang where khachHang.id = :id and tinhTrang = :status";
			Long kq = (Long) session.createQuery(hqlQuery).setParameter("id", id)
					.setParameter("status", status)
					.uniqueResult();
			System.out.println("kq " + kq);
			return Integer.parseInt(kq.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}
	
	public Integer countAllByStatus(Session session,String id,DonHang.Status status, DonHang.Status status1,DonHang.Status status2,DonHang.Status status3) {
		try {
			String hqlQuery = "select count(*) from DonHang where khachHang.id = :id and (tinhTrang = :status OR tinhTrang = :status1 OR tinhTrang = :status2 OR tinhTrang = :status3) ";
			Long kq = (Long) session.createQuery(hqlQuery).setParameter("id", id)
					.setParameter("status", status)
					.setParameter("status1", status1)
					.setParameter("status2", status2)
					.setParameter("status3", status3)
					.uniqueResult();
			System.out.println("kq " + kq);
			return Integer.parseInt(kq.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}
	
	
	public List<DoanhThuThang> getDoanhThuThang(Session session) {
		List<DoanhThuThang> res = new ArrayList<DoanhThuThang>();
		DoanhThuThang t1 = new DoanhThuThang("Tháng 1");
		DoanhThuThang t2 = new DoanhThuThang("Tháng 2");
		DoanhThuThang t3 = new DoanhThuThang("Tháng 3");
		DoanhThuThang t4 = new DoanhThuThang("Tháng 4");
		DoanhThuThang t5 = new DoanhThuThang("Tháng 5");
		DoanhThuThang t6 = new DoanhThuThang("Tháng 6");
		DoanhThuThang t7 = new DoanhThuThang("Tháng 7");
		DoanhThuThang t8 = new DoanhThuThang("Tháng 8");
		DoanhThuThang t9 = new DoanhThuThang("Tháng 9");
		DoanhThuThang t10 = new DoanhThuThang("Tháng 10");
		DoanhThuThang t11 = new DoanhThuThang("Tháng 11");
		DoanhThuThang t12 = new DoanhThuThang("Tháng 12");
		Transaction transaction = session.beginTransaction();
		String sql = "SELECT \r\n"
				+ "    DATE_FORMAT(Thoi_gian_dat_hang, '%Y-%m') AS order_month,\r\n"
				+ "    SUM(Tong_tien) AS total_revenue\r\n"
				+ "FROM \r\n"
				+ "    donhang\r\n"
				+ "WHERE\r\n"
				+ "    YEAR(Thoi_gian_dat_hang) = :year\r\n"
				+ "GROUP BY \r\n"
				+ "    DATE_FORMAT(Thoi_gian_dat_hang, '%Y-%m')";
		SQLQuery query = session.createSQLQuery(sql);
		Year currentYear = Year.now();
		query.setParameter("year", currentYear.getValue());  // Thiết lập giá trị cho tham số `year`

		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

		List results = query.list();

		for (Object result : results) {
		    Map row = (Map) result;
		    String month = (String) row.get("order_month");
		    Double total = (Double) row.get("total_revenue");
		    String c = month.charAt(month.length() - 2) + "" + month.charAt(month.length() - 1);
		    System.out.println(month + " " + total);
		    if(c.equals("01")) t1.setDoanhThu(total);
		    else if(c.equals("02")) t2.setDoanhThu(total);
		    else if(c.equals("03")) t3.setDoanhThu(total);
		    else if(c.equals("04")) t4.setDoanhThu(total);
		    else if(c.equals("05")) t5.setDoanhThu(total);
		    else if(c.equals("06")) t6.setDoanhThu(total);
		    else if(c.equals("07")) t7.setDoanhThu(total);
		    else if(c.equals("08")) t8.setDoanhThu(total);
		    else if(c.equals("09")) t9.setDoanhThu(total);
		    else if(c.equals("10")) t10.setDoanhThu(total);
		    else if(c.equals("11")) t11.setDoanhThu(total);
		    else if(c.equals("12")) t12.setDoanhThu(total);

		}
		res.add(t1);
		res.add(t2);
		res.add(t3);
		res.add(t4);
		res.add(t5);
		res.add(t6);
		res.add(t7);
		res.add(t8);
		res.add(t9);
		res.add(t10);
		res.add(t11);
		res.add(t12);
		
		transaction.commit();
		return res;
	}
	
	public static String chuanHoa(LocalDate localDate) {
		String tmp = String.valueOf(localDate);
		String arr[] = tmp.split("-");
		String res = arr[arr.length -1 ];
		for(int i=arr.length - 2;i >= 0;i--) {
			res += "-" + arr[i];
		}
//		System.out.println(res);
		return res;
	}
	
	public static String chuanHoa1(Date localDate) {
		String tmp = String.valueOf(localDate);
		String arr[] = tmp.split("-");
		String res = arr[arr.length -1 ];
		for(int i=arr.length - 2;i >= 0;i--) {
			res += "-" + arr[i];
		}
//		System.out.println(res);
		return res;
	}
	
	public List<DoanhThuThang> getDoanhThuNgay(Session session) {
		List<DoanhThuThang> res = new ArrayList<DoanhThuThang>();
		LocalDate today = LocalDate.now();
		String d0 = chuanHoa(today);
		String d1 = chuanHoa(today.minusDays(1));
		String d2 = chuanHoa(today.minusDays(2));
		String d3 = chuanHoa(today.minusDays(3));
		String d4 = chuanHoa(today.minusDays(4));
		String d5 = chuanHoa(today.minusDays(5));
		String d6 = chuanHoa(today.minusDays(6));
        DoanhThuThang t6 = new DoanhThuThang((d6));
		DoanhThuThang t5 = new DoanhThuThang((d5));
		DoanhThuThang t4 = new DoanhThuThang((d4));
		DoanhThuThang t3 = new DoanhThuThang((d3));
		DoanhThuThang t2 = new DoanhThuThang((d2));
		DoanhThuThang t1 = new DoanhThuThang((d1));
		DoanhThuThang t0 = new DoanhThuThang((d0));
		Transaction transaction = session.beginTransaction();
		String sql = "SELECT \r\n"
				+ "    DATE(Thoi_gian_dat_hang) AS order_date,\r\n"
				+ "    SUM(Tong_tien) AS total_amount\r\n"
				+ "FROM donhang\r\n"
				+ "WHERE DATE(Thoi_gian_dat_hang) >= CURDATE() - INTERVAL 7 DAY\r\n"
				+ "GROUP BY DATE(Thoi_gian_dat_hang)\r\n"
				+ "ORDER BY order_date ASC";
		SQLQuery query = session.createSQLQuery(sql);

		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

		List results = query.list();

		for (Object result : results) {
			Map row = (Map) result;
			Date date =  (Date) row.get("order_date");
			String ch = chuanHoa1(date);
			Double total = (Double) row.get("total_amount");
			if(ch.equals(d0)) t0.setDoanhThu(total);
			else if(ch.equals(d1)) t1.setDoanhThu(total);
			else if(ch.equals(d2)) t2.setDoanhThu(total);
			else if(ch.equals(d3)) t3.setDoanhThu(total);
			else if(ch.equals(d4)) t4.setDoanhThu(total);
			else if(ch.equals(d5)) t5.setDoanhThu(total);
			else if(ch.equals(d6)) t6.setDoanhThu(total);

		}
		res.add(t6);
		res.add(t5);
		res.add(t4);
		res.add(t3);
		res.add(t2);
		res.add(t1);
		res.add(t0);
		transaction.commit();
		return res;
	}
	
	public static LocalDate convertToLocalDateViaInstant(Date date) {
        return date.toInstant()
                   .atZone(ZoneId.systemDefault())
                   .toLocalDate();
    }
	
	
	public List<DoanhThuTuan> getDoanhThuTuan(Session session) {
		List<DoanhThuTuan> res = new ArrayList<DoanhThuTuan>();
		DoanhThuTuan t2 = new DoanhThuTuan("Thứ 2");
		DoanhThuTuan t3 = new DoanhThuTuan("Thứ 3");
		DoanhThuTuan t4 = new DoanhThuTuan("Thứ 4");
		DoanhThuTuan t5 = new DoanhThuTuan("Thứ 5");
		DoanhThuTuan t6 = new DoanhThuTuan("Thứ 6");
		DoanhThuTuan t7 = new DoanhThuTuan("Thứ 7");
		DoanhThuTuan cn = new DoanhThuTuan("Chủ nhật");
		
		
		Transaction transaction = session.beginTransaction();
		String sql = "SELECT \r\n"
				+ "    DAYNAME(Thoi_gian_dat_hang) AS day_of_week,\r\n"
				+ "    SUM(CASE WHEN YEARWEEK(Thoi_gian_dat_hang) = YEARWEEK(CURDATE() - INTERVAL 1 WEEK) THEN tong_tien ELSE 0 END) AS total_money_last_week,\r\n"
				+ "    SUM(CASE WHEN YEARWEEK(Thoi_gian_dat_hang) = YEARWEEK(CURDATE()) THEN tong_tien ELSE 0 END) AS total_money_this_week\r\n"
				+ "FROM \r\n"
				+ "    donhang\r\n"
				+ "WHERE \r\n"
				+ "    Thoi_gian_dat_hang >= CURDATE() - INTERVAL 1 WEEK\r\n"
				+ "GROUP BY \r\n"
				+ "    DAYNAME(Thoi_gian_dat_hang);\r\n"
				+ "";
		String sql1 = "SELECT \r\n"
				+ "    DAYNAME(Thoi_gian_dat_hang) AS day_of_week,\r\n"
				+ "    SUM(CASE WHEN YEARWEEK(Thoi_gian_dat_hang) = YEARWEEK(CURDATE() - INTERVAL 1 WEEK) THEN tong_tien ELSE 0 END) AS total_money_last_week,\r\n"
				+ "    SUM(CASE WHEN YEARWEEK(Thoi_gian_dat_hang) = YEARWEEK(CURDATE()) THEN tong_tien ELSE 0 END) AS total_money_this_week\r\n"
				+ "FROM \r\n"
				+ "    donhang\r\n"
				+ "WHERE \r\n"
				+ "    Thoi_gian_dat_hang >= DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) + 8 DAY) AND\r\n"
				+ "    Thoi_gian_dat_hang <= DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) - 1 DAY)\r\n"
				+ "GROUP BY \r\n"
				+ "    DAYNAME(Thoi_gian_dat_hang)\r\n"
				+ "ORDER BY \r\n"
				+ "    FIELD(day_of_week, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')";
		String sql2 = "WITH days AS (\r\n"
				+ "    SELECT 1 AS day_of_week, 'Sunday' AS day_name UNION ALL\r\n"
				+ "    SELECT 2, 'Monday' UNION ALL\r\n"
				+ "    SELECT 3, 'Tuesday' UNION ALL\r\n"
				+ "    SELECT 4, 'Wednesday' UNION ALL\r\n"
				+ "    SELECT 5, 'Thursday' UNION ALL\r\n"
				+ "    SELECT 6, 'Friday' UNION ALL\r\n"
				+ "    SELECT 7, 'Saturday'\r\n"
				+ "),\r\n"
				+ "orders_this_week AS (\r\n"
				+ "    SELECT\r\n"
				+ "        DAYOFWEEK(Thoi_gian_dat_hang) AS day_of_week,\r\n"
				+ "        SUM(tong_tien) AS total_money\r\n"
				+ "    FROM donhang\r\n"
				+ "    WHERE YEARWEEK(Thoi_gian_dat_hang, 1) = YEARWEEK(CURDATE(), 1)\r\n"
				+ "    GROUP BY DAYOFWEEK(Thoi_gian_dat_hang)\r\n"
				+ "),\r\n"
				+ "orders_last_week AS (\r\n"
				+ "    SELECT\r\n"
				+ "        DAYOFWEEK(Thoi_gian_dat_hang) AS day_of_week,\r\n"
				+ "        SUM(tong_tien) AS total_money\r\n"
				+ "    FROM donhang\r\n"
				+ "    WHERE YEARWEEK(Thoi_gian_dat_hang, 1) = YEARWEEK(CURDATE(), 1) - 1\r\n"
				+ "    GROUP BY DAYOFWEEK(Thoi_gian_dat_hang)\r\n"
				+ ")\r\n"
				+ "SELECT\r\n"
				+ "    d.day_name,\r\n"
				+ "    COALESCE(tw.total_money, 0) AS total_money_this_week,\r\n"
				+ "    COALESCE(lw.total_money, 0) AS total_money_last_week\r\n"
				+ "FROM\r\n"
				+ "    days d\r\n"
				+ "    LEFT JOIN orders_this_week tw ON d.day_of_week = tw.day_of_week\r\n"
				+ "    LEFT JOIN orders_last_week lw ON d.day_of_week = lw.day_of_week\r\n"
				+ "ORDER BY d.day_of_week;\r\n"
				+ "";
		SQLQuery query = session.createSQLQuery(sql2);

		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

		List results = query.list();

		for (Object result : results) {
			Map row = (Map) result;
			String day = (String) row.get("day_name");
			Double total_before = (Double) row.get("total_money_last_week");
			Double total_this_week = (Double) row.get("total_money_this_week");
			System.out.println(day + " " + total_before + " " + total_this_week);
			if(day.equals("Monday")) {
				t2.setDoanhThuTuanTruoc(total_before);
				t2.setDoanhThuTuanNay(total_this_week);
			}
			else if(day.equals("Tuesday")) {
				t3.setDoanhThuTuanTruoc(total_before);
				t3.setDoanhThuTuanNay(total_this_week);
			}
			else if(day.equals("Wednesday")) {
				t4.setDoanhThuTuanTruoc(total_before);
				t4.setDoanhThuTuanNay(total_this_week);
			}
			else if(day.equals("Thursday")) {
				t5.setDoanhThuTuanTruoc(total_before);
				t5.setDoanhThuTuanNay(total_this_week);
			}
			else if(day.equals("Friday")) {
				t6.setDoanhThuTuanTruoc(total_before);
				t6.setDoanhThuTuanNay(total_this_week);
			}
			else if(day.equals("Saturday")) {
				t7.setDoanhThuTuanTruoc(total_before);
				t7.setDoanhThuTuanNay(total_this_week);
			}
			else {
				cn.setDoanhThuTuanTruoc(total_before);
				cn.setDoanhThuTuanNay(total_this_week);
			}
		}
		
		res.add(t2);
		res.add(t3);
		res.add(t4);
		res.add(t5);
		res.add(t6);
		res.add(t7);
		res.add(cn);
		
		transaction.commit();
		return res;
	}
	
	public static void main(String[] args) {	
		Session session = HibernateUtil.getSessionFactory().openSession();
		System.out.println(getDonHangDao().getDoanhThuTuan(session));
	}
	
}
