package com.dlmanager;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@SuppressWarnings("serial")
public class Logout extends HttpServlet{

	    public void doGet(HttpServletRequest request, HttpServletResponse response)
	            throws javax.servlet.ServletException, java.io.IOException {
	       
	    }

	    public void doPost(HttpServletRequest request, HttpServletResponse response)
	            throws javax.servlet.ServletException, java.io.IOException {
	    	 try {
	    		 	request.getSession().invalidate();
	    		 	response.setContentType("text/plain");
		            response.setCharacterEncoding("UTF-8");
		            response.getWriter().write("true");
		        } catch (Exception ex) {
		        	ex.printStackTrace();
		        }
	    }
	   
	     public void init( ){
	       }
	   
}
