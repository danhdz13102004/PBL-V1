package model;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;
import model.*;
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
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "Id_chi_tiet_don_hang", referencedColumnName = "Id")
	private ChiTietDonHang ctDonHang;
	
	@Column(name = "So_sao")
    private Integer soSao;
	
	@Column(name = "Binh_luan")
    private String binhLuan;
	
    @Column(name = "Trang_thai")
	Boolean status = false;

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
   

    public ChiTietDonHang getCtDonHang() {
		return ctDonHang;
	}


	public void setCtDonHang(ChiTietDonHang ctDonHang) {
		this.ctDonHang = ctDonHang;
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
