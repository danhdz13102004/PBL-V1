package model;



import javax.persistence.*;

@Entity
public class ChiTietDonHang {
	
	@Id
	@Column(name = "Id")
	private String id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "Id_don_hang", referencedColumnName = "Id")
    private DonHang donHang;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "Id_sach", referencedColumnName = "Id")
    private Sach sach;
	
	@Column(name = "Gia_ban")
    private int giaBan;
    
    @Column(name = "So_luong")
    private int soLuong;
    
    @Column(name = "Thanh_tien")
    private double thanhTien;

    public ChiTietDonHang() {
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }
    
    public DonHang getDonHang() {
        return this.donHang;
    }

    public void setDonHang(DonHang donHang) {
        this.donHang = donHang;
    }
    
    
    

    public int getGiaBan() {
		return giaBan;
	}

	public void setGiaBan(int giaBan) {
		this.giaBan = giaBan;
	}

	public void setThanhTien(double thanhTien) {
		this.thanhTien = thanhTien;
	}

	public Sach getSach() {
        return this.sach;
    }

    public void setSach(Sach sach) {
        this.sach = sach;
    }

    public int getSoLuong() {
        return this.soLuong;
    }

    public void setSoLuong(int soLuong) {
        this.soLuong = soLuong;
    }

    
    public double getThanhTien() {
        return this.soLuong*this.sach.getGiaBan();
    }

    
}

