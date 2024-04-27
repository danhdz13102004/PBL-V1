package dao;
import java.lang.reflect.*;
import java.util.*;


import javax.persistence.criteria.*;

import org.hibernate.*;
import org.hibernate.criterion.Restrictions;

import util.*;	
public class HQLutil {
	private static HQLutil Instance;
	public static HQLutil getInstance()
	{
		if (Instance == null)
		{
			Instance = new HQLutil();
		}
		return Instance;
	}
	
	public <T>int maxId(Class<T> c, Session s)
	{
		int res;
		CriteriaBuilder builder = s.getCriteriaBuilder();
		CriteriaQuery<String> criteria = builder.createQuery(String.class);
		Root<T> root = criteria.from(c);
		criteria.select(builder.max((Expression)root.get("id")));
		String maxid = s.createQuery(criteria).getSingleResult();
		if (maxid == null || maxid.equals("")) return 0;
		res=Integer.parseInt(maxid.substring(2));
		return res;
	}
	
	@SuppressWarnings("deprecation")
	public <T> List<T> doSelectAll(Class<T> c)
	{
		List<T> res;
		Session s= HibernateUtil.getSessionFactory().openSession();
		Criteria cr = s.createCriteria(c);
		res = cr.list();
		HibernateUtil.close();
		return res;
	}
	public <T>	T doSelectById (Class<T> c, String id,Session s)
	{
		T res;
		res = s.get(c, id);
		return res;
	}
	public <T,V> List<T> doSelectByField (Class<T> c, String field_name, V value)
	{
		List<T> res;
		Session s= HibernateUtil.getSessionFactory().openSession();
		Criteria cr = s.createCriteria(c);
		cr.add(Restrictions.eq(field_name, value));
		res = cr.list();
		HibernateUtil.close();
		return res;
	}
	public <T> boolean doDeleteById (T ob)
	{
		boolean isSuccess = true;
		Session s= HibernateUtil.getSessionFactory().openSession();
		Transaction ts = s.getTransaction();
		try
		{
			ts.begin();
			s.remove(ob);
			ts.commit();
		}
		catch (Exception ex)
		{
			ts.rollback();
			isSuccess= false;
		}
		finally
		{
			s.close();
			HibernateUtil.close();
		}
		return isSuccess;
	}
	public <T> int doDeleteRange (List<T> obs) 
	{
		int res=0;
		for (T o:obs)
		{
			if (doDeleteById(o)) res++; 
		}
		return res;
	}
	public <T,V> int doDeleteAll(Class<T> c, String table_name, String field_name, V value)
	{
		int res;
		String hql = "delete from "+table_name+" o where o."+field_name+" = :value";
		Session s= HibernateUtil.getSessionFactory().openSession();
		res = s.createQuery(hql, c).setParameter("value",value).executeUpdate();
		HibernateUtil.close();
		return res;
	}
	
	
	public <T> boolean doInsert (T ob)
	{
		boolean isSuccess = true;
		Session s= HibernateUtil.getSessionFactory().openSession();
		Transaction ts = s.getTransaction();
		try
		{
			ts.begin();
			s.persist(ob);
			ts.commit();
		}
		catch (Exception ex)
		{
			ts.rollback();
			isSuccess= false;
		}
		finally
		{
			s.close();
			HibernateUtil.close();
		}
		return isSuccess;
	}
	public <T> int doInsertRange (List<T> obs)
	{
		int res=0;
		for (T o:obs)
		{
			if (doInsert(o)) res++; 
		}
		return res;
	}
	public <T> boolean doUpdate (T ob)
	{
		boolean isSuccess = true;
		Session s= HibernateUtil.getSessionFactory().openSession();
		Transaction ts = s.getTransaction();
		try
		{
			ts.begin();
			s.merge(ob);
			ts.commit();
		}
		catch (Exception ex)
		{
			ts.rollback();
			isSuccess= false;
		}
		finally
		{
			s.close();
			HibernateUtil.close();
		}
		return isSuccess;
	}
	public <T> int doUpdateRange (List<T> obs)
	{
		int res=0;
		for (T o:obs)
		{
			if (doUpdate(o)) res++; 
		}
		return res;
	}
}
