package model;

import java.sql.Timestamp;
import java.time.LocalDateTime;

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
    private int soSao;
	
	@Column(name = "Binh_luan")
    private String binhLuan;
	
    @Column(name = "Trang_thai")
	boolean status = false;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name ="Id_khach_hang", referencedColumnName = "Id")
    private User khachHang;
	
	@Column(name = "Thoi_gian_danh_gia")
    private Timestamp thoiGian;
    
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

    public int getSoSao() {
        return soSao;
    }

    public void setSoSao(int soSao) {
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


	public Timestamp getThoiGian() {
		return thoiGian;
	}


	public void setThoiGian(Timestamp thoiGian) {
		this.thoiGian = thoiGian;
	}

    public boolean isStatus()
    {
        return this.status;
    }

    public void setStatus(boolean status)
    {
        this.status = status;
    }

}

