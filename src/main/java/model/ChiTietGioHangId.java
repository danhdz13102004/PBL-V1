package model;

import java.io.Serializable;

public class ChiTietGioHangId implements Serializable {

    private User khachHang;

    private Sach sach;

	public ChiTietGioHangId() {
		super();
	}

	public ChiTietGioHangId(User khachHang, Sach sach) {
		super();
		this.khachHang = khachHang;
		this.sach = sach;
	}

	public User getKhachHang() {
		return khachHang;
	}

	public void setKhachHang(User khachHang) {
		this.khachHang = khachHang;
	}

	public Sach getSach() {
		return sach;
	}

	public void setSach(Sach sach) {
		this.sach = sach;
	}

    
}
