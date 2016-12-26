package com.dlmanager;

import java.net.URLDecoder;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.uzhavupparai.dladmin.Admin;

@SuppressWarnings("serial")
public class RegisterUser extends HttpServlet{

	    public void doGet(HttpServletRequest request, HttpServletResponse response)
	            throws javax.servlet.ServletException, java.io.IOException {
	        
	    }

	    public void doPost(HttpServletRequest request, HttpServletResponse response)
	            throws javax.servlet.ServletException, java.io.IOException {
	    	try {
	        	String userData = URLDecoder.decode(request.getParameter("userData"),"UTF-8");
	        	JSONObject newUserObj = new JSONObject(userData);
	        	
	        	String schoolName = newUserObj.getString("schoolName");
	        	String firstName = newUserObj.getString("firstName");
	        	String lastName = newUserObj.getString("lastName");
	        	String userName = newUserObj.getString("userName");
	        	String password = newUserObj.getString("password");
	        	String mobNumber = newUserObj.getString("mobNumber");
	        	String altMobStr = newUserObj.getString("altMobNumber");
	        	String email = newUserObj.getString("emailId");
	        	
	        	Admin a=new Admin.AdminBuilder(userName, password).setSchoolnameBuilder(schoolName).
	        			setFnameBuilder(firstName).setLnameBuilder(lastName).setMobNumBuilder(mobNumber).
	        			setAltMobNumBuilder(altMobStr).setEmailBuilder(email).build();
	        	
	        	if(a.signupUser())
	        	{
		            response.setContentType("text/plain");
		            response.setCharacterEncoding("UTF-8");
		            response.getWriter().write("true"); //send success or failure as true or false (string)
	        	}
	        } catch (Exception ex) {
	        	ex.printStackTrace();
	        }
	    }
	   
	     public void init(){
	     }
	   
}
