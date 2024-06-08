package api.detail_order_user;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.hibernate.Session;

import dao.ChiTietDonHangDao;
import model.ChiTietDonHang;
import util.HibernateUtil;
import util.HttpUtil;
import util.JsonUtil;

@WebServlet(urlPatterns = "/api/detail_order_user/*")
public class apiChiTietDonHang extends HttpServlet {
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String url = req.getRequestURL().toString();
        if (url.contains("/count"))
        {
            doCount(req, resp);
        }
        else if (url.contains("/add_update"))
        {
        	doAddUpdate(req, resp);
        }
        else
        {
        	doSelect(req, resp);
        }
	}
	private void doAddUpdate(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
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
		// TODO Auto-generated method stub
		String idUser = req.getParameter("idUser");
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
		String idUser = req.getParameter("idUser");
		System.out.println(idUser);
        Session s = HibernateUtil.getSessionFactory().openSession();
        Long cnt = ChiTietDonHangDao.getChiTietDonHangDao().countChiTietDonHangOf(idUser, s);
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        HttpUtil.getInstance().writeToResp(resp, Long.toString(cnt));
        s.close();
	}
	
}
