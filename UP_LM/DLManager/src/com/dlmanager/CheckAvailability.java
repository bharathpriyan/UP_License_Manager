package com.dlmanager;

import java.util.Arrays;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
//import dlap.uzavupparai.com.*;

import com.uzhavupparai.dladmin.Admin;

@SuppressWarnings("serial")
public class CheckAvailability extends HttpServlet{

	    public void doGet(HttpServletRequest request, HttpServletResponse response)
	            throws javax.servlet.ServletException, java.io.IOException {
	        try {
	        	String lNumber = request.getParameter("lNumber");
	        	
//	        	Admin a=(Admin) request.getSession().getAttribute("validAdmin");
//	        	String[] customerDetails = a.retrieveCustomerDetails(lNumber);
	        	
	        	response.setContentType("text/plain");
				response.setCharacterEncoding("UTF-8");
				/**
				 * Return true if already available
				 * Return false if not available
				 */
				response.getWriter().write("false");
				
	        } catch (Exception ex) {
	        	ex.printStackTrace();
	        }
	    }

	    public void doPost(HttpServletRequest request, HttpServletResponse response)
	            throws javax.servlet.ServletException, java.io.IOException {
	    }
   
}
