package com.dlmanager;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.uzhavupparai.dladmin.Admin;

@SuppressWarnings("serial")
public class LoginValidator extends HttpServlet{

	    public void doGet(HttpServletRequest request, HttpServletResponse response)
	            throws javax.servlet.ServletException, java.io.IOException {
	       
	    }

	    public void doPost(HttpServletRequest request, HttpServletResponse response)
	    		throws javax.servlet.ServletException, java.io.IOException  {
//	    	 try {
		        	Admin a=new Admin.AdminBuilder(request.getParameter("uName"),request.getParameter("pWord")).build();
		        	if(a.validateLogin()){
		        		request.getSession().setAttribute("validAdmin", a);
			            response.setContentType("text/plain");
			            response.setCharacterEncoding("UTF-8");
			            response.getWriter().write("true"); //send success or failure as true or false (string)
		        	}else{
		        		response.setContentType("text/plain");
			            response.setCharacterEncoding("UTF-8");
			            response.getWriter().write("false");
		        	}
//		        } catch (Exception ex) {
//		        	ex.printStackTrace();
//		        }
	    }
	   
	     public void init( ){
	       }
	   
}
