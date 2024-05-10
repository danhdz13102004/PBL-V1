package util;
 
import org.hibernate.SessionFactory;
import org.hibernate.boot.Metadata;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.service.ServiceRegistry;

import com.google.gson.Gson;

import dao.HQLutil;

import java.util.*;

import org.hibernate.*;

import model.DiaChiGiaoHang;
import model.TheLoai;
import model.User;
 
public class HibernateUtil2 {
 
    private static final SessionFactory sessionFactory = buildSessionFactory();
 
    private HibernateUtil2() {
    }
 
    private static SessionFactory buildSessionFactory() {
        ServiceRegistry serviceRegistry = new StandardServiceRegistryBuilder() //
                .configure("hibernate.cfg.xml")  // Load hibernate.cfg.xml from resource folder by default
                .build();
        Metadata metadata = new MetadataSources(serviceRegistry).getMetadataBuilder().build();
        return metadata.getSessionFactoryBuilder().build();
    }	
 
    public static SessionFactory getSessionFactory() {
        return sessionFactory;
    }
 
    public static void close() {
        getSessionFactory().close();
    }
    public static void main(String[] args) {
		//Session s = HibernateUtil.getSessionFactory().openSession();
		User u = new User();
        u.setTen("Minh");
        u.setRole(User.Role.KH);
        DiaChiGiaoHang dc = new DiaChiGiaoHang();
        dc.setDiaChi("Ngo Si Lien");
        List<DiaChiGiaoHang> list = new ArrayList<DiaChiGiaoHang>();
        list.add(dc);
        dc.setKhachHang(u);
        u.setDiaChiGiaoHang(list);
        String json;
        json = JsonUtil.getInstance().jsonToString(u);
        User newu = new Gson().fromJson(json, User.class);
        System.out.println(JsonUtil.getInstance().jsonToString(newu.getDiaChiGiaoHang()));
        // HQLutil.getInstance().doInsert(u, s);
        // s.close();
        // HibernateUtil.close();
	}
}
