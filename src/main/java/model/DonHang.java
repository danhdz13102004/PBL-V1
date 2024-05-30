package model;

import java.util.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;

import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

@Entity
public class DonHang {
    
	@Id
	@GeneratedValue(generator = "my-generator")
    @GenericGenerator(name = "my-generator", 
      parameters =@Parameter(name = "prefix", value = "DH"), 
      strategy = "model.MyIDGenerator")
	@Column(name="Id")
	private String id;
	
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "Id_khach_hang", referencedColumnName = "Id")
    private User khachHang;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "Trinh_trang_don_hang")
    private Status tinhTrang;
	
	@Column(name = "Thoi_gian_dat_hang")
	@Temporal(TemporalType.TIMESTAMP)
    private Date  thoiGianDatHang;
	
	@Column(name = "SDT_Nguoi_Nhan")
	private String sdtNguoiNhan;
	
	@Column(name = "Ten_nguoi_nhan")
	private String tenNguoiNhan;
	
	@Column(name = "Tong_tien")
	private Double tongTien;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "donHang", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChiTietDonHang> listCTDH ;
    
	@Column(name = "Dia_chi_giao_hang")
    private String diaChiGiaoHang;
    
    
    public DonHang() {
    
    }

    

    public List<ChiTietDonHang> getListCTDH() {
		return listCTDH;
	}



	public void setListCTDH(List<ChiTietDonHang> listCTDH) {
		this.listCTDH = listCTDH;
	}



	public String getSdtNguoiNhan() {
		return sdtNguoiNhan;
	}



	public void setSdtNguoiNhan(String sdtNguoiNhan) {
		this.sdtNguoiNhan = sdtNguoiNhan;
	}



	public String getTenNguoiNhan() {
		return tenNguoiNhan;
	}



	public void setTenNguoiNhan(String tenNguoiNhan) {
		this.tenNguoiNhan = tenNguoiNhan;
	}



	public void setTinhTrang(Status tinhTrang) {
		this.tinhTrang = tinhTrang;
	}



	public void setTongTien(Double tongTien) {
		this.tongTien = tongTien;
	}



	public void setDiaChiGiaoHang(String diaChiGiaoHang) {
		this.diaChiGiaoHang = diaChiGiaoHang;
	}



	//ID
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    
    //KH
    public User getKhachHang() {
        return khachHang;
    }

    public void setKhachHang(User khachHang) {
        this.khachHang = khachHang;
    }
    //tinhtrangdon
    public Status getTinhTrang() {
        return this.tinhTrang;
    }

    public void setTinhTrangDonHang(Status s) {
    	this.tinhTrang = s;
    }

    
    


	public Date getThoiGianDatHang() {
		return thoiGianDatHang;
	}



	public void setThoiGianDatHang(Date thoiGianDatHang) {
		this.thoiGianDatHang = thoiGianDatHang;
	}



	//tongtien
    public Double getTongTien() {
    	return this.tongTien;	
    }

    public String getDiaChiGiaoHang()
    {
    	return this.diaChiGiaoHang;
    }
    
    
    public enum Status
    {
    	DANGXULY("Đang xử lý"),
    	DAXACNHAN("Đã xác nhận"),
    	DANGCHOXULYTRAHANG("Đang chờ xử lý trả hàng"),
    	DAHUY("Đã hủy"),
    	DANGGIAOHANG("Đang giao hàng"),
    	THANHCONG("Thành công"),
    	DATRAHANG("Đã trả hàng"),
		DAXOA("Đã xóa");
    	private String message;
    	private Status(String mess) {
			// TODO Auto-generated constructor stub
    		this.message=mess;
    	}
		@Override
		public String toString() 
		{
			return this.message;
		}
    }
}
