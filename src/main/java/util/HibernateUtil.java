package util;


import java.util.List;
import java.util.Properties;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.cfg.Environment;
import org.hibernate.service.ServiceRegistry;

import dao.UserDao;
import model.User;



/**
 * Java based configuration
 * @author ramesh Fadatare
 *
 */
public class HibernateUtil {
    private static SessionFactory sessionFactory;

    public static SessionFactory getSessionFactory() {
         if (sessionFactory == null) {
            try {
                 Configuration configuration = new Configuration();

                 // Hibernate settings equivalent to hibernate.cfg.xml's properties
                 Properties settings = new Properties();
                 settings.put(Environment.DRIVER, "com.mysql.cj.jdbc.Driver");
                 settings.put(Environment.URL, "jdbc:mysql://localhost:3306/web_ban_sach");
                 settings.put(Environment.USER, "root");
                 settings.put(Environment.PASS, "MinhMYSQLlvn0112");
                 settings.put(Environment.DIALECT, "org.hibernate.dialect.MySQL8Dialect");

                 settings.put(Environment.SHOW_SQL, "true");
                 settings.put(Environment.FORMAT_SQL, "true");
                 settings.put(Environment.CURRENT_SESSION_CONTEXT_CLASS, "thread");

                 settings.put(Environment.HBM2DDL_AUTO, "update");
                
                 configuration.setProperties(settings);
                 configuration.addAnnotatedClass(model.User.class);
                 configuration.addAnnotatedClass(model.TheLoai.class);
                 configuration.addAnnotatedClass(model.TacGia.class);
                 configuration.addAnnotatedClass(model.Sach.class);
                 configuration.addAnnotatedClass(model.NhaXuatBan.class);
                 configuration.addAnnotatedClass(model.DonHang.class);
                 configuration.addAnnotatedClass(model.DanhGia.class);
                 configuration.addAnnotatedClass(model.DiaChiGiaoHang.class);
                 configuration.addAnnotatedClass(model.ChiTietDonHang.class);
                 configuration.addAnnotatedClass(model.ChiTietGioHang.class);
                 configuration.addAnnotatedClass(model.ChuongTrinhGiamGia.class);
                
                 ServiceRegistry serviceRegistry = new StandardServiceRegistryBuilder()
                 .applySettings(configuration.getProperties()).build();
                 System.out.println("Hibernate Java Config serviceRegistry created");
                 sessionFactory = configuration.buildSessionFactory(serviceRegistry);
                 return sessionFactory;

              } catch (Exception e) {
                 e.printStackTrace();
              }
          }
        return sessionFactory;
    }
    public static void close() {
        getSessionFactory().close();
    }
    
}