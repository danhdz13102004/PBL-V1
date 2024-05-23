package api.admin;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import org.hibernate.Session;




import dao.UserDao;
import util.HibernateUtil;
import util.HttpUtil;
import util.JsonUtil;
import model.*;
import modelApi.*;

import java.util.List;
@WebServlet(urlPatterns = "/api/admin/*")
public class apiAdmin extends HttpServlet{
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // TODO Auto-generated method stub
        String url = req.getRequestURL().toString();
        if (url.contains("/count"))
        {
            doCount(req, resp);
        }
        else
        {
            doSelect(req, resp);
        }
    }
    
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // TODO Auto-generated method stub
        req.setCharacterEncoding("UTF-8");
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        User newUser = JsonUtil.getInstance().toModel(User.class, HttpUtil.getInstance().jsonStringOf(req.getReader()));
        Session s = HibernateUtil.getSessionFactory().openSession();
        newUser = UserDao.getUserDao().insert(newUser,s);
        HttpUtil.getInstance().writeToResp(resp, JsonUtil.getInstance().jsonToString(newUser));
        s.close();
    }
    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // TODO Auto-generated method stub
        req.setCharacterEncoding("UTF-8");
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        User updateUser = JsonUtil.getInstance().toModel(User.class, HttpUtil.getInstance().jsonStringOf(req.getReader()));
        Session s = HibernateUtil.getSessionFactory().openSession();
        updateUser = UserDao.getUserDao().updateUser(updateUser, s);
        HttpUtil.getInstance().writeToResp(resp, JsonUtil.getInstance().jsonToString(updateUser));
        s.close();
    }
    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // TODO Auto-generated method stub
        req.setCharacterEncoding("UTF-8");
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        String url = req.getRequestURL().toString();
        if (url.contains("/diachi"))
        {
            doDeleteDiaChi(req,resp);
        }
        else
        {
            doDeleteUser(req, resp);
        }
    }

    private void doDeleteDiaChi(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        // TODO Auto-generated method stub
        String[] ids = JsonUtil.getInstance().toModel(String[].class,HttpUtil.getInstance().jsonStringOf(req.getReader()) );
        Session s = HibernateUtil.getSessionFactory().openSession();
        UserDao.getUserDao().deleteRangeDiaChi(ids, s);
        HttpUtil.getInstance().writeToResp(resp, "{}");
        s.close();
    }
    private void doDeleteUser(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        // TODO Auto-generated method stub
        String[] ids = JsonUtil.getInstance().toModel(String[].class,HttpUtil.getInstance().jsonStringOf(req.getReader()) );
        Session s = HibernateUtil.getSessionFactory().openSession();
        UserDao.getUserDao().deleteRangeUser(ids, s);
        HttpUtil.getInstance().writeToResp(resp, "{}");
        s.close();
    }

    private void doSelect(HttpServletRequest req, HttpServletResponse resp) throws IOException
    {
        String sdtFilter = req.getParameter("SDT");
        String tenFilter = req.getParameter("ten");
        String gioitinhFilter = req.getParameter("gioitinh");
        String emailFilter = req.getParameter("email");
        String roleFilter = req.getParameter("role");
        String statusFilter = req.getParameter("status");
        String diachiFilter = req.getParameter("diachi");
        int curPage = Integer.parseInt(req.getParameter("curPage"));
        int size = Integer.parseInt(req.getParameter("size"));
        Session s = HibernateUtil.getSessionFactory().openSession();
        List<User> list = UserDao.getUserDao().searchUsers(tenFilter, sdtFilter, emailFilter, gioitinhFilter, roleFilter,statusFilter,diachiFilter,curPage,size,s);
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        String json = JsonUtil.getInstance().jsonToString(list);
        HttpUtil.getInstance().writeToResp(resp, json);
        s.close();
    }

    private void doCount(HttpServletRequest req, HttpServletResponse resp) throws IOException
    {
        String sdtFilter = req.getParameter("SDT");
        String tenFilter = req.getParameter("ten");
        String gioitinhFilter = req.getParameter("gioitinh");
        String emailFilter = req.getParameter("email");
        String roleFilter = req.getParameter("role");
        String statusFilter = req.getParameter("status");
        String diachiFilter = req.getParameter("diachi");
        Session s = HibernateUtil.getSessionFactory().openSession();
        long cnt = UserDao.getUserDao().countNumberUserHas(tenFilter, sdtFilter, emailFilter, gioitinhFilter, roleFilter,statusFilter,diachiFilter,s);
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        HttpUtil.getInstance().writeToResp(resp, Long.toString(cnt));
        s.close();
    }
}
