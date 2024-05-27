package model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
@Entity
public class NhaXuatBan {
	
	@Id
	@GeneratedValue(generator = "my-generator")
    @GenericGenerator(name = "my-generator", 
      parameters =@Parameter(name = "prefix", value = "BP"), 
      strategy = "model.MyIDGenerator")
	@Column (name = "Id")
	String id;
	
	@Column (name = "Ten_nxb")
	String tenNxb;
	
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

	@Override
	public String toString() {
		return "NhaXuatBan [id=" + id + ", tenNxb=" + tenNxb + "]";
	}
		
}
