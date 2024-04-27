package model;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import javax.persistence.*;

@Entity
public class DanhGia {

	@Id
	@Column(name = "Id")
	private String id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "Id_sach", referencedColumnName = "Id")
    private Sach sach;
	
	@Column(name = "So_sao")
    private int soSao;
	
	@Column(name = "Binh_luan")
    private String binhLuan;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name ="Id_khach_hang", referencedColumnName = "Id")
    private User khachHang;
	
	@Column(name = "Thoi_gian_danh_gia")
    private LocalDateTime thoiGian;
    
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


	public LocalDateTime getThoiGian() {
		return thoiGian;
	}


	public void setThoiGian(LocalDateTime thoiGian) {
		this.thoiGian = thoiGian;
	}

   

}

