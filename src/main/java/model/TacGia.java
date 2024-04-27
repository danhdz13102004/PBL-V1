package model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

@Entity
public class TacGia {
	
	@Id
	@Column(name = "Id")
	String id;
	
	@Column(name = "Ten_tac_gia")
	String ten;
	
	@OneToMany(mappedBy = "tacGia", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	List<Sach> listSach;
	
	public TacGia() {
		super();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}


	public String getTen() {
		return ten;
	}


	public void setTen(String ten) {
		this.ten = ten;
	}

	@Override
	public String toString() {
		return "TacGia [id=" + id + ", ten=" + ten + "]";
	}
	
	
}
