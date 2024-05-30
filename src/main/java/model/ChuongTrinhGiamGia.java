package model;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

@Entity
public class ChuongTrinhGiamGia {
	
	@Id
	@GeneratedValue(generator = "my-generator")
    @GenericGenerator(name = "my-generator", 
      parameters =@Parameter(name = "prefix", value = "DE"), 
      strategy = "model.MyIDGenerator")
	@Column(name = "Id")
	private String id;
	
	@Column(name = "Ten_chuong_trinh_giam_gia")
	private String name;
	
	@Column(name = "Trang_thai")
	private Boolean status = false;
	
	@Column(name = "Ngay_bat_dau")
	@Temporal(TemporalType.TIMESTAMP)
	private Date ngayBatDau;
	
	@Column(name = "Ngay_ket_thuc")
	@Temporal(TemporalType.TIMESTAMP)
	private Date ngayKetThuc;
	
	@Column(name = "Muc_giam")
	private Double mucGiam;
	
	@OneToMany(mappedBy = "ctGiamGia", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	private List<Sach> listSach;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Boolean isStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	public Date getNgayBatDau() {
		return ngayBatDau;
	}

	public void setNgayBatDau(Date ngayBatDau) {
		this.ngayBatDau = ngayBatDau;
	}

	public Date getNgayKetThuc() {
		return ngayKetThuc;
	}

	public void setNgayKetThuc(Date ngayKetThuc) {
		this.ngayKetThuc = ngayKetThuc;
	}

	public Double getMucGiam() {
		return mucGiam;
	}

	public void setMucGiam(Double mucGiam) {
		this.mucGiam = mucGiam;
	}

	public List<Sach> getListSach() {
		return listSach;
	}

	public void setListSach(List<Sach> listSach) {
		this.listSach = listSach;
	}
	
	
}
