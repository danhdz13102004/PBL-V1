package api.detail_order_user;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.Session;

import dao.ChiTietDonHangDao;
import dao.DanhGiaDAO;
import model.ChiTietDonHang;
import model.DanhGia;
import model.User;
import util.HibernateUtil;
import util.HttpUtil;
import util.JsonUtil;

@WebServlet(urlPatterns = "/api/detail_order_user/*")
public class apiChiTietDonHang extends HttpServlet {
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String url = null;
		try {
			url = req.getRequestURL().toString();			
		} catch (Exception e) {
			e.printStackTrace();
		}
		String[] arr = url.split("/");
		url = arr[arr.length - 1];
        if (url.equals("count"))
        {
            doCount(req, resp);
        }
        else if (url.equals("add_update"))
        {
        	doAddUpdate(req, resp);
        }
        else if (url.equals("getFeedbackOfBook"))
        {
        	doGetFeedbackOfBook(req,resp);
        }
        else if (url.equals("countFeedbackOfBook"))
        {
        	doCountFeedbackOfBook(req,resp);
        }
        else if (url.equals("getFBOfBookHasStar"))
        {
        	doGetFBOfBookHasStar(req,resp);
        }
        else if (url.equals("countFBOfBookHasStar"))
        {
        	doCountFBOfBookHasStar(req,resp);
        }
        else
        {
        	doSelect(req, resp);
        }
	}
	private void doAddUpdate(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.setCharacterEncoding("UTF-8");
		resp.setCharacterEncoding("UTF-8");
		resp.setContentType("text/html; charset=UTF-8");
		
		// TODO Auto-generated method stub
		String idCTDH = req.getParameter("idCTDH");
		String binhLuan = req.getParameter("binhLuan");
		int soSao = Integer.parseInt(req.getParameter("soSao")==null?"0":req.getParameter("soSao"));
		Long timeElapse = Long.parseLong(req.getParameter("thoiGian"));
		Date thoiGian = new Date(timeElapse);
		Session s = HibernateUtil.getSessionFactory().openSession();
		ChiTietDonHang ctdh = ChiTietDonHangDao.getChiTietDonHangDao().AddUpdateDanhGia(idCTDH, soSao, binhLuan,thoiGian, s);
		HttpUtil.getInstance().writeToResp(resp, JsonUtil.getInstance().jsonToString(ctdh));
		s.close();
	}
	private void doSelect(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		HttpSession session = req.getSession();
		User user = (User) session.getAttribute("khachHang");
		String idUser = "abcd";
		if(user != null) {
			idUser = user.getId();
		}
		int curPage = Integer.parseInt(req.getParameter("curPage"));
        int size = Integer.parseInt(req.getParameter("size"));
        Session s = HibernateUtil.getSessionFactory().openSession();
        List<ChiTietDonHang> li = ChiTietDonHangDao.getChiTietDonHangDao().getChiTietDonHangOf(idUser, curPage, size, s);
        String json = JsonUtil.getInstance().jsonToString(li);
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        HttpUtil.getInstance().writeToResp(resp, json);
        s.close();
	}
	private void doCount(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		HttpSession session = req.getSession();
		User user = (User) session.getAttribute("khachHang");
		String idUser = "abcd";
		if(user != null) {
			idUser = user.getId();
		}
		System.out.println(idUser);
        Session s = HibernateUtil.getSessionFactory().openSession();
        Long cnt = ChiTietDonHangDao.getChiTietDonHangDao().countChiTietDonHangOf(idUser, s);
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        HttpUtil.getInstance().writeToResp(resp, Long.toString(cnt));
        s.close();
	}
	
	private void doCountFBOfBookHasStar(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String idSach = req.getParameter("idSach");
		Integer soSao = Integer.parseInt(req.getParameter("soSao"));
		Session s = HibernateUtil.getSessionFactory().openSession();
		Long cnt = DanhGiaDAO.getInstance().countFBOfBookHasStar(idSach, soSao, s);
		resp.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        HttpUtil.getInstance().writeToResp(resp, Long.toString(cnt));
		s.close();
	}
	private void doGetFBOfBookHasStar(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String idSach = req.getParameter("idSach");
		Integer soSao = Integer.parseInt(req.getParameter("soSao"));
		Integer curPage = Integer.parseInt(req.getParameter("curPage"));
		Integer size = Integer.parseInt(req.getParameter("size"));
		Session s = HibernateUtil.getSessionFactory().openSession();
		List<DanhGia> li = DanhGiaDAO.getInstance().getFBOfBookHasStar(idSach, soSao, curPage, size, s);
		resp.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        String json = JsonUtil.getInstance().jsonToString(li);
        HttpUtil.getInstance().writeToResp(resp, json);
		s.close();
	}
	private void doCountFeedbackOfBook(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String idSach = req.getParameter("idSach");
		Session s = HibernateUtil.getSessionFactory().openSession();
		Long cnt = DanhGiaDAO.getInstance().countFeedbackOfBook(idSach, s);
		resp.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        HttpUtil.getInstance().writeToResp(resp, Long.toString(cnt));
		s.close();
	}
	private void doGetFeedbackOfBook(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String idSach = req.getParameter("idSach");
		Integer curPage = Integer.parseInt(req.getParameter("curPage"));
		Integer size = Integer.parseInt(req.getParameter("size"));
		Session s = HibernateUtil.getSessionFactory().openSession();
		List<DanhGia> li = DanhGiaDAO.getInstance().getFeedbackOfBook(idSach, curPage, size, s);
		for(DanhGia d : li) System.out.println(d.getSoSao() + " " + d.getBinhLuan());
		resp.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        String json = JsonUtil.getInstance().jsonToString(li);
        HttpUtil.getInstance().writeToResp(resp, json);
		s.close();
	}
	
}