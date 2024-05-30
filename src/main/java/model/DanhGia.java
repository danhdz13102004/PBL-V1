package model;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
@Entity
public class DanhGia {

	@Id
    @GeneratedValue(generator = "my-generator")
    @GenericGenerator(name = "my-generator", 
      parameters =@Parameter(name = "prefix", value = "DG"), 
      strategy = "model.MyIDGenerator")
	@Column(name = "Id")
	private String id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "Id_sach", referencedColumnName = "Id")
    private Sach sach;
	
	@Column(name = "So_sao")
    private Integer soSao;
	
	@Column(name = "Binh_luan")
    private String binhLuan;
	
    @Column(name = "Trang_thai")
	Boolean status = false;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name ="Id_khach_hang", referencedColumnName = "Id")
    private User khachHang;
	
	@Column(name = "Thoi_gian_danh_gia")
	@Temporal(TemporalType.TIMESTAMP)
    private Date thoiGian;
    
    public DanhGia() {
    }

   
    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }
    
    public Sach getSach() {
        return sach;
    }
    
    public void setSach(Sach sach) {
        this.sach = sach;
    }

    public Integer getSoSao() {
        return soSao;
    }

    public void setSoSao(Integer soSao) {
        this.soSao = soSao;
    }

    public String getBinhLuan() {
        return binhLuan;
    }

    public void setBinhLuan(String binhLuan) {
        this.binhLuan = binhLuan;
    }

    public User getKhachHang() {
        return khachHang;
    }

    public void setKhachHang(User khachHang) {
        this.khachHang = khachHang;
    }


	public Date getThoiGian() {
		return thoiGian;
	}


	public void setThoiGian(Date thoiGian) {
		this.thoiGian = thoiGian;
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

