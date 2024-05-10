package controller.product;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.hibernate.Session;

import com.google.gson.Gson;

import dao.SachDao;
import model.NhaXuatBan;
import model.Sach;
import model.TacGia;
import util.HibernateUtil;
import util.HibernateUtil;
@WebServlet(urlPatterns = "/product/*")
public class allRequest extends HttpServlet {
	SachDao sachDao = SachDao.getSachDao();
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html; charset=UTF-8");
		String url = null;
		try {
			url = request.getRequestURL().toString();			
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println(url);
		if(url.contains("/detail")) {
			showInfor(request, response);
		}

		RequestDispatcher rq = getServletContext().getRequestDispatcher("/productDetail.jsp");
		rq.forward(request, response);
		
	}
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		doGet(req, resp);
	}
	
	protected void showInfor(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Session session = HibernateUtil.getSessionFactory().openSession();
		String id = request.getParameter("id");
		Sach sach = new Sach();
		sach = sachDao.selectById(id,session);
//		System.out.println(sach);
		System.out.println(sach.getTheLoai() + " " + sach.getTacGia() + " " + sach.getNxb());
		request.setAttribute("product", sach);
		session.close();
	}
	
	public static void main(String[] args) {
		Session session = HibernateUtil.getSessionFactory().openSession();
		Sach sach = new Sach();
		sach = SachDao.getSachDao().selectById("1",session);
		System.out.println(sach.getId() + " " + sach.getTen());
		session.close();
		
	}
}

