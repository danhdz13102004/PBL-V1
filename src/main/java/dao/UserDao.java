package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import org.hibernate.Session;
import org.hibernate.Transaction;

import model.ChiTietGioHang;
import model.DiaChiGiaoHang;
import model.DonHang;
import model.User;
import util.HibernateUtil;

public class UserDao  {
	private static UserDao userDao = null;
	public static UserDao getUserDao() {
		if(userDao == null) userDao = new UserDao();
		return userDao;
	}

	public List<User> selectAll() {
		List<User> res = new ArrayList<User>();
		HQLutil hqLutil = HQLutil.getInstance();
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			res = hqLutil.doSelectAll(User.class,session);
			session.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return res;
	}

	public User selectById(User t,Session s) {
		User user = null;
		try {
			user = HQLutil.getInstance().doSelectById(User.class, t.getId(),s);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return user;
	}

	public int insert(User user) {
		try {
			Session session = HibernateUtil.getSessionFactory().openSession();
			HQLutil.getInstance().doInsert1(user,session);
			session.close();
			return 1;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}
	public String getMaXacThuc(String userId) {
		try {
			Session session = HibernateUtil.getSessionFactory().openSession();
			String hql = "SELECT user.maXacThuc FROM User user WHERE user.id = :userId";
			List<String> list = session.createQuery(hql).setParameter("userId", userId).list();
			if(list.size() > 0) return list.get(0);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public String getMaXacThucByEmail(String email) {
		try {
			Session session = HibernateUtil.getSessionFactory().openSession();
			String hql = "SELECT user.maXacThuc FROM User user WHERE user.email = :email";
			List<String> list = session.createQuery(hql).setParameter("email", email).list();
			if(list.size() > 0) return list.get(0);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public void changeMaXacThuc(String maXacThuc,String email) {
		try {
			Session session = HibernateUtil.getSessionFactory().openSession();
			Transaction transaction = session.beginTransaction();
			String hql = "UPDATE User u SET u.maXacThuc = :newMaXacThuc WHERE u.email = :email";
			session.createQuery(hql).setParameter("newMaXacThuc", maXacThuc).setParameter("email", email).executeUpdate();
			transaction.commit();
			session.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void changeMatKhau(String matKhau,String email) {
		try {
			Session session = HibernateUtil.getSessionFactory().openSession();
			Transaction transaction = session.beginTransaction();
			String hql = "UPDATE User u SET u.matKhau = :matKhau WHERE u.email = :email";
			session.createQuery(hql).setParameter("matKhau", matKhau).setParameter("email", email).executeUpdate();
			transaction.commit();
			session.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void setTrangThaiXacThucTrue(String userId) {
	    Session session = HibernateUtil.getSessionFactory().openSession();
	    Transaction transaction = null;
	    try {
	        transaction = session.beginTransaction();

	        String hql = "UPDATE User u SET u.status = :status WHERE u.id = :userId";
	        
	        Query query = session.createQuery(hql);
	        query.setParameter("status", User.Status.AC);
	        query.setParameter("userId", userId);
	        
	        int result = query.executeUpdate();
	        System.out.println("Rows affected: " + result);

	        transaction.commit();
	    } catch (Exception e) {
	        if (transaction != null) {
	            transaction.rollback();
	        }
	        e.printStackTrace();
	    } finally {
	        session.close();
	    }
	}
	
	public void setTrangThaiXacThucTrueByEmail(String email) {
	    Session session = HibernateUtil.getSessionFactory().openSession();
	    Transaction transaction = null;
	    try {
	        transaction = session.beginTransaction();

	        String hql = "UPDATE User u SET u.status = :status WHERE u.email = :email";
	        
	        Query query = session.createQuery(hql);
	        query.setParameter("status", User.Status.AC);
	        query.setParameter("email", email);
	        
	        int result = query.executeUpdate();
	        System.out.println("Rows affected: " + result);

	        transaction.commit();
	    } catch (Exception e) {
	        if (transaction != null) {
	            transaction.rollback();
	        }
	        e.printStackTrace();
	    } finally {
	        session.close();
	    }
	}
	
	
	public User checkEmailPassAndStatus(String email, String password) {
	    Session session = HibernateUtil.getSessionFactory().openSession();
	    User user = null;
	    try {
	        String hql = "FROM User u WHERE u.email = :email AND u.matKhau = :password";
	        
	        List<User> userList = session.createQuery(hql)
	        		.setParameter("email", email)
	        		.setParameter("password", password)
	        		.list();
	        
	        if (!userList.isEmpty()) {
	            user = userList.get(0);
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	    } finally {
	        session.close();
	    }
	    return user;
	}
	
	public boolean checkEmailIsContain(String email) {
		Session session = HibernateUtil.getSessionFactory().openSession();
	    try {
	        String hql = "FROM User u WHERE u.email = :email";
	        
	        List<User> userList = session.createQuery(hql)
	        		.setParameter("email", email)
	        		.list();
	        
	        if (!userList.isEmpty()) {
	            return true;
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	    } finally {
	        session.close();
	    }
	    return false;
	}
	
	public User updateUser(User updateUser, Session s)
	{
		User oldUser = selectById(updateUser.getId(), s);
		if (updateUser.getTen()!=null)
		{
			oldUser.setTen(updateUser.getTen());
		}
		if (updateUser.getSDT()!=null)
		{
			oldUser.setSDT(updateUser.getSDT());
		}if (updateUser.getEmail()!=null)
		{
			oldUser.setEmail(updateUser.getEmail());
		}
		if (updateUser.getStatus()!=null)
		{
			oldUser.setStatus(updateUser.getStatus());
		}
		oldUser.setGioiTinh(updateUser.isGioiTinh());
		List<DiaChiGiaoHang> oldListDC = oldUser.getDiaChiGiaoHang();
		List<DiaChiGiaoHang> updatedListDC = updateUser.getDiaChiGiaoHang();
		if (updatedListDC != null)
		{
			for (DiaChiGiaoHang dc: updatedListDC)
			{
				boolean finded = false;
				if (oldListDC!=null)
				{
					for (int i=0;i<oldListDC.size();i++)
					{
						if (dc.getId().equals(oldListDC.get(i).getId()))
						{
							oldListDC.get(i).setDiaChi(dc.getDiaChi());
							finded = true;
							break;
						} 
					}
				}
				if (!finded)
				{
					dc.setKhachHang(oldUser);
					oldListDC.add(dc);
				}
			}
		}
		return HQLutil.getInstance().doUpdate(oldUser,s);
		
	}
	
	public User insert(User user,Session s) {
		User newu = null;
		try {
			List<DiaChiGiaoHang> list = user.getDiaChiGiaoHang();
			if (list!=null)
			{
				for (DiaChiGiaoHang dc: list)
				{
					dc.setKhachHang(user);
				}
			}
			newu = HQLutil.getInstance().doInsert(user,s);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return newu;
	}
	
	
	public List<User> searchUsers (String ten, String sdt, String email,String gioitinh, String role, String status, String diachi,int curPage, int size, Session s)
	{
		ArrayList<Object> params = new ArrayList<>();
		int cnt = 0;
		StringBuilder hql =new StringBuilder("Select distinct u from User u left join u.listDiaChi dc");
		List<String> criteria = new ArrayList<String>();
		if (ten != null)
		{
			ten = "%"+ten+"%";
			params.add(ten);
			criteria.add(" u.ten LIKE ?"+Integer.toString(++cnt));
		}
		if (sdt != null)
		{
			sdt = "%"+sdt+"%";
			params.add(sdt);
			criteria.add("u.SDT LIKE ?"+Integer.toString(++cnt));
		}
		if (email != null)
		{
			email = "%"+email+"%";
			params.add(email);
			criteria.add("u.email LIKE ?"+Integer.toString(++cnt));
		}
		if (diachi != null)
		{
			diachi = "%"+diachi+"%";
			params.add(diachi);
			criteria.add("dc.diaChi LIKE ?"+Integer.toString(++cnt));
		}
		boolean gioiTinh;
		if (!gioitinh.equals("All"))
		{
			gioiTinh=Boolean.parseBoolean(gioitinh);
			params.add(gioiTinh);
			criteria.add("u.gioiTinh = ?"+Integer.toString(++cnt));
		}
		User.Role enumRole;
		if (!role.equals("All"))
		{
			enumRole = User.Role.valueOf(role);
			params.add(enumRole);
			criteria.add("u.role = ?"+Integer.toString(++cnt));
		}
		User.Status enumStatus;
		if (!status.equals("All"))
		{
			enumStatus = User.Status.valueOf(status);
			params.add(enumStatus);
			criteria.add("u.status = ?"+Integer.toString(++cnt));
		}
		if (cnt != 0)
		{
			hql.append(" where "+criteria.get(0));
			for (int i=1;i<cnt;i++)
			{
				hql.append(" AND "+criteria.get(i));
			}
		}
		List<User> res = HQLutil.getInstance().doQuery(hql.toString(), User.class, s, (curPage-1)*size, size, params.toArray());
		return res;
	}
	
	public long countNumberUserHas(String ten, String sdt, String email,String gioitinh, String role, String status, String diachi, Session s)
	{
		ArrayList<Object> params = new ArrayList<>();
		int cnt = 0;
		StringBuilder hql =new StringBuilder("Select count(distinct u) from User u left join u.listDiaChi dc");
		List<String> criteria = new ArrayList<String>();
		if (ten != null)
		{
			ten = "%"+ten+"%";
			params.add(ten);
			criteria.add(" u.ten LIKE ?"+Integer.toString(++cnt));
		}
		if (sdt != null)
		{
			sdt = "%"+sdt+"%";
			params.add(sdt);
			criteria.add("u.SDT LIKE ?"+Integer.toString(++cnt));
		}
		if (email != null)
		{
			email = "%"+email+"%";
			params.add(email);
			criteria.add("u.email LIKE ?"+Integer.toString(++cnt));
		}
		if (diachi != null)
		{
			diachi = "%"+diachi+"%";
			params.add(diachi);
			criteria.add("dc.diaChi LIKE ?"+Integer.toString(++cnt));
		}
		boolean gioiTinh;
		if (!gioitinh.equals("All"))
		{
			gioiTinh=Boolean.parseBoolean(gioitinh);
			params.add(gioiTinh);
			criteria.add("u.gioiTinh = ?"+Integer.toString(++cnt));
		}
		User.Role enumRole;
		if (!role.equals("All"))
		{
			enumRole = User.Role.valueOf(role);
			params.add(enumRole);
			criteria.add("u.role = ?"+Integer.toString(++cnt));
		}
		User.Status enumStatus;
		if (!status.equals("All"))
		{
			enumStatus = User.Status.valueOf(status);
			params.add(enumStatus);
			criteria.add("u.status = ?"+Integer.toString(++cnt));
		}
		if (cnt != 0)
		{
			hql.append(" where "+criteria.get(0));
			for (int i=1;i<cnt;i++)
			{
				hql.append(" AND "+criteria.get(i));
			}
		}
		long res = HQLutil.getInstance().doCountRecordOf(hql.toString(), s, params.toArray());
		return res;
	} 

	private boolean hasDiaChi(User u, String diachi)
	{
		for (DiaChiGiaoHang dc : u.getDiaChiGiaoHang()) {
			if (dc.getDiaChi().contains(diachi)) return true;
		}
		return false;
	}
	
	public void deleteDiaChi(String dcId, Session s)
	{
		DiaChiGiaoHang delDC = HQLutil.getInstance().doSelectById(DiaChiGiaoHang.class, dcId, s);
		delDC.setStatus(true);
		HQLutil.getInstance().doUpdate(delDC,s);
	}
	
	public User selectById(String id,Session s) {
		User user = null;
		try {
			user = HQLutil.getInstance().doSelectById(User.class, id,s);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return user;
	}
	
	public void deleteUser(String userId, Session s)
	{
		User delUser = this.selectById(userId, s);
		List<DiaChiGiaoHang> listDC = delUser.getDiaChiGiaoHang();
		if (listDC!=null)
		{
			for (int i=0;i<listDC.size();i++)
			{
				listDC.get(i).setStatus(true);
			}
		}
		
		List<ChiTietGioHang> listCTGH = delUser.getChiTietGioHang();
		if (listDC!=null)
		{
			for (int i=0;i<listCTGH.size();i++)
			{
				listCTGH.get(i).setStatus(true);
			}
		}
		List<DonHang> listDH = delUser.getlistDonHang();
		if (listDH!=null)
		{
			for (int i=0;i<listDH.size();i++)
			{
				listDH.get(i).setTinhTrang(DonHang.Status.DAXOA);
			}
		}
		delUser.setStatus(User.Status.DC);
		HQLutil.getInstance().doUpdate(delUser,s);
	}
	
	public void deleteRangeUser(String[] ids, Session s)
	{
		for (String id : ids) {
			deleteUser(id, s);
		}
	}
	
	public void deleteRangeDiaChi(String[] ids, Session s)
	{
		for (String id : ids) {
			deleteDiaChi(id, s);
		}
	}
	
	
	
	public static void main(String[] args) {
		try {
			User user = UserDao.getUserDao().checkEmailPassAndStatus("danh@gmail.com", "123");
			System.out.println(user.getStatus().getStatusName());
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
}
