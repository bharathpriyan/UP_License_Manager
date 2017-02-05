package com.dlmanager;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Arrays;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
//import dlap.uzavupparai.com.*;

import com.uzhavupparai.dladmin.Admin;

@SuppressWarnings("serial")
public class FetchUserDetails extends HttpServlet{
	
	    public void doGet(HttpServletRequest request, HttpServletResponse response)
	            throws javax.servlet.ServletException, java.io.IOException {
	        try {
	        	String lNumber = request.getParameter("lNumber");
	        	Admin a=(Admin) request.getSession().getAttribute("validAdmin");
	        	String[] customerDetails = a.retrieveCustomerDetails(lNumber);
	        	response.setContentType("text/plain");
				response.setCharacterEncoding("UTF-8");
				response.getWriter().write(Arrays.toString(customerDetails));
	        	/**
	        	 * Fetch User details by license number
	        	 */
//	        	String[][] custStr = a.retrieveCustomers(days);
//	        	JSONArray custArray = new JSONArray();
//	        	for(String[] s:custStr){
//	        		JSONObject o = new JSONObject();
//	        		for(int i=0;i<s.length;i++)
//	        			o.put("arg"+i, s[i]);
//	        		custArray.put(o);
//	        	}
//	        	response.setContentType("application/json");
//		        response.getWriter().print(custArray);
	        	//send result array here
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
