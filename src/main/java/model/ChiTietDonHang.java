package model;



import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
@Entity
public class ChiTietDonHang {
	
	@Id
    @GeneratedValue(generator = "my-generator")
    @GenericGenerator(name = "my-generator", 
      parameters =@Parameter(name = "prefix", value = "DO"), 
      strategy = "model.MyIDGenerator")
	@Column(name = "Id")
	private String id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "Id_don_hang", referencedColumnName = "Id")
    private DonHang donHang;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "Id_sach", referencedColumnName = "Id")
    private Sach sach;
	
	@Column(name = "Gia_ban")
    private Double giaBan;
    
    @Column(name = "So_luong")
    private Integer soLuong;
    
    @Column(name = "Trang_thai")
    private Boolean status = false;

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
    
   
    public Double getGiaBan() {
		return giaBan;
	}

	public void setGiaBan(Double giaBan) {
		this.giaBan = giaBan;
	}


	public Sach getSach() {
        return this.sach;
    }

    public void setSach(Sach sach) {
        this.sach = sach;
    }

    public Integer getSoLuong() {
        return this.soLuong;
    }

    public void setSoLuong(Integer soLuong) {
        this.soLuong = soLuong;
    }

    public Boolean isStatus()
    {
        return this.status;
    }

    public void setStatus(Boolean status)
    {
        this.status = status;
    }
    
}

