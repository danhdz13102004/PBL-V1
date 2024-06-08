package model;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;;

@Entity
public class Sach {
	
    @Id
    @GeneratedValue(generator = "my-generator")
    @GenericGenerator(name = "my-generator", 
      parameters =@Parameter(name = "prefix", value = "SA"), 
      strategy = "model.MyIDGenerator")
    @Column(name = "Id")
	private String id;
    
    @Column(name ="Ten")
    private String ten;
    
    @Column(name = "So_luong_nhap")
    private Integer soLuongNhap;
    
    @Column(name = "So_luong_ban")
    private Integer soLuongBan;
    
    @Column(name = "Mo_ta")
    private String moTa;
    
    @Column(name = "So_sao_tb")
    private Double soSaoTB;
    
    @Column(name = "So_trang")
    private Integer soTrang;
    
    @Column(name = "So_luot_danh_gia")
    private Integer soLuotDanhGia;
    
    @Column(name = "Lan_xuat_ban")
    private Integer lanXuatBan;
    
    @Column(name = "Ngay_them")
    @Temporal(TemporalType.TIMESTAMP)
    public Date ngayThem;
    
    @Column(name = "Url_image")
    private String urlImage;
    
    @Column(name = "Gia_ban")
    private Double giaBan;
    
    @Column(name = "Gia_nhap")
    private Double giaNhap;
    
    @Column(name = "Phan_tram_giam_gia")
    private Double phanTramGiamGia;
    
    @Column(name = "Trang_thai")
	private Boolean status = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Id_the_loai", referencedColumnName = "Id")
    private TheLoai theLoai;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Id_tac_gia", referencedColumnName = "Id")
    private TacGia tacGia;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Id_nxb", referencedColumnName = "Id")
    private NhaXuatBan nxb;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Id_ct_giam_gia", referencedColumnName = "Id")
    private ChuongTrinhGiamGia ctGiamGia;
    
    
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "sach", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChiTietGioHang> listChiTietGioHang;
    
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "sach", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChiTietDonHang> listChiTietDonHang;
    
    
    


	public Sach() {
	}
	
	

	public Sach(String id, String ten, Integer soLuongNhap, Integer soLuongBan, String moTa, double soSaoTB,
			Integer soTrang, Integer lanXuatBan, Timestamp ngayThem, String urlImage, Double giaBan, Double giaNhap,
			Double phanTramGiamGia, TheLoai theLoai, TacGia tacGia, NhaXuatBan nxb,
			List<ChiTietGioHang> listChiTietGioHang, List<ChiTietDonHang> listChiTietDonHang) {
		super();
		this.id = id;
		this.ten = ten;
		this.soLuongNhap = soLuongNhap;
		this.soLuongBan = soLuongBan;
		this.moTa = moTa;
		this.soSaoTB = soSaoTB;
		this.soTrang = soTrang;
		this.lanXuatBan = lanXuatBan;
		this.ngayThem = ngayThem;
		this.urlImage = urlImage;
		this.giaBan = giaBan;
		this.giaNhap = giaNhap;
		this.phanTramGiamGia = phanTramGiamGia;
		this.theLoai = theLoai;
		this.tacGia = tacGia;
		this.nxb = nxb;
		this.listChiTietGioHang = listChiTietGioHang;
		this.listChiTietDonHang = listChiTietDonHang;
	}



	// Getter methods
    public String getId() {
        return id;
    }

    public String getTen() {
        return ten;
    }

    public Integer getSoLuongNhap() {
        return soLuongNhap;
    }

    public Integer getSoLuongBan() {
        return soLuongBan;
    }

    public String getMoTa() {
        return moTa;
    }

    public Double getSoSaoTB()
    {
    	return this.soSaoTB;
    }
    
    public Integer getSoTrang() {
        return soTrang;
    }

    public Integer getLanXuatBan() {
        return lanXuatBan;
    }


    public String getUrlImage() {
        return urlImage;
    }

    public Double getGiaBan() {
        return giaBan;
    }

    public Double getGiaNhap() {
        return giaNhap;
    }

    public Double getPhanTramGiamGia() {
        return phanTramGiamGia;
    }

    public TheLoai getTheLoai() {
        return theLoai;
    }

    public TacGia getTacGia() {
        return tacGia;
    }

    public NhaXuatBan getNxb() {
        return nxb;
    }
    
    public ChuongTrinhGiamGia getCtGiamGia()
    {
    	return this.ctGiamGia;
    }
  
	public Date getNgayThem() {
		return ngayThem;
	}

	

    public Boolean isStatus()
    {
        return this.status;
    }

    public void setStatus(boolean status)
    {
        this.status = status;
    }


	public List<ChiTietGioHang> getListChiTietGioHang() {
		return listChiTietGioHang;
	}

	public void setListChiTietGioHang(List<ChiTietGioHang> listChiTietGioHang) {
		this.listChiTietGioHang = listChiTietGioHang;
	}

	public List<ChiTietDonHang> getListChiTietDonHang() {
		return listChiTietDonHang;
	}
	
	public void setListChiTietDonHang(List<ChiTietDonHang> listChiTietDonHang) {
		this.listChiTietDonHang = listChiTietDonHang;
	}

	// Setter methods
    public void setId(String id) {
        this.id = id;
    }

    public void setTen(String ten) {
        this.ten = ten;
    }

    public void setSoLuongNhap(Integer soLuongNhap) {
        this.soLuongNhap = soLuongNhap;
    }

    public void setSoLuongBan(Integer soLuongBan) {
        this.soLuongBan = soLuongBan;
    }

    public void setMoTa(String moTa) {
        this.moTa = moTa;
    }

    public void setSoSaoTB(Double sosaotb)
    {
    	this.soSaoTB=sosaotb;
    }
    
    public void setSoTrang(Integer soTrang) {
        this.soTrang = soTrang;
    }

    public void setLanXuatBan(Integer lanXuatBan) {
        this.lanXuatBan = lanXuatBan;
    }

    public void setNgayThem(Date ngayThem) {
        this.ngayThem = ngayThem;
    }

    public void setUrlImage(String urlImage) {
        this.urlImage = urlImage;
    }

    public void setGiaBan(Double giaBan) {
        this.giaBan = giaBan;
    }

    public void setGiaNhap(Double giaNhap) {
        this.giaNhap = giaNhap;
    }

    public void setPhanTramGiamGia(Double phanTramGiamGia) {
        this.phanTramGiamGia = phanTramGiamGia;
    }

    public void setTheLoai(TheLoai theLoai) {
        this.theLoai = theLoai;
    }

    public void setTacGia(TacGia tacGia) {
        this.tacGia = tacGia;
    }

    public void setNxb(NhaXuatBan nxb) {
        this.nxb = nxb;
    }
    
    public void setCtGiamGia(ChuongTrinhGiamGia ctgg)
    {
    	this.ctGiamGia = ctgg;
    }

    
	public Integer getSoLuotDanhGia() {
		return soLuotDanhGia;
	}



	public void setSoLuotDanhGia(Integer soLuotDanhGia) {
		this.soLuotDanhGia = soLuotDanhGia;
	}



	@Override
	public String toString() {
		return "Sach [id=" + id + ", ten=" + ten + ", soLuongNhap=" + soLuongNhap + ", soLuongBan=" + soLuongBan
				+ ", moTa=" + moTa + ", soSaoTB=" + soSaoTB + ", soTrang=" + soTrang + ", lanXuatBan=" + lanXuatBan
				+ ", ngayThem=" + ngayThem + ", urlImage=" + urlImage + ", giaBan=" + giaBan + ", giaNhap=" + giaNhap
				+ ", phanTramGiamGia=" + phanTramGiamGia + ", theLoai=" + theLoai + ", tacGia=" + tacGia + ", nxb="
				+ nxb + ", listChiTietGioHang=" + listChiTietGioHang
				+ ", listChiTietDonHang=" + listChiTietDonHang + "]";
	}
    
}