package com.dlmanager;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
//import dlap.uzavupparai.com.*;

@SuppressWarnings("serial")
public class FetchAllReports extends HttpServlet{

	    public void doGet(HttpServletRequest request, HttpServletResponse response)
	            throws javax.servlet.ServletException, java.io.IOException {
	        try {
	        	String days = request.getParameter("days");
	        	
	        	//Call the class to fetch reports for given days
	        	/*	
	        	 * start - return data to javascript
	        	 */
	            response.setContentType("text/plain");
	            response.setCharacterEncoding("UTF-8");
	            response.getWriter().write("true"); //send result array here
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
