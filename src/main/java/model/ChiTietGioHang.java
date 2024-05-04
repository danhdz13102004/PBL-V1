package model;

import javax.persistence.*;

@Entity

@IdClass(ChiTietGioHangId.class)

public class ChiTietGioHang {


    @Id

    @ManyToOne(fetch = FetchType.LAZY)

    @JoinColumn(name = "Id_khach_hang", referencedColumnName = "Id")

    private User khachHang;

    @Id

    @ManyToOne(fetch = FetchType.LAZY)

    @JoinColumn(name = "Id_sach", referencedColumnName = "Id")

    private Sach sach;


    @Column(name = "So_luong")

    private int soLuong;
    
    private boolean status = false;
    
    
    


	public ChiTietGioHang() {
		super();
	}


	public ChiTietGioHang(User khachHang, Sach sach, int soLuong) {
		super();
		this.khachHang = khachHang;
		this.sach = sach;
		this.soLuong = soLuong;
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


	public int getSoLuong() {
		return soLuong;
	}


	public void setSoLuong(int soLuong) {
		this.soLuong = soLuong;
	}


	public boolean isStatus() {
		return status;
	}


	public void setStatus(boolean status) {
		this.status = status;
	}

   
    

}