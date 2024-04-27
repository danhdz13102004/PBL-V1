package model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

@Entity
public class TheLoai {
	
	@Id
	@Column(name ="Id")
	String id;
	
	@Column(name = "Ten_the_loai")
	String tenTheLoai;
	
	@OneToMany(mappedBy = "theLoai", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	List<Sach> listSach;
	
	public TheLoai() {
		
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTenTheLoai() {
		return tenTheLoai;
	}

	public void setTenTheLoai(String tenTheLoai) {
		this.tenTheLoai = tenTheLoai;
	}

	@Override
	public String toString() {
		return "TheLoai [id=" + id + ", tenTheLoai=" + tenTheLoai + "]";
	}
	
	
}
