package controller.nvql;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.util.List;
import java.util.Random;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;


import org.hibernate.Session;

import dao.HQLutil;
import dao.SachDao;
import model.ChuongTrinhGiamGia;
import model.NhaXuatBan;
import model.Sach;
import model.TacGia;
import model.TheLoai;
import util.HibernateUtil;
@WebServlet(urlPatterns = "/nvql-controller/*")
@MultipartConfig
public class allRequest extends HttpServlet {
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String url = null;
		try {
			url = request.getRequestURL().toString();			
		} catch (Exception e) {
			e.printStackTrace();
		}
		String[] arr = url.split("/");
		url = arr[arr.length - 1];
		System.out.println(url);
		if(url.equals("addNewProduct")) {
			try {
				addNewProduct(request, response);
			} catch (Exception e) {
				e.printStackTrace();
			} 
		}
		else if(url.equals("editProduct")) {
			try {
				editProduct(request, response);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		else if(url.equals("updateAndReload")) {
			try {
				updateAndReload(request, response);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		doGet(req, resp);
	}
	
	private String getFileName(final Part part) {
		try {
			for (String content : part.getHeader("content-disposition").split(";")) {
				if (content.trim().startsWith("filename")) {
					return content.substring(content.indexOf('=') + 1).trim().replace("\"", "");
				}
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
        return null;
    }
	
	protected void addNewProduct(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html; charset=UTF-8");
		
		Part part = request.getPart("ImageUpload");
		String urlImage = "";
		if(part != null) {
			String savePath = getServletContext().getRealPath("/image");
			Random rd = new Random();
			String filename = System.currentTimeMillis() + rd.nextInt(1000) + "" + ".jpg";
			
			if(!Files.exists(Path.of(savePath))) {
				Files.createDirectories(Path.of(savePath));
			}
			part.write(savePath + "/" + filename);
			urlImage = "/image/" + filename;			
		}
		else {
			urlImage = request.getParameter("urlImage");
		}
		

		 String tensanpham = request.getParameter("tensanpham"); 
		 Integer soluong = Integer.parseInt(request.getParameter("soluong")); 
		 Integer sotrang = Integer.parseInt(request.getParameter("sotrang")); 
		 String category =request.getParameter("category"); 
		 String producer =request.getParameter("producer"); 
		 String author = request.getParameter("author"); 
		 Double giaban = Double.parseDouble(request.getParameter("giaban")); 
		 Double giavon = Double.parseDouble(request.getParameter("giavon")); 
		 
//		 Double giamgia = Double.parseDouble(request.getParameter("giamgia"));
		 
		 ChuongTrinhGiamGia c = new ChuongTrinhGiamGia();
		 c.setId("123");
		 
		 String mota = request.getParameter("mota");
		 TheLoai theLoai = new TheLoai();
		 theLoai.setId(category);
		 NhaXuatBan nhaXuatBan = new NhaXuatBan();
		 nhaXuatBan.setId(producer);
		 TacGia tacGia = new TacGia();
		 tacGia.setId(author);
		 	
		Sach sach = new Sach();
		sach.setTen(tensanpham);
		sach.setSoLuongNhap(soluong);
		sach.setSoLuongBan(0);
		sach.setMoTa(mota);
		sach.setSoSaoTB(5);
		sach.setSoTrang(sotrang);
		sach.setLanXuatBan(1);
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		sach.setNgayThem(timestamp);
		sach.setUrlImage(urlImage);
		sach.setGiaBan(giaban);
		sach.setGiaNhap(giavon);
		sach.setTacGia(tacGia);
		sach.setTheLoai(theLoai);
		sach.setNxb(nhaXuatBan);	
		sach.setCtGiamGia(c);
		Session session = HibernateUtil.getSessionFactory().openSession();
		HQLutil.getInstance().doInsert(sach, session);
		session.close();
		HttpSession session2 = request.getSession();
		session2.removeAttribute("page1%%s10");
		RequestDispatcher rq = getServletContext().getRequestDispatcher("/nvql/manageProduct.jsp");
		rq.forward(request, response);
	}
	
	protected void editProduct(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String id = request.getParameter("id");
		Session session = HibernateUtil.getSessionFactory().openSession();
		Sach sach = SachDao.getSachDao().selectById(id, session);
		request.setAttribute("product", sach);
		session.close();
		RequestDispatcher rq = getServletContext().getRequestDispatcher("/nvql/editProduct.jsp");
		rq.forward(request, response);
		HttpSession session2 = request.getSession();
		session2.removeAttribute("page1%%s10");
	}
	
	protected void updateAndReload(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html; charset=UTF-8");
		
		Part part = request.getPart("ImageUpload");
		String s = getFileName(part);
		String urlImage = request.getParameter("urlImage");
		if(s.length() > 0) {
			String savePath = getServletContext().getRealPath("/image");
			String root = getServletContext().getRealPath("/");
			Random rd = new Random();
			String filename = System.currentTimeMillis() + rd.nextInt(1000) + "" + ".jpg";
			
			if(!Files.exists(Path.of(savePath))) {
				Files.createDirectories(Path.of(savePath));
			}
			part.write(savePath + "/" + filename);
			File imageFile = new File(root + "/" + urlImage);
			if (imageFile.exists()) {
	            imageFile.delete();
	        }
			urlImage = "/image/" + filename;	
		}


		 String tensanpham = request.getParameter("tensanpham"); 
		 Integer soluong = Integer.parseInt(request.getParameter("soluong")); 
		 Integer sotrang = Integer.parseInt(request.getParameter("sotrang")); 
		 String category =request.getParameter("category"); 
		 String producer =request.getParameter("producer"); 
		 String author = request.getParameter("author"); 
		 Double giaban = Double.parseDouble(request.getParameter("giaban")); 
		 Double giavon = Double.parseDouble(request.getParameter("giavon")); 
//		 Double giamgia = Double.parseDouble(request.getParameter("giamgia"));
		 String mota = request.getParameter("mota");
		 String idgiamgia = request.getParameter("idgiamgia");
		 ChuongTrinhGiamGia c = new ChuongTrinhGiamGia();
		 c.setId(idgiamgia);
		 TheLoai theLoai = new TheLoai();
		 theLoai.setId(category);
		 NhaXuatBan nhaXuatBan = new NhaXuatBan();
		 nhaXuatBan.setId(producer);
		 TacGia tacGia = new TacGia();
		 tacGia.setId(author);
		 	
		Sach sach = new Sach();
		sach.setId(request.getParameter("id"));
		sach.setTen(tensanpham);
		sach.setSoLuongNhap(soluong);
		sach.setSoLuongBan(0);
		sach.setMoTa(mota);
		sach.setSoSaoTB(5);
		sach.setSoTrang(sotrang);
		sach.setLanXuatBan(1);
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		sach.setNgayThem(timestamp);
		sach.setUrlImage(urlImage);
		sach.setGiaBan(giaban);
		sach.setGiaNhap(giavon);
		sach.setTacGia(tacGia);
		sach.setTheLoai(theLoai);
		sach.setNxb(nhaXuatBan);	
		sach.setCtGiamGia(c);
		System.out.println(sach.getId() + " " + sach.getTen());
		Session session = HibernateUtil.getSessionFactory().openSession();
		HQLutil.getInstance().doUpdate1(sach,session);
		session.close();
		RequestDispatcher rq = getServletContext().getRequestDispatcher("/nvql/manageProduct.jsp");
		rq.forward(request, response);
	}
	
}
