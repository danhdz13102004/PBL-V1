package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import org.hibernate.Session;
import org.hibernate.Transaction;
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
			HQLutil.getInstance().doInsert(user,session);
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

	public static void main(String[] args) {
		try {
			User user = UserDao.getUserDao().checkEmailPassAndStatus("danh@gmail.com", "123");
			System.out.println(user.getStatus().getStatusName());
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
}
