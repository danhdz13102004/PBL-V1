package controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.Session;

import dao.SachDao;
import dao.TheLoaiDAO;
import model.Sach;
import model.TheLoai;
import util.HibernateUtil;
@WebServlet(urlPatterns = "/home")
public class Home extends HttpServlet {
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String textSearch = request.getParameter("text");
		if(textSearch != null) request.setAttribute("textsearch", textSearch);
		HttpSession session = request.getSession();
		SachDao sachDao = SachDao.getSachDao();
		Session session2 = HibernateUtil.getSessionFactory().openSession();
		List<TheLoai> listTheLoai = TheLoaiDAO.getTheLoaiDAO().selectAll(session2);
		session.setAttribute("listTheLoai", listTheLoai);
		RequestDispatcher rq = getServletContext().getRequestDispatcher("/index.jsp");
		rq.forward(request, response);
//		session2.close();
	}
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		doGet(req, resp);
	}
}
