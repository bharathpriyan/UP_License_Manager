package com.dlmanager;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.uzhavupparai.dladmin.Admin;

@SuppressWarnings("serial")
public class LoginValidator extends HttpServlet{

	    public void doGet(HttpServletRequest request, HttpServletResponse response)
	            throws javax.servlet.ServletException, java.io.IOException {
	        try {
	        	
	        	Admin a=new Admin.AdminBuilder(request.getParameter("uName"),request.getParameter("pWord")).build();
	        	if(a.validateLogin()){
		            response.setContentType("text/plain");
		            response.setCharacterEncoding("UTF-8");
		            response.getWriter().write("true"); //send success or failure as true or false (string)
	        	}
		            /*
	        	 * end - return data to javascript
	        	 */
	        } catch (Exception ex) {
	        	ex.printStackTrace();
	        }
	    }

	    public void doPost(HttpServletRequest request, HttpServletResponse response)
	            throws javax.servlet.ServletException, java.io.IOException {
	    }
	   
	     public void init( ){
	       }
	   
}
