package com.kregos.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "k_users")
public class Users 
{
	private String id;
	private String username;
	private String password;
	private String email;
	private String phone;
	private String gender;
	private Boolean enabled = true;
	private String role="ROLE_USER";
	private String profilePicUrl;
	
	private List<String> friends = new ArrayList<String>();
	private List<String> requestsIn = new ArrayList<String>();
	private List<String> requestsOut = new ArrayList<String>();
	
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public Boolean getEnabled() {
		return enabled;
	}
	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getProfilePicUrl() {
		return profilePicUrl;
	}
	public void setProfilePicUrl(String profilePicUrl) {
		this.profilePicUrl = profilePicUrl;
	}
	public List<String> getFriends() {
		return friends;
	}
	public void setFriends(List<String> friends) {
		this.friends = friends;
	}
	public List<String> getRequestsIn() {
		return requestsIn;
	}
	public void setRequestsIn(List<String> requestsIn) {
		this.requestsIn = requestsIn;
	}
	
	public List<String> getRequestsOut() {
		return requestsOut;
	}
	public void setRequestsOut(List<String> requestsOut) {
		this.requestsOut = requestsOut;
	}
	
	public Users()
	{
		super();
		
	}
	@Override
	public String toString() {
		return "Users [id=" + id + ", username=" + username + ", password=" + password + ", email=" + email + ", phone="
				+ phone + ", gender=" + gender + ", enabled=" + enabled + ", role=" + role + ", profilePicUrl="
				+ profilePicUrl + ", friends=" + friends + ", requestsIn=" + requestsIn + ", requestsOut=" + requestsOut
				+ "]";
	}

}
