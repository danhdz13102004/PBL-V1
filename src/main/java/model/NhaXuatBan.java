package model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

@Entity
public class NhaXuatBan {
	
	@Id
	@Column (name = "Id")
	String id;
	
	@Column (name = "Ten_nxb")
	String tenNxb;
	
	@Column(name = "Trang_thai")
	boolean status = false;

	@OneToMany(mappedBy = "nxb", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	List<Sach> listSach;
	
	public NhaXuatBan() {
		super();
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getTenNxb() {
		return tenNxb;
	}
	public void setTenNxb(String tenNxb) {
		this.tenNxb = tenNxb;
	}

	public boolean isStatus()
    {
        return this.status;
    }

    public void setStatus(boolean status)
    {
        this.status = status;
    }
	
	@Override
	public String toString() {
		return "NhaXuatBan [id=" + id + ", tenNxb=" + tenNxb + "]";
	}
		
}
